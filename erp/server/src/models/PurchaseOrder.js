const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
    po_id: { type: String, required: true, unique: true },
    supplier_id: { type: String, required: true, ref: 'Supplier' },
    branch_id: { type: String, required: true, ref: 'Branch' },
    order_date: { type: Date, default: Date.now },
    expected_date: Date,
    received_date: Date,
    items: [{
        material_id: { type: String, required: true, ref: 'RawMaterial' },
        quantity: { type: Number, required: true },
        unit: String,
        unit_price: { type: Number, required: true },
        total_price: Number,
        received_qty: { type: Number, default: 0 },
        rejected_qty: { type: Number, default: 0 }
    }],
    subtotal: Number,
    tax_amount: Number,
    total_amount: Number,
    payment_status: { type: String, enum: ["Pending", "Partial", "Paid"], default: "Pending" },
    status: {
        type: String,
        enum: ["Draft", "Approved", "Dispatched", "Partially Received", "Received", "Cancelled"],
        default: "Draft"
    },
    approved_by: String,
    remarks: String,
    created_by: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
