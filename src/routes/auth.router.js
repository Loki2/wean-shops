const express = require('express');
const { get_signin, post_signin, get_signout } = require('../controllers/auth.controller');
const { authenticated } = require('../middleware/authHandler');
const router = express.Router();


router.get('/login', get_signin);

router.post('/login', post_signin);

router.get('/logout', authenticated, get_signout);



module.exports = router;