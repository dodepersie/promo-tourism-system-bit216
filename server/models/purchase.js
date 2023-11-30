const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new mongoose.Schema(
  {
    merchant_id: { type: [Schema.Types.ObjectId], ref: "Merchant" },
    user_id: { type: [Schema.Types.ObjectId], ref: "User" },
    product_id: { type: [Schema.Types.ObjectId], ref: "Product" },
    price: { type: Number, required: true },
    total_purchase: { type: String, required: true },
    travel_date: { type: Date, required: true },
    status: { type: String, required: true, default: "Unpaid" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
