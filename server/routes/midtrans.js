const express = require("express");
const Midtrans = require("midtrans-client");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.get("/", (req, res) => {
  return res.send("Hi");
});

router.post("/get-token", async (req, res) => {
  try {
    const snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const { name, price, quantity, order_id } = req.body;

    const parameter = {
      item_details: {
        name: name,
        price: price,
        quantity: quantity,
      },
      transaction_details: {
        order_id: order_id,
        gross_amount: price * quantity,
      },
    };

    const token = await snap.createTransactionToken(parameter);
    console.log(token);
    return res.status(200).json({ token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
