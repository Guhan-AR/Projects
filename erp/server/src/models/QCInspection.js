const mongoose = require('mongoose');

const qcInspectionSchema = new mongoose.Schema({
    qc_id: { type: String, required: true, unique: true },
    prod_order_id: { type: String, required: true, ref: 'ProductionOrder' },
    design_id: { type: String, ref: 'SareeDesign' },
    batch_id: String,
    inspector_emp_id: { type: String, required: true, ref: 'Employee' },
    inspection_date: { type: Date, default: Date.now },
    total_inspected: Number,
    passed_qty: Number,
    failed_qty: Number,
    defect_types: [{
        defect_name: String,
        count: Number,
        severity: { type: String, enum: ["Minor", "Major", "Critical"] }
    }],
    sample_images: [String],
    result: { type: String, required: true, enum: ["Passed", "Failed", "Conditional Pass"] },
    action_taken: {
        type: String,
        enum: ["Released", "Rework", "Rejected", "Pending Decision"]
    },
    remarks: String
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('QCInspection', qcInspectionSchema);
