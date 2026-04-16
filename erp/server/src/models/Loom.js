const mongoose = require('mongoose');

const loomSchema = new mongoose.Schema({
    loom_id: { type: String, required: true, unique: true },
    unit_id: { type: String, required: true, ref: 'WeavingUnit' },
    loom_type: {
        type: String,
        required: true,
        enum: ["Handloom", "Powerloom", "Jacquard", "Dobby", "Rapier"]
    },
    assigned_weaver: { type: String, ref: 'Employee' },
    current_order_id: String,
    last_maintenance: Date,
    next_maintenance: Date,
    status: {
        type: String,
        enum: ["Idle", "In Use", "Under Maintenance", "Breakdown"],
        default: "Idle"
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Loom', loomSchema);
