const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    payment_id: { type: String, required: true, unique: true },
    payment_type: { type: String, required: true, enum: ["Received", "Paid"] },
    reference_id: { type: String, required: true },
    reference_type: {
        type: String,
        enum: ["Sales Order", "Purchase Order", "Advance", "Refund"]
    },
    party_id: { type: String, required: true },
    party_type: { type: String, enum: ["Customer", "Supplier"] },
    amount: { type: Number, required: true },
    currency: { type: String, enum: ["INR", "USD", "EUR", "GBP", "AED"], default: "INR" },
    exchange_rate: { type: Number, default: 1 },
    payment_mode: {
        type: String,
        enum: ["Cash", "Cheque", "NEFT", "RTGS", "UPI", "Card", "DD", "Bank Transfer", "LC"]
    },
    transaction_ref: String,
    bank_account: String,
    payment_date: { type: Date, default: Date.now },
    status: { type: String, enum: ["Pending", "Cleared", "Bounced", "Cancelled"], default: "Pending" },
    tds_amount: { type: Number, default: 0 },
    remarks: String,
    recorded_by: { type: String, ref: 'Employee' }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Payment', paymentSchema);
