const WeavingUnit = require('../models/WeavingUnit');
const Loom = require('../models/Loom');
const logger = require('../utils/logger');

// @desc    Get all weaving units
// @route   GET /api/v1/units
// @access  Private
exports.getUnits = async (req, res, next) => {
    try {
        const units = await WeavingUnit.find();
        res.status(200).json({ success: true, count: units.length, data: units });
    } catch (err) {
        logger.error(`Get Units Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get all looms
// @route   GET /api/v1/units/looms
// @access  Private
exports.getLooms = async (req, res, next) => {
    try {
        const looms = await Loom.find().populate('unit_id');
        res.status(200).json({ success: true, count: looms.length, data: looms });
    } catch (err) {
        logger.error(`Get Looms Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create weaving unit
// @route   POST /api/v1/units
// @access  Private/Admin,Manager
exports.createUnit = async (req, res, next) => {
    try {
        const unit = await WeavingUnit.create(req.body);
        res.status(201).json({ success: true, data: unit });
    } catch (err) {
        logger.error(`Create Unit Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
