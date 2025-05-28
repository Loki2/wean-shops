const express = require("express");
const { authenticated } = require("../middleware/authHandler");
const {
  get_projects,
  get_createProject,
  post_createProject,
  get_viewProject,
  get_updateProject,
  post_updateProject,
  get_deleteProject,
} = require("../controllers/project.controller");

const router = express.Router();

router.get("/", authenticated, get_projects);

router.get("/create-project", authenticated, get_createProject);

router.post("/create-project", authenticated, post_createProject);

router.get("/view/:id", authenticated, get_viewProject);

router.get("/edit/:id", authenticated, get_updateProject);

router.post("/edit/:id", authenticated, post_updateProject);

router.get("/delete/:id", authenticated, get_deleteProject);

module.exports = router;
