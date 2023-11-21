const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Merchant = require("../models/merchant");
const Role = require("../models/role");

/**
 * Creates a user with the role "Customer".
 * @param {Object} req - The request object containing user data (name, username, email, password).
 * @param {Object} res - The response object to send back the created user.
 * @returns {Promise<Object>} - The created user object.
 */
const createUser = async (req, res) => {
  try {
    const existingMerchant = await Merchant.findOne({ email: req.body.email });
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingMerchant || existingUser) {
      return res.status(400).send("Email or username is already registered");
    }

    const role = await Role.find({ name: "Customer" });
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashPwd,
      roles: role,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

/**
 * Retrieves all users from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the list of users.
 * @returns {Promise<Array>} - An array containing all users in the database.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

/**
 * Retrieves a specific user by their ID.
 * @param {Object} req - The request object containing the user ID in params.
 * @param {Object} res - The response object to send back the requested user.
 * @returns {Promise<Object>} - The user object requested by ID.
 */
const viewUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

/**
 * Updates a user's information by their ID.
 * @param {Object} req - The request object containing the user ID in params and updated user data.
 * @param {Object} res - The response object to send back the updated user.
 * @returns {Promise<Object>} - The updated user object.
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, email, password, isAdmin, roles } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(password, salt);

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, username, email, password: hashPwd, isAdmin, roles },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

/**
 * Deletes a user by their ID.
 * @param {Object} req - The request object containing the user ID in params.
 * @param {Object} res - The response object to send back the deleted user.
 * @returns {Promise<Object>} - The deleted user object.
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  viewUser,
  updateUser,
  deleteUser,
};
