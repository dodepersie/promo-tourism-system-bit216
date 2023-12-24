const authController = require("../controllers/auth.controller");
const User = require("../models/user");

/**
 * @function customerAuth
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} req.user (customer) decoded from token
 * @description Authenticate customer
 */
const customerAuth = async (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      const decoded = await authController.verifyToken(token);
      const user = await User.findOne({ _id: decoded.id });
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        message: "Unauthorized token invalid",
      });
    }
  } else {
    res.status(401).json({
      message: "Unauthorized token not found",
    });
  }
};

module.exports = { customerAuth };
