const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new mongoose.Schema(
  {
    merchant_id: { type: [Schema.Types.ObjectId], ref: "Merchant" },
    user_id: { type: [Schema.Types.ObjectId], ref: "User" },
    product_id: { type: [Schema.Types.ObjectId], ref: "Product" },
    price_myr: { type: Number, required: true },
    price_usd: { type: Number, required: true },
    rate: { type: Number, required: true },
    total_purchase: { type: Number, required: true },
    travel_date: { type: Date, required: true },
    review: { type: String },
    status: { type: String, required: true },
    response_code: { type: String, required: false, default: null },
    response_stringify: { type: String, required: false, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
