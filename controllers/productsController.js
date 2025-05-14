const Product = require("../models/Product");

const { MENU_LINKS } = require("../constants/navigation");
const { STATUS_CODE } = require("../constants/statusCode");

const cartController = require("./cartController");

exports.getProductsView = async (request, response) => {
  const cartCount = await cartController.getProductsCount();

  try {
    const products = await Product.getAll();
    response.render("products.ejs", {
      headTitle: "Shop - Products",
      path: "/",
      menuLinks: MENU_LINKS,
      activeLinkPath: "/products",
      products,
      cartCount,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    response.status(500).send("Error loading products.");
  }
};

exports.getAddProductView = async (request, response) => {
  const cartCount = await cartController.getProductsCount();

  response.render("add-product.ejs", {
    headTitle: "Shop - Add product",
    path: "/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
    cartCount,
  });
};

exports.getNewProductView = async (request, response) => {
  const cartCount = await cartController.getProductsCount();

  try {
    const newestProduct = await Product.getLast();
    response.render("new-product.ejs", {
      headTitle: "Shop - New product",
      path: "/new",
      activeLinkPath: "/products/new",
      menuLinks: MENU_LINKS,
      newestProduct,
      cartCount,
    });
  } catch (err) {
    console.error("Error fetching newest product:", err);
    response.status(500).send("Error loading newest product.");
  }
};

exports.getProductView = async (request, response) => {
  const cartCount = await cartController.getProductsCount();
  const name = request.params.name;

  try {
    const product = await Product.findByName(name);
    response.render("product.ejs", {
      headTitle: "Shop - Product",
      path: `/products/${name}`,
      activeLinkPath: `/products/${name}`,
      menuLinks: MENU_LINKS,
      product,
      cartCount,
    });
  } catch (err) {
    console.error("Error fetching product:", err);
    response.status(404).send("Product not found.");
  }
};

exports.deleteProduct = async (request, response) => {
  const name = request.params.name;

  try {
    await Product.deleteByName(name);
    response.status(STATUS_CODE.OK).json({ success: true });
  } catch (err) {
    console.error("Error deleting product:", err);
    response.status(500).json({ success: false });
  }
};
