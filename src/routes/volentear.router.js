const express = require("express");
const { authenticated } = require("../middleware/authHandler");
const {
  get_volentears,
  get_createVolentear,
  post_createVolentear,
  get_VolentearId,
  get_updateVolentear,
  post_updateVolentear,
  get_deleteVolentear
} = require("../controllers/volentear.controller");

const router = express.Router();

router.get("/", authenticated, get_volentears);

router.get("/create-volentear", authenticated, get_createVolentear);

router.post("/create-volentear", authenticated, post_createVolentear);

router.get("/view/:id", authenticated, get_VolentearId);

router.get("/edit/:id", authenticated, get_updateVolentear);

router.post("/edit/:id", authenticated, post_updateVolentear);

router.get("/delete/:id", authenticated, get_deleteVolentear);

module.exports = router;
