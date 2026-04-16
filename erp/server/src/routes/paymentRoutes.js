const express = require('express');
const { getPayments, recordPayment } = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getPayments)
    .post(authorize('Accountant', 'Manager', 'Admin'), recordPayment);

module.exports = router;
