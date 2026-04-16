const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './.env' });

// Load models
const Branch = require('../models/Branch');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const importData = async () => {
    try {
        console.log('Seeding Branches...');
        await Branch.create([
            { branch_id: "BR001", branch_name: "Surat Hub", branch_type: "Manufacturing", address: { city: "Surat", state: "Gujarat", country: "India" }, status: "Active" }
        ]);
        console.log('Success!');
        process.exit();
    } catch (err) {
        console.error('FAIL:', err);
        process.exit(1);
    }
};

importData();
