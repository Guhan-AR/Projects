const mongoose = require('mongoose');

const sareeDesignSchema = new mongoose.Schema({
    design_id: { type: String, required: true, unique: true },
    design_name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ["Silk", "Cotton", "Georgette", "Chiffon", "Linen", "Banarasi", "Kanjivaram", "Chanderi", "Patola", "Others"]
    },
    sub_category: String,
    fabric_type: String,
    weave_pattern: String,
    occasion: [String],
    available_colors: [String],
    design_images: [String],
    dimensions: {
        length_meters: Number,
        width_inches: Number,
        blouse_included: Boolean
    },
    weight_grams: Number,
    production_time_days: Number,
    raw_materials_required: [{
        material_id: { type: String, ref: 'RawMaterial' },
        qty_per_piece: Number,
        unit: String
    }],
    cost_of_production: Number,
    mrp: Number,
    wholesale_price: Number,
    retail_price: Number,
    export_price_usd: Number,
    gst_percentage: Number,
    hsn_code: String,
    collection_id: { type: String, ref: 'Collection' },
    designer_emp_id: { type: String, ref: 'Employee' },
    tags: [String],
    status: {
        type: String,
        enum: ["Active", "Discontinued", "Draft", "Archived"],
        default: "Draft"
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Fulltext search index
sareeDesignSchema.index({ design_name: 'text', category: 'text', tags: 'text' });

module.exports = mongoose.model('SareeDesign', sareeDesignSchema);
