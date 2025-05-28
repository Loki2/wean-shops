const express = require("express");
const { authenticated } = require("../middleware/authHandler");
const {
  get_customers,
  get_createCustomer,
  post_createCustomer,
  get_viewCustomer,
  get_editCustomer,
  post_editCustomer,
  get_deleteCustomer,
} = require("../controllers/customer.controller");

const router = express.Router();

router.get("/", authenticated, get_customers);

router.get("/create-customer", authenticated, get_createCustomer);

router.post("/create-customer", authenticated, post_createCustomer);

router.get("/view/:id", authenticated, get_viewCustomer);

router.get("/edit/:id", authenticated, get_editCustomer);

router.post("/edit/:id", authenticated, post_editCustomer);

router.get("/delete/:id", authenticated, get_deleteCustomer);

module.exports = router;
