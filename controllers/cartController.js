const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (request, response) => {
  try {
    await Product.add(request.body);
    await Cart.add(request.body.name);
    response.status(STATUS_CODE.FOUND).redirect("/products/new");
  } catch (error) {
    response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getProductsCount = async () => {
  try {
    return await Cart.getProductsQuantity();
  } catch (error) {
    return 0;
  }
};
