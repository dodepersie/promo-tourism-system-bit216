const express = require("express");
const authController = require("../controllers/auth.controller");

const login = authController.login;
const changeMerchantPassword = authController.changeMerchantPassword;

const router = express.Router();

router.post("/login", login);
router.post("/change-merchant-password/:id", changeMerchantPassword);

module.exports = router;
