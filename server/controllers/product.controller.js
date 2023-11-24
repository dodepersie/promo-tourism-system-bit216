const Product = require("../models/product");

/**
 * Creates a new product.
 * @param {Object} req - The request object containing product data (name, description, price, rating, image).
 * @param {Object} res - The response object to send back the created product.
 * @returns {Promise<Object>} - The created product object.
 */
const createProduct = async (req, res) => {
  try {
    const {
      merchant_id,
      name,
      description,
      price,
      address,
      state,
      city,
      rating,
      image,
    } = req.body;

    const product = new Product({
      merchant_id,
      name,
      description,
      price,
      address,
      state,
      city,
      rating,
      image,
    });
    await product.save();
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

/**
 * Retrieves all products from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back the list of products.
 * @returns {Promise<Array>} - An array containing all products in the database.
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getProductByMerchantId = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ merchant_id: id });

    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

/**
 * Retrieves a specific product by its ID.
 * @param {Object} req - The request object containing the product ID in params.
 * @param {Object} res - The response object to send back the requested product.
 * @returns {Promise<Object>} - The product object requested by ID.
 */
const viewProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

/**
 * Updates a product's information by its ID.
 * @param {Object} req - The request object containing the product ID in params and updated product data.
 * @param {Object} res - The response object to send back the updated product.
 * @returns {Promise<Object>} - The updated product object.
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      merchant_id,
      name,
      description,
      price,
      address,
      state,
      city,
      rating,
      image,
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        merchant_id,
        name,
        description,
        price,
        address,
        state,
        city,
        rating,
        image,
      },
      { new: true }
    );
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

/**
 * Deletes a product by its ID.
 * @param {Object} req - The request object containing the product ID in params.
 * @param {Object} res - The response object to send back the deleted product.
 * @returns {Promise<Object>} - The deleted product object.
 */
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {
  createProduct,
  getProductByMerchantId,
  getAllProducts,
  viewProduct,
  updateProduct,
  deleteProduct,
};
