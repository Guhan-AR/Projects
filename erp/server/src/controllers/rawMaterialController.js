const RawMaterial = require('../models/RawMaterial');
const logger = require('../utils/logger');

// @desc    Get all raw materials
// @route   GET /api/v1/raw-materials
// @access  Private
exports.getRawMaterials = async (req, res, next) => {
    try {
        const materials = await RawMaterial.find();
        res.status(200).json({ success: true, count: materials.length, data: materials });
    } catch (err) {
        logger.error(`Get RawMaterials Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create raw material
// @route   POST /api/v1/raw-materials
// @access  Private/Manager,Admin
exports.createRawMaterial = async (req, res, next) => {
    try {
        const material = await RawMaterial.create(req.body);
        res.status(201).json({ success: true, data: material });
    } catch (err) {
        logger.error(`Create RawMaterial Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
