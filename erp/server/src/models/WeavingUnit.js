const mongoose = require('mongoose');

const weavingUnitSchema = new mongoose.Schema({
    unit_id: { type: String, required: true, unique: true },
    unit_name: { type: String, required: true },
    branch_id: { type: String, required: true, ref: 'Branch' },
    unit_type: {
        type: String,
        required: true,
        enum: ["Handloom", "Powerloom", "Hybrid"]
    },
    total_looms: Number,
    active_looms: Number,
    supervisor_emp_id: { type: String, ref: 'Employee' },
    capacity_per_day: Number,
    status: { type: String, enum: ["Active", "Inactive", "Under Maintenance"], default: "Active" }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('WeavingUnit', weavingUnitSchema);
