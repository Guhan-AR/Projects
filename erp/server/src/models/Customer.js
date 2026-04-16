const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customer_id: { type: String, required: true, unique: true },
    customer_type: {
        type: String,
        required: true,
        enum: ["Retail", "Wholesale", "Distributor", "Export", "Corporate"]
    },
    name: { type: String, required: true },
    business_name: String,
    email: String,
    phone: { type: String, required: true, unique: true },
    alternate_phone: String,
    gstin: String,
    pan: String,
    billing_address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },
    shipping_addresses: [{
        address_id: String,
        label: String,
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String,
        is_default: Boolean
    }],
    credit_limit: Number,
    outstanding_amount: { type: Number, default: 0 },
    payment_terms_days: Number,
    discount_percentage: Number,
    loyalty_points: { type: Number, default: 0 },
    segment: { type: String, enum: ["Standard", "Silver", "Gold", "Platinum", "VIP"], default: "Standard" },
    assigned_sales_emp: { type: String, ref: 'Employee' },
    preferred_categories: [String],
    kyc_verified: { type: Boolean, default: false },
    kyc_documents: [String],
    source: {
        type: String,
        enum: ["Direct", "Reference", "Exhibition", "Online", "Agent", "Export Agent"]
    },
    status: { type: String, enum: ["Active", "Inactive", "Blocked"], default: "Active" }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Customer', customerSchema);
