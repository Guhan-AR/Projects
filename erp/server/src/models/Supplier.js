const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplier_id: { type: String, required: true, unique: true },
    supplier_name: { type: String, required: true },
    supplier_type: {
        type: String,
        required: true,
        enum: ["Yarn", "Zari", "Dye", "Chemical", "Packaging", "Loom Parts", "Others"]
    },
    contact_person: String,
    email: String,
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },
    gstin: String,
    pan: String,
    bank_details: {
        account_no: String,
        ifsc: String,
        bank_name: String
    },
    payment_terms_days: Number,
    credit_limit: Number,
    outstanding_amount: { type: Number, default: 0 },
    rating: { type: Number, min: 1, max: 5 },
    materials_supplied: [String],
    status: { type: String, enum: ["Active", "Inactive", "Blacklisted"], default: "Active" }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Supplier', supplierSchema);
