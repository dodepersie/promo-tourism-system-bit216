const express = require("express");
const userController = require("../controllers/user.controller");

const createUser = userController.createUser;
const getAllUsers = userController.getAllUsers;
const viewUser = userController.viewUser;
const updateUser = userController.updateUser;
const deleteUser = userController.deleteUser;

const router = express.Router();

// Create a new customers (C)
router.post("/", createUser);

// Get all customers (R)
router.get("/", getAllUsers);

// View customer info
router.get("/:id", viewUser);

// Update a customer (U)
router.put("/:id", updateUser);

// Delete a customer (D)
router.delete("/:id", deleteUser);

module.exports = router;
