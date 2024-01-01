const express = require("express");
const merchantController = require("../controllers/merchant.controller");

const createMerchant = merchantController.createMerchant;
const getAllMerchants = merchantController.getAllMerchants;
const updateMerchant = merchantController.updateMerchant;
const viewMerchant = merchantController.viewMerchant;
const updateMerchantStatus = merchantController.updateMerchantStatus;
const updateMerchantFirstLogin = merchantController.updateMerchantFirstLogin;
const getMerchantTopProducts = merchantController.getMerchantTopProducts;
const getAllApprovedMerchants = merchantController.getAllApprovedMerchants;

const router = express.Router();

// Create merchant account
router.post("/", createMerchant);

// Get all merchants account
router.get("/", getAllMerchants);

// Update merchant account
router.put("/:id", updateMerchant);

// Update merchant status
router.put("/status/:id", updateMerchantStatus);

// Update merchant first login
router.put("/check-login/:id", updateMerchantFirstLogin);

// View merchant account by ID
router.get("/:id", viewMerchant);

// Get Merchant Top products
router.get("/top_products/:id", getMerchantTopProducts);

// Get All Approved Merchants
router.get("/approved", getAllApprovedMerchants);

module.exports = router;
