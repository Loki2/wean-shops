const express = require("express");
const {
  get_home,
  get_home_products,
  get_home_product,
  get_home_about,
  get_home_contact,
  post_home_contact,
  get_home_carts,
  get_checkout,
  get_home_blogs,
  get_orders

} = require("../controllers/home.controller");
const { authenticated } = require('../middleware/authHandler');

const router = express.Router();

router.get("/", get_home);

router.get("/products", get_home_products);

router.get("/products/:product_id", get_home_product)

router.get("/carts", get_home_carts);

router.get("/check-out", get_checkout);

router.get("/orders", get_orders);

router.get("/blogs", get_home_blogs);

router.get("/about", get_home_about);

router.get("/contact", get_home_contact);

router.post("/contact", post_home_contact);


module.exports = router;
