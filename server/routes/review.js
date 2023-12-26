const express = require("express");
const Review = require("../models/review");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.send(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get Review by Product ID
router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product_review = await Review.find({ product_id: id });
    res.send(product_review);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Create review
router.post("/", async (req, res) => {
  try {
    const { purchase_id, user_id, product_id, rating, review } = req.body;

    const data = new Review({
      purchase_id,
      user_id,
      product_id,
      rating,
      review,
      isCommented: true,
    });

    await data.save();
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
