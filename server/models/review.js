const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    purchase_id: { type: [Schema.Types.ObjectId], ref: "Purchase" },
    user_id: { type: [Schema.Types.ObjectId], ref: "User" },
    product_id: { type: [Schema.Types.ObjectId], ref: "Product" },
    rating: { type: Number, required: true, default: 0 },
    review: { type: String, required: true },
    isCommented: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
