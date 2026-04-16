const Shipment = require('../models/Shipment');
const logger = require('../utils/logger');

// @desc    Get all shipments
// @route   GET /api/v1/shipments
// @access  Private
exports.getShipments = async (req, res, next) => {
    try {
        const shipments = await Shipment.find().populate('order_id warehouse_id');
        res.status(200).json({ success: true, count: shipments.length, data: shipments });
    } catch (err) {
        logger.error(`Get Shipments Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create shipment
// @route   POST /api/v1/shipments
// @access  Private/Warehouse Staff,Logistics,Admin
exports.createShipment = async (req, res, next) => {
    try {
        const shipment = await Shipment.create(req.body);
        res.status(201).json({ success: true, data: shipment });
    } catch (err) {
        logger.error(`Create Shipment Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
