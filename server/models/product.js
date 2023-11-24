const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    merchant_id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    rating: { type: String },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
