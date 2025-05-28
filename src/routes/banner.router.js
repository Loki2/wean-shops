const express = require("express");
const { authenticated } = require("../middleware/authHandler");
const {
  get_banners,
  get_createBanner,
  post_createBanner,
  get_viewbanner,
  get_updatebanner,
  post_updatebanner,
  get_deletebanner
} = require("../controllers/banner.controller");

const router = express.Router();

router.get("/", authenticated, get_banners);

router.get("/create-banner", authenticated, get_createBanner);

router.post("/create-banner", authenticated, post_createBanner);

router.get("/view/:id", authenticated, get_viewbanner);

router.get("/edit/:id", authenticated, get_updatebanner);

router.post("/edit/:id", authenticated, post_updatebanner);

router.get("/delete/:id", authenticated, get_deletebanner);

module.exports = router;