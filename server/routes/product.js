const express = require("express");
const productController = require("../controllers/product.controller");

const createProduct = productController.createProduct;
const getAllProducts = productController.getAllProducts;
const getProductByMerchantId = productController.getProductByMerchantId
const viewProduct = productController.viewProduct;
const updateProduct = productController.updateProduct;
const deleteProduct = productController.deleteProduct;

const router = express.Router();

// Create a new tourism poducts (C)
router.post("/", createProduct);

// Get all tourism products (R)
router.get("/", getAllProducts);

// Get product by merchant ID (R)
router.get("/get/:id", getProductByMerchantId);

// View tourism product info
router.get("/:id", viewProduct);

// Update tourism product (U)
router.put("/:id", updateProduct);

// Delete tourism product (D)
router.delete("/:id", deleteProduct);

module.exports = router;
