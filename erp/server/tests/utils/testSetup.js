const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Employee = require('../../src/models/Employee');
const Branch = require('../../src/models/Branch');
const Department = require('../../src/models/Department');

const generateTestToken = (id, role = 'Admin') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

const setupTestDB = async () => {
    const testUri = 'mongodb://localhost:27017/saree_mnc_test_db';
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(testUri);
    }
    console.log('TEST DEBUG: Connected to DB:', mongoose.connection.name);
};

const cleanDB = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany();
    }
};

const createTestAdmin = async () => {
    // Create dependencies first
    await Branch.create({ branch_id: "TBR01", branch_name: "Test Branch", branch_type: "HQ", status: "Active" });
    await Department.create({ dept_id: "TDP01", dept_name: "Test Dept", branch_id: "TBR01" });

    const admin = await Employee.create({
        emp_id: 'ADMIN001',
        name: 'Test Admin',
        email: 'testadmin@erp.com',
        dept_id: 'TDP01',
        branch_id: 'TBR01',
        role: 'Admin',
        status: 'Active',
        password: 'password123'
    });
    const check = await Employee.findById(admin._id);
    console.log('TEST DEBUG: Admin found after create:', !!check);
    return admin;
};

module.exports = {
    generateTestToken,
    setupTestDB,
    cleanDB,
    createTestAdmin
};
