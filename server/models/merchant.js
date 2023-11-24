const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    companyDesc: { type: String },
    phoneNumber: { type: String, unique: true },
    isFirstLogin: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Merchant = mongoose.model("Merchant", merchantSchema);
module.exports = Merchant;
