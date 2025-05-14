const { LOGOUT_LINKS } = require("../constants/navigation");
const logger = require("../utils/logger");
const cartController = require("./cartController");

exports.getLogoutView = async (request, response) => {
  try {
    const cartCount = await cartController.getProductsCount();

    response.render("logout.ejs", {
      headTitle: "Shop - Logout",
      path: "/logout",
      activeLinkPath: "/logout",
      menuLinks: LOGOUT_LINKS,
      cartCount,
    });
  } catch (error) {
    response.status(500).send("Internal Server Error");
  }
};

exports.killApplication = (request, response) => {
  logger.getProcessLog();
  process.exit();
};
