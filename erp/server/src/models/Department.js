const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    dept_id: { type: String, required: true, unique: true },
    dept_name: { type: String, required: true },
    branch_id: { type: String, required: true, ref: 'Branch' },
    head_emp_id: String,
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
