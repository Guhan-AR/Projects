const express = require('express');
const { getSalesOrders, createSalesOrder } = require('../controllers/salesController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getSalesOrders)
    .post(authorize('Sales Executive', 'Manager', 'Admin'), createSalesOrder);

module.exports = router;
