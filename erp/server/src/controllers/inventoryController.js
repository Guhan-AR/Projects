const Inventory = require('../models/Inventory');
const logger = require('../utils/logger');

// @desc    Get inventory
// @route   GET /api/v1/inventory
// @access  Private
exports.getInventory = async (req, res, next) => {
    try {
        const inventory = await Inventory.find().populate('design_id warehouse_id');
        res.status(200).json({ success: true, count: inventory.length, data: inventory });
    } catch (err) {
        logger.error(`Get Inventory Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update inventory stock
// @route   PATCH /api/v1/inventory/:sku
// @access  Private/Admin,Manager
exports.updateStock = async (req, res, next) => {
    try {
        const inventory = await Inventory.findOneAndUpdate(
            { sku: req.params.sku },
            req.body,
            { new: true, runValidators: true }
        );

        if (!inventory) {
            return res.status(404).json({ success: false, message: 'Inventory not found' });
        }

        res.status(200).json({ success: true, data: inventory });
    } catch (err) {
        logger.error(`Update Inventory Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
