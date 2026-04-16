const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    collection_id: { type: String, required: true, unique: true },
    collection_name: { type: String, required: true },
    season: {
        type: String,
        required: true,
        enum: ["Summer", "Winter", "Monsoon", "Festive", "Wedding", "Year Round"]
    },
    year: { type: Number, required: true },
    launch_date: Date,
    end_date: Date,
    design_ids: [{ type: String, ref: 'SareeDesign' }],
    catalog_url: String,
    status: { type: String, enum: ["Upcoming", "Active", "Ended"], default: "Upcoming" }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Collection', collectionSchema);
