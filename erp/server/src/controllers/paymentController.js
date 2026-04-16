const Payment = require('../models/Payment');
const logger = require('../utils/logger');

// @desc    Get all payments
// @route   GET /api/v1/payments
// @access  Private
exports.getPayments = async (req, res, next) => {
    try {
        const payments = await Payment.find();
        res.status(200).json({ success: true, count: payments.length, data: payments });
    } catch (err) {
        logger.error(`Get Payments Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Record payment
// @route   POST /api/v1/payments
// @access  Private/Accountant,Manager,Admin
exports.recordPayment = async (req, res, next) => {
    try {
        req.body.recorded_by = req.user.id;
        const payment = await Payment.create(req.body);
        res.status(201).json({ success: true, data: payment });
    } catch (err) {
        logger.error(`Record Payment Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
