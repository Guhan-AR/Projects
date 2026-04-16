const mongoose = require('mongoose');

const salesOrderSchema = new mongoose.Schema({
    order_id: { type: String, required: true, unique: true },
    customer_id: { type: String, required: true, ref: 'Customer' },
    order_date: { type: Date, default: Date.now },
    channel: {
        type: String,
        required: true,
        enum: ["Showroom", "Wholesale", "Online", "Exhibition", "Export", "Corporate", "Phone Order"]
    },
    branch_id: { type: String, ref: 'Branch' },
    sales_emp_id: { type: String, ref: 'Employee' },
    order_items: [{
        item_id: String,
        design_id: { type: String, required: true, ref: 'SareeDesign' },
        sku: { type: String, required: true, ref: 'Inventory' },
        color: String,
        quantity: { type: Number, required: true },
        unit_price: { type: Number, required: true },
        discount_pct: Number,
        discount_amt: Number,
        taxable_amt: Number,
        cgst: Number,
        sgst: Number,
        igst: Number,
        total_amount: Number
    }],
    shipping_address_id: String,
    subtotal: Number,
    total_discount: Number,
    total_tax: Number,
    shipping_charges: Number,
    grand_total: Number,
    advance_paid: { type: Number, default: 0 },
    balance_due: Number,
    currency: { type: String, enum: ["INR", "USD", "EUR", "GBP", "AED"], default: "INR" },
    exchange_rate: { type: Number, default: 1 },
    payment_terms: String,
    expected_delivery: Date,
    actual_delivery: Date,
    payment_status: {
        type: String,
        enum: ["Unpaid", "Partial", "Paid", "Refunded"],
        default: "Unpaid"
    },
    fulfillment_status: {
        type: String,
        enum: ["Pending", "Processing", "Packed", "Shipped", "Delivered", "Returned", "Cancelled"],
        default: "Pending"
    },
    status: {
        type: String,
        enum: ["Draft", "Confirmed", "Processing", "Completed", "Cancelled", "On Hold"],
        default: "Draft"
    },
    notes: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('SalesOrder', salesOrderSchema);
