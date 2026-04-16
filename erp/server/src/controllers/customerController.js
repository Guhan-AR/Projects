const Customer = require('../models/Customer');
const logger = require('../utils/logger');

// @desc    Get all customers
// @route   GET /api/v1/customers
// @access  Private
exports.getCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({ success: true, count: customers.length, data: customers });
    } catch (err) {
        logger.error(`Get Customers Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create customer
// @route   POST /api/v1/customers
// @access  Private/Sales Executive,Manager,Admin
exports.createCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json({ success: true, data: customer });
    } catch (err) {
        logger.error(`Create Customer Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
