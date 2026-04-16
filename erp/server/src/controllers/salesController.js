const SalesOrder = require('../models/SalesOrder');
const logger = require('../utils/logger');

// @desc    Get all sales orders
// @route   GET /api/v1/sales
// @access  Private
exports.getSalesOrders = async (req, res, next) => {
    try {
        const orders = await SalesOrder.find().populate('customer_id');
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        logger.error(`Get Sales Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create sales order
// @route   POST /api/v1/sales
// @access  Private/Sales Executive,Manager,Admin
exports.createSalesOrder = async (req, res, next) => {
    try {
        const order = await SalesOrder.create(req.body);
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        logger.error(`Create Sales Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
