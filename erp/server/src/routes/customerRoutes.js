const express = require('express');
const { getCustomers, createCustomer } = require('../controllers/customerController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getCustomers)
    .post(authorize('Sales Executive', 'Manager', 'Admin'), createCustomer);

module.exports = router;
