const express = require("express");
const { authenticated } = require("../middleware/authHandler");
const {
  get_categories,
  get_createCategory,
  post_createCategory,
  get_updateCategory,
  post_updateCategory,
  get_deleteCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.get("/", authenticated, get_categories);

router.get("/create-category", authenticated, get_createCategory);

router.post("/create-category", authenticated, post_createCategory);

router.get("/edit/:id", authenticated, get_updateCategory);

router.post("/edit/:id", authenticated, post_updateCategory);

router.get("/delete/:id", authenticated, get_deleteCategory);

module.exports = router;
