const QCInspection = require('../models/QCInspection');
const ProductionOrder = require('../models/ProductionOrder');
const logger = require('../utils/logger');

// @desc    Get all QC inspections
// @route   GET /api/v1/qc
// @access  Private
exports.getInspections = async (req, res, next) => {
    try {
        const inspections = await QCInspection.find().populate('prod_order_id inspector_emp_id');
        res.status(200).json({ success: true, count: inspections.length, data: inspections });
    } catch (err) {
        logger.error(`Get QC Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create QC inspection
// @route   POST /api/v1/qc
// @access  Private/QC Inspector,Admin
exports.createInspection = async (req, res, next) => {
    try {
        const inspection = await QCInspection.create(req.body);

        // Update production order QC status
        await ProductionOrder.findOneAndUpdate(
            { prod_order_id: inspection.prod_order_id },
            { qc_status: inspection.result, qc_done_by: inspection.inspector_emp_id }
        );

        res.status(201).json({ success: true, data: inspection });
    } catch (err) {
        logger.error(`Create QC Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};
