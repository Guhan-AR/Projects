const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    emp_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: String,
    dept_id: { type: String, required: true, ref: 'Department' },
    branch_id: { type: String, required: true, ref: 'Branch' },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Manager", "Supervisor", "Weaver", "QC Inspector", "Sales Executive", "Accountant", "Warehouse Staff", "Designer"]
    },
    designation: String,
    date_of_joining: Date,
    salary: Number,
    skills: [String],
    aadhar: String,
    pan: String,
    bank_details: {
        account_no: String,
        ifsc: String,
        bank_name: String
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "On Leave", "Terminated", "Locked"],
        default: "Active"
    },
    password: { type: String, select: false } // For authentication later
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Employee', employeeSchema);
