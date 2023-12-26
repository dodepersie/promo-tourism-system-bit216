require("dotenv").config();
const express = require("express");
const axios = require("axios");
const Product = require("../models/product");
const Merchant = require("../models/merchant");
const Purchase = require("../models/purchase");
const exchange = require("../functions/ratesExchange");
const ssTunel = require("../functions/routeFrom");
const router = express.Router();

const base = "https://api-m.sandbox.paypal.com";

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
async function getAccessToken() {
  try {
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const response = await axios({
      method: "POST",
      url: `${base}/v1/oauth2/token`,
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_CLIENT_SECRET,
      },
      data: "grant_type=client_credentials",
    });
    const data = await response.data;
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
}

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (payload) => {
  // using payload to pass the orders information
  console.log("createOrder payload:", payload);
  const access_token = await getAccessToken();
  const response = await axios({
    method: "POST",
    url: `${base}/v2/checkout/orders`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    data: payload,
  });
  return handleResponse(response);
};

/**
 * Capture an order payment by passing the approved order ID.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 * @param {String} orderID
 * @returns {Object} Capture response
 **/
const captureOrder = async (orderID) => {
  const access_token = await getAccessToken();
  const response = await axios({
    method: "POST",
    url: `${base}/v2/checkout/orders/${orderID}/capture`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  return handleResponse(response);
};

/**
 * Get order details by passing the approved order ID.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_get
 * @param {String} orderID
 * @returns {Object} Order details
 */
const getOrders = async (id) => {
  const access_token = await getAccessToken();
  const response = await axios({
    method: "GET",
    url: `${base}/v2/checkout/orders/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  return handleResponse(response);
};

/**
 * Handle response from PayPal API
 * @param {Object} response
 * @returns {Object} Status code and response
 * @throws Error
 **/
async function handleResponse(response) {
  try {
    const jsonResponse = await response.data;
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

/**
 * @path /payment
 * @method GET
 * @returns {Object} message
 * @description Test route
 */
router.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

/**
 * @path /payment/invoice
 * @method POST
 * @returns {Object} generated invoice, with message
 * @description Create invoice in database before create order in paypal
 * @description And also check all required fields
 * @description Then convert amount from myr to usd
 * @description Last create invoice in database
 */
router.post("/invoice", async (req, res) => {
  const { travel_date, total_purchase, product_id } = req.body;

  if (!travel_date) {
    res.status(500).send("Travel Date is Required!");
    return false;
  }

  if (!total_purchase) {
    res.status(500).send("Amount of People is Required!");
    return false;
  }

  if (!product_id) {
    res.status(500).send("Product ID is Required!");
    return false;
  }

  try {
    const products = await Product.findById(product_id);
    const merchant = await Merchant.findById(products.merchant_id);

    if (!products && !merchant) {
      throw {
        message: "Product not Found",
        status: false,
      };
    }

    // Exchange rates
    const { price_usd, price_myr, rate_myr } = await exchange.ratesExchange(
      products.price
    );

    // create invoice in database before create order in paypal
    console.log("Create invoice:", products._id);
    const invoice = await Purchase.create({
      travel_date,
      total_purchase,
      price_myr,
      price_usd,
      rate: rate_myr,
      status: "PENDING",
      response_code: null,
      response_stringify: null,
      user_id: req.body.customer_id,
      merchant_id: merchant._id,
      product_id: products._id,
    });

    // if invoice not created throw error
    if (!invoice) {
      throw {
        message: `Failed to create invoice`,
        status: false,
      };
    }
    res
      .status(200)
      .json({ message: "success create order in database", invoice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @path /payment/invoice/:id/pay
 * @method POST
 * @returns {Object} generated invoice, payment_url from paypal API
 * @description Create order in paypal
 */
router.post("/invoice/:id/pay", async (req, res) => {
  try {
    console.log("Try to generate payment...");
    const { id } = req.params;

    if (!id) {
      console.log("Invoice id is required");
      return res.status(500).json({ message: "Invoice id is required" });
    }

    const invoice = await Purchase.findOne({ _id: id });
    if (!invoice) {
      console.log("Invoice not found");
      return res.status(500).json({ message: "Invoice not found" });
    }

    const products = await Product.findOne({ _id: invoice.product_id });
    if (!products) {
      console.log("Product not found");
      return res.status(500).json({ message: "Product not found" });
    }

    const originFrom = ssTunel.isFromTunnel(req.headers.origin);

    const payment_body = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `PromoTourism-${invoice._id}-${Date.now()}`,
          description: `Payment for ${invoice.product_id}`,
          items: [
            {
              name: `${products.name}`,
              description: `Payment for product ${products.name}`,
              quantity: "1",
              unit_amount: {
                currency_code: "USD",
                value: invoice.price_usd,
              },
            },
          ],
          amount: {
            currency_code: "USD",
            value: invoice.price_usd,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: invoice.price_usd,
              },
            },
          },
        },
      ],
      application_context: {
        brand_name: "PromoTourism",
        shipping_preference: "NO_SHIPPING",
        return_url: `${originFrom}/api/payment/invoice/${invoice._id}/capture`,
        cancel_url: `${originFrom}/orders`,
      },
    };

    const { jsonResponse, httpStatusCode } = await createOrder(payment_body);

    const new_invoice = await Purchase.findOneAndUpdate(
      { _id: invoice._id },
      {
        status: "UNPAID",
        response_code: jsonResponse.id,
        response_stringify: JSON.stringify(jsonResponse),
      }
    );

    res.status(httpStatusCode).json({
      message: "Success create order payment in PayPal",
      payment: jsonResponse,
      invoice: new_invoice,
      payment_url: `https://sandbox.paypal.com/checkoutnow?token=${jsonResponse.id}`,
    });
  } catch (error) {
    console.error("Failed to create order:", error.code ? error.code : error);
    console.log(error.response.data);
    res
      .status(500)
      .json({ error: "Failed to create order.", response: error.message });
  }
});

/**
 * Capture an order payment by passing the approved order ID.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 * @param {String} invoice_id
 * @returns {Object} Capture response
 **/
router.get("/invoice/:id/capture", async (req, res) => {
  try {
    console.log("Trying to capture the payment...");

    const { id } = req.params;

    if (!id) {
      return res.status(500).json({ message: "Invoice id is required" });
    }

    const invoice = await Purchase.findOne({ _id: id });

    if (!invoice) {
      return res.status(500).json({ message: "Invoice not found" });
    }

    const orderDetails = await getOrders(invoice.response_code);

    if (!orderDetails) {
      return res.status(500).json({ message: "Order not found" });
    }

    console.log("Order details:", orderDetails.jsonResponse);

    if (orderDetails.jsonResponse.status === "COMPLETED") {
      return res.redirect(`${process.env.FE_HOST}/orders`);
    }

    if (orderDetails.jsonResponse.status !== "APPROVED") {
      return res.status(500).json({ message: "Order not approved" });
    }

    const { jsonResponse, httpStatusCode } = await captureOrder(
      invoice.response_code
    );

    await Purchase.findOneAndUpdate(
      { _id: invoice._id },
      {
        status: "PAID",
        response_code: jsonResponse.id,
        response_stringify: JSON.stringify(jsonResponse),
      }
    );

    // return to frontend
    return res.redirect(
      `${process.env.FE_HOST}/user-dashboard/invoice/${invoice._id}`
    );
  } catch (error) {
    console.error("Failed to capture order:", error.code ? error.code : error);
    return res.status(500).json({ error: "Failed to capture order." });
  }
});

/**
 * Get order details by passing the approved order ID from invoice response_code
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_get
 * @param {String} invoice_id
 * @returns {Object} Order details
 * @throws Error
 **/
router.get("/invoice/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(500).json({ message: "Invoice ID is required" });
  }

  try {
    const invoice = await Purchase.findOne({ _id: id });
    if (!invoice) {
      return res.status(500).json({ message: "Invoice not found" });
    }
    const { jsonResponse, httpStatusCode } = await getOrders(
      invoice.response_code
    );
    if (jsonResponse.status === "APPROVED") {
      return res.status(200).json({
        message: "Order approved",
        status: "approved",
        details: "Your Payment link has been approved.",
      });
    }
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.log(error.response.data);
    if (error.response.data.details[0].issue === "INVALID_RESOURCE_ID") {
      const update_invoice = await Invoice.findOneAndUpdate(
        { _id: id },
        {
          status: "EXPIRED",
        }
      );
      return res.status(500).json({
        message: "Order was expired",
        status: "expired",
        details: "Your Payment link has been expired.",
      });
    }
    console.error("Failed to get order data:", error.code ? error.code : error);
    res.status(500).json({ error: "Failed to get order data." });
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Purchase.find({ user_id: id });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/invoice-db/:id", async(req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Purchase.findById(id);
    res.send(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
})

router.get("/product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
