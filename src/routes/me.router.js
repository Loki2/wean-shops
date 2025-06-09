const express = require("express");


const { get_userHome, get_addCart } = require("../controllers/me.controller");
const { authenticated } = require("../middleware/authHandler");

const router = express.Router();


router.get("/home", authenticated, get_userHome);

router.get("/add-cart/:product_id", authenticated, get_addCart);
module.exports = router;