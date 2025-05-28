const express = require("express");
const { authenticated } = require("../middleware/authHandler");
const {
  get_blogs,
  get_createBlog,
  post_createBlog,
  get_BlogId,
  get_updateBlog,
  post_updateBlog,
  get_deleteBlog
} = require("../controllers/blog.controller");

const router = express.Router();

router.get("/", authenticated, get_blogs);

router.get("/create-blog", authenticated, get_createBlog);

router.post("/create-blog", authenticated, post_createBlog);

router.get("/view/:id", authenticated, get_BlogId);

router.get("/edit/:id", authenticated, get_updateBlog);

router.post("/edit/:id", authenticated, post_updateBlog);

router.get("/delete/:id", authenticated, get_deleteBlog);

module.exports = router;
