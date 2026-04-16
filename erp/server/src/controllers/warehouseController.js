const Warehouse = require('../models/Warehouse');
const logger = require('../utils/logger');

// @desc    Get all warehouses
// @route   GET /api/v1/warehouses
// @access  Private
exports.getWarehouses = async (req, res, next) => {
    try {
        const warehouses = await Warehouse.find().populate('branch_id manager_emp_id');
        res.status(200).json({ success: true, count: warehouses.length, data: warehouses });
    } catch (err) {
        logger.error(`Get Warehouses Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create warehouse
// @route   POST /api/v1/warehouses
// @access  Private/Admin,Manager
exports.createWarehouse = async (req, res, next) => {
    try {
        const warehouse = await Warehouse.create(req.body);
        res.status(201).json({ success: true, data: warehouse });
    } catch (err) {
        logger.error(`Create Warehouse Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
