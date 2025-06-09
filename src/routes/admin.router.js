const express = require('express');
const { authenticated } = require('../middleware/authHandler');
const { get_admin, get_Organize, post_Organize, update_Organize, get_feedbacks, get_orders } = require('../controllers/admin.controller')

const router = express.Router();

router.get('/', authenticated, get_admin);

router.get('/org', authenticated, get_Organize);

router.post('/org', authenticated, post_Organize);

router.post('/org/update/:id', authenticated, update_Organize);

router.get('/mana-orders', authenticated, get_orders)

router.get('/feedbacks', authenticated, get_feedbacks);

module.exports = router;