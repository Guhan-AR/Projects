const Department = require('../models/Department');
const logger = require('../utils/logger');

// @desc    Get all departments
// @route   GET /api/v1/departments
// @access  Private
exports.getDepartments = async (req, res, next) => {
    try {
        const departments = await Department.find().populate('branch_id');
        res.status(200).json({ success: true, count: departments.length, data: departments });
    } catch (err) {
        logger.error(`Get Departments Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create department
// @route   POST /api/v1/departments
// @access  Private/Admin
exports.createDepartment = async (req, res, next) => {
    try {
        const department = await Department.create(req.body);
        res.status(201).json({ success: true, data: department });
    } catch (err) {
        logger.error(`Create Department Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
