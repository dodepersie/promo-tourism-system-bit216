const express = require("express");
const Product = require("../models/product");

const router = express.Router();

router.get("/merchant/top_products", async (req, res) => {
  const { merchant_id, limit } = req.query;
  console.log(
    `merchant_id: ${merchant_id} from /ministry/merchant/top_product`
  );
  try {
    let topProduct = await Product.aggregate([
      {
        $match: merchant_id ? { merchant_id: merchant_id } : {},
      },
      {
        $lookup: {
          from: "purchases",
          localField: "_id",
          foreignField: "product_id",
          as: "purchases",
          pipeline: [
            {
              $match: {
                status: "PAID",
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          product_sold: { $size: "$purchases" },
          total_sold: { $multiply: ["$price", { $size: "$purchases" }] },
        },
      },
      {
        $sort: {
          product_sold: -1,
        },
      },
    ]);
    topProduct = limit ? topProduct.slice(0, limit) : topProduct;
    res.status(200).json(topProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
