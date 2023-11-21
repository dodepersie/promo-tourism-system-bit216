const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Merchant = require("../models/merchant");
const User = require("../models/user");

dotenv.config();

/**
 * Creates a new merchant account.
 * @param {Object} req - The request object containing merchant data (name, email, password, companyDesc, phoneNumber, status).
 * @param {Object} res - The response object to send back the created merchant.
 * @returns {Promise<Object>} - The created merchant object.
 */
const createMerchant = async (req, res) => {
  try {
    const existingMerchant = await Merchant.findOne({ email: req.body.email });
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingMerchant || existingUser) {
      return res.status(400).send("Email or username is already registered");
    }

    const defaultPassword = "Merchant#1234!";
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(defaultPassword, salt);

    const merchant = new Merchant({
      name: req.body.name,
      email: req.body.email,
      password: hashPwd,
      companyDesc: req.body.companyDesc,
      phoneNumber: req.body.phoneNumber,
      status: req.body.status,
    });

    await merchant.save();
    res.send(merchant);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Something is wrong while creating Merchants Account..");
  }
};

/**
 * Retrieves all merchants from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the list of merchants.
 * @returns {Promise<Array>} - An array containing all merchants in the database.
 */
const getAllMerchants = async (req, res) => {
  try {
    const getMerchants = await Merchant.find({});
    res.send(getMerchants);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Something is wrong while getting all Merchants data...");
  }
};

/**
 * Retrieves a specific merchant by their ID.
 * @param {Object} req - The request object containing the merchant ID in params.
 * @param {Object} res - The response object to send back the requested merchant.
 * @returns {Promise<Object>} - The merchant object requested by ID.
 */
const viewMerchant = async (req, res) => {
  const { id } = req.params;

  try {
    const merchant = await Merchant.findById(id);
    res.send(merchant);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

/**
 * Updates a merchant's information by their ID.
 * @param {Object} req - The request object containing the merchant ID in params and updated merchant data.
 * @param {Object} res - The response object to send back the updated merchant.
 * @returns {Promise<Object>} - The updated merchant object.
 */
const updateMerchant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, companyDesc, phoneNumber, status } =
      req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);

    const merchant = await Merchant.findByIdAndUpdate(
      id,
      { name, email, password: hashPwd, companyDesc, phoneNumber, status },
      { new: true }
    );
    res.send(merchant);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Something is wrong while updating Merchants Account...");
  }
};

module.exports = {
  createMerchant,
  getAllMerchants,
  updateMerchant,
  viewMerchant,
};
