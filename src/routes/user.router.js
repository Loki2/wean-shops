const express = require("express");
const { authenticated } = require("../middleware/authHandler");
const {
      get_users,
      get_addUser,
      post_addUser,
      get_profile,
      get_changePassword, //loggedin user change pwd
      post_changePassword,
      get_resetPassowrd, //admin update user pwd
      post_resetPassowrd,
      get_myInform,
      update_myInform,
      get_updatePermission,
      post_updatePermission
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", authenticated, get_users);

router.get("/add-user", authenticated, get_addUser);

router.post("/add-user", authenticated, post_addUser);

//Get LoggedinUser Profile
router.get("/profile", authenticated, get_myInform);

router.post("/profile/:id", authenticated, update_myInform);

router.get("/change-password", authenticated, get_changePassword);

router.post("/change-password", authenticated, post_changePassword);

//Admin manager user profile information
router.get("/:id", authenticated, get_profile);

router.get("/reset-password/:id", authenticated, get_resetPassowrd);

router.post("/reset-password/:id", authenticated, post_resetPassowrd);

router.get("/permission-update/:id", authenticated, get_updatePermission);

router.post("/permission-update/:id", authenticated, post_updatePermission);

module.exports = router;
