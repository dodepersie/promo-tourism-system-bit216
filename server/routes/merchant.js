const express = require("express");
const merchantController = require("../controllers/merchant.controller");

const createMerchant = merchantController.createMerchant;
const getAllMerchants = merchantController.getAllMerchants;
const updateMerchant = merchantController.updateMerchant;
const viewMerchant = merchantController.viewMerchant;

const router = express.Router();

// Create merchant account
router.post("/", createMerchant);

// Get all merchants account
router.get("/", getAllMerchants);

// Update merchant account
router.put("/:id", updateMerchant);

// View merchant account by ID
router.get("/:id", viewMerchant);

module.exports = router;
