const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branch_id: { type: String, required: true, unique: true },
    branch_name: { type: String, required: true },
    branch_type: {
        type: String,
        required: true,
        enum: ["HQ", "Manufacturing", "Warehouse", "Showroom", "Regional Office"]
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },
    contact_email: String,
    contact_phone: String,
    gstin: String,
    manager_emp_id: String,
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Branch', branchSchema);
