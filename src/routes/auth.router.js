const express = require('express');
const { get_signin, post_signin, get_register, post_register, get_signout } = require('../controllers/auth.controller');
const { post_addUser } = require('../controllers/user.controller');
const { authenticated } = require('../middleware/authHandler');
const router = express.Router();


router.get('/login', get_signin);

router.post('/login', post_signin);

router.get('/register', get_register); // Assuming signup uses the same view as signin

router.post('/register', post_register);

router.get('/logout', authenticated, get_signout);



module.exports = router;