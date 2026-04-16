const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    sku: { type: String, required: true, unique: true },
    design_id: { type: String, required: true, ref: 'SareeDesign' },
    color: String,
    batch_id: { type: String, required: true },
    prod_order_id: { type: String, ref: 'ProductionOrder' },
    barcode: String,
    warehouse_id: { type: String, required: true, ref: 'Warehouse' },
    rack_location: String,
    qty_available: { type: Number, default: 0 },
    qty_reserved: { type: Number, default: 0 },
    qty_sold: { type: Number, default: 0 },
    qty_damaged: { type: Number, default: 0 },
    cost_per_piece: Number,
    mrp: Number,
    manufacturing_date: Date,
    status: {
        type: String,
        enum: ["Available", "Reserved", "Sold Out", "Damaged", "Returned"],
        default: "Available"
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Inventory', inventorySchema);
