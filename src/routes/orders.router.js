const express = require('express');
const { authenticated } = require('../middleware/authHandler');
const { get_orders } = require('../controllers/admin.controller')

const router = express.Router();



router.get('/', authenticated, get_orders)


module.exports = router;