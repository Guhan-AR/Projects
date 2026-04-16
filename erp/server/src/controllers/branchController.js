const Branch = require('../models/Branch');
const logger = require('../utils/logger');

// @desc    Get all branches
// @route   GET /api/v1/branches
// @access  Private
exports.getBranches = async (req, res, next) => {
    try {
        const branches = await Branch.find();
        res.status(200).json({ success: true, count: branches.length, data: branches });
    } catch (err) {
        logger.error(`Get Branches Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create branch
// @route   POST /api/v1/branches
// @access  Private/Admin
exports.createBranch = async (req, res, next) => {
    try {
        const branch = await Branch.create(req.body);
        res.status(201).json({ success: true, data: branch });
    } catch (err) {
        logger.error(`Create Branch Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
