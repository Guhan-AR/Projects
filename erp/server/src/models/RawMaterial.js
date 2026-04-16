const mongoose = require('mongoose');

const rawMaterialSchema = new mongoose.Schema({
    material_id: { type: String, required: true, unique: true },
    material_name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ["Yarn", "Zari", "Dye", "Chemical", "Packaging", "Thread", "Others"]
    },
    sub_category: String,
    unit: {
        type: String,
        required: true,
        enum: ["kg", "g", "meter", "liter", "piece", "roll", "bundle"]
    },
    current_stock: { type: Number, default: 0 },
    reorder_level: Number,
    reorder_quantity: Number,
    unit_cost: Number,
    warehouse_id: String,
    rack_location: String,
    preferred_supplier_ids: [String],
    hsn_code: String,
    gst_percentage: Number,
    last_purchased_date: Date,
    status: { type: String, enum: ["Active", "Inactive", "Discontinued"], default: "Active" }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('RawMaterial', rawMaterialSchema);
