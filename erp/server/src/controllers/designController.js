const SareeDesign = require('../models/SareeDesign');
const logger = require('../utils/logger');

// @desc    Get all designs
// @route   GET /api/v1/designs
// @access  Private
exports.getDesigns = async (req, res, next) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category) query.category = category;
        if (search) query.$text = { $search: search };

        const designs = await SareeDesign.find(query);
        res.status(200).json({ success: true, count: designs.length, data: designs });
    } catch (err) {
        logger.error(`Get Designs Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create design
// @route   POST /api/v1/designs
// @access  Private/Admin,Designer
exports.createDesign = async (req, res, next) => {
    try {
        const design = await SareeDesign.create(req.body);
        res.status(201).json({ success: true, data: design });
    } catch (err) {
        logger.error(`Create Design Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
