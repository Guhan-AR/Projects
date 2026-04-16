const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    warehouse_id: { type: String, required: true, unique: true },
    warehouse_name: { type: String, required: true },
    branch_id: { type: String, required: true, ref: 'Branch' },
    warehouse_type: {
        type: String,
        enum: ["Raw Material", "Finished Goods", "Dispatch", "Return", "Combined"]
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String
    },
    total_capacity: Number,
    manager_emp_id: { type: String, ref: 'Employee' },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Warehouse', warehouseSchema);
