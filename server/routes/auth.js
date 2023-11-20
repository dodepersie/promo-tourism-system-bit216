const express = require("express");
const authController = require("../controllers/auth.controller");

const login = authController.login;

const router = express.Router();

router.post("/login", login);

module.exports = router;
