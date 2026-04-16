const Collection = require('../models/Collection');
const logger = require('../utils/logger');

// @desc    Get all collections
// @route   GET /api/v1/collections
// @access  Private
exports.getCollections = async (req, res, next) => {
    try {
        const collections = await Collection.find();
        res.status(200).json({ success: true, count: collections.length, data: collections });
    } catch (err) {
        logger.error(`Get Collections Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create collection
// @route   POST /api/v1/collections
// @access  Private/Admin,Manager
exports.createCollection = async (req, res, next) => {
    try {
        const collection = await Collection.create(req.body);
        res.status(201).json({ success: true, data: collection });
    } catch (err) {
        logger.error(`Create Collection Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
