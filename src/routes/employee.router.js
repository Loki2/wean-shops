const express = require("express");
const { authenticated } = require("../middleware/authHandler");
const {
  get_Employees,
  get_addEmployee,
  post_addEmployee,
  get_updateEmployee,
  post_updateEmployee,
  get_deleteEmployee,
} = require("../controllers/employee.controller");

const router = express.Router();

router.get("/", authenticated, get_Employees);

router.get("/add-employee", authenticated, get_addEmployee);

router.post("/add-employee", authenticated, post_addEmployee);

router.get("/edit/:id", authenticated, get_updateEmployee);

router.post("/edit/:id", authenticated, post_updateEmployee);

router.get("/delete/:id", authenticated, get_deleteEmployee);

module.exports = router;
