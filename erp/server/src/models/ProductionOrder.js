const mongoose = require('mongoose');

const productionOrderSchema = new mongoose.Schema({
    prod_order_id: { type: String, required: true, unique: true },
    design_id: { type: String, required: true, ref: 'SareeDesign' },
    color: String,
    quantity: { type: Number, required: true },
    unit_id: { type: String, required: true, ref: 'WeavingUnit' },
    assigned_looms: [{ type: String, ref: 'Loom' }],
    assigned_weavers: [{ type: String, ref: 'Employee' }],
    raw_material_issue: [{
        material_id: { type: String, ref: 'RawMaterial' },
        issued_qty: Number,
        issue_date: { type: Date, default: Date.now }
    }],
    quantity_completed: { type: Number, default: 0 },
    quantity_rejected: { type: Number, default: 0 },
    start_date: Date,
    expected_end_date: Date,
    actual_end_date: Date,
    priority: { type: String, enum: ["Low", "Normal", "High", "Urgent"], default: "Normal" },
    status: {
        type: String,
        enum: ["Planned", "In Progress", "QC Pending", "Completed", "Partially Completed", "On Hold", "Cancelled"],
        default: "Planned"
    },
    qc_status: { type: String, enum: ["Pending", "Passed", "Failed", "Partial Pass"], default: "Pending" },
    qc_remarks: String,
    qc_done_by: String,
    sales_order_ref: String,
    created_by: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('ProductionOrder', productionOrderSchema);
