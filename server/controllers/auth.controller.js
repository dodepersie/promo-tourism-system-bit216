const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Merchant = require("../models/merchant");
const User = require("../models/user");

dotenv.config();

const login = async (req, res) => {
  try {
    // Search for a user with the provided email
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "name"
    );
    // Search for a merchant with the provided email
    const merchant = await Merchant.findOne({ email: req.body.email });

    // Check if either user or merchant exists
    if (!user && !merchant) return res.status(404).send("Account not found!");

    // Set the target as either user or merchant based on existence
    const target = user || merchant;

    const isPwdCorrect = await bcrypt.compare(
      req.body.password,
      target.password
    );
    if (!isPwdCorrect) return res.status(403).send("Password is incorrect!");

    // Generate token based on the target (user or merchant)
    const tokenPayload = {
      id: target._id,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .json({
        data: target,
        token: token,
      });
  } catch (error) {
    return res
      .status(500)
      .send("Something is wrong, try to contact Administrator!");
  }
};

/*
  Change merchant password
*/
const changeMerchantPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);

    const changePassword = await Merchant.findByIdAndUpdate(
      id,
      { password: hashPwd },
      { new: true }
    );

    res.status(200).json({
      status: "OK",
      message: "Change password successfully!",
      data: changePassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something is wrong while changing password...");
  }
};

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports = { login, changeMerchantPassword, verifyToken };
