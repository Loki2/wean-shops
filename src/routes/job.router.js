const express = require("express");
const { authenticated } = require("../middleware/authHandler");
const {
  get_jobs,
  get_createJob,
  post_createJob,
  get_JobId,
  get_updateJob,
  post_updateJob,
  get_deleteJobId,
} = require("../controllers/job.controller");

const router = express.Router();

router.get("/", authenticated, get_jobs);

router.get("/create-job", authenticated, get_createJob);

router.post("/create-job", authenticated, post_createJob);

router.get("/view/:id", authenticated, get_JobId);

router.get("/edit/:id", authenticated, get_updateJob);

router.post("/edit/:id", authenticated, post_updateJob);

router.get("/delete/:id", authenticated, get_deleteJobId);

module.exports = router;
