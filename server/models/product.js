const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    merchant_id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    rating: { type: String },
    image: { type: String, required: true },
    total_sold: { type: String },
    total_purchase: { type: String },
    purchase_id: { type: [Schema.Types.ObjectId], ref: "Purchase" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
