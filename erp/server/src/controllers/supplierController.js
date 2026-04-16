const Supplier = require('../models/Supplier');
const logger = require('../utils/logger');

// @desc    Get all suppliers
// @route   GET /api/v1/suppliers
// @access  Private
exports.getSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json({ success: true, count: suppliers.length, data: suppliers });
    } catch (err) {
        logger.error(`Get Suppliers Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create supplier
// @route   POST /api/v1/suppliers
// @access  Private/Manager,Admin
exports.createSupplier = async (req, res, next) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(201).json({ success: true, data: supplier });
    } catch (err) {
        logger.error(`Create Supplier Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
