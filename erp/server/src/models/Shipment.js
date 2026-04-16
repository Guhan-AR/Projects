const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    shipment_id: { type: String, required: true, unique: true },
    order_id: { type: String, required: true, ref: 'SalesOrder' },
    warehouse_id: { type: String, required: true, ref: 'Warehouse' },
    carrier: { type: String, required: true },
    tracking_number: String,
    awb_number: String,
    shipment_type: { type: String, enum: ["Domestic", "International"] },
    packages: [{
        package_id: String,
        weight_kg: Number,
        dimensions_cm: String,
    }],
    status: {
        type: String,
        enum: ["Pending", "In Transit", "Out for Delivery", "Delivered", "Failed", "Returned"],
        default: "Pending"
    },
    estimated_delivery: Date,
    actual_delivery: Date
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Shipment', shipmentSchema);
