const express = require("express");
const { authenticated } = require("../middleware/authHandler");
const {
  get_products,
  get_createProduct,
  post_createProduct,
  get_viewProduct,
  get_updateProduct,
  post_updateProduct,
  get_deleteProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", authenticated, get_products);

router.get("/create-product", authenticated, get_createProduct);

router.post("/create-product", authenticated, post_createProduct);

router.get("/view/:id", authenticated, get_viewProduct);

router.get("/edit/:id", authenticated, get_updateProduct);

router.post("/edit/:id", authenticated, post_updateProduct);

router.get("/delete/:id", authenticated, get_deleteProduct);

module.exports = router;
