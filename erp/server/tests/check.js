const mongoose = require('mongoose');
// Mock NODE_ENV for the check
process.env.NODE_ENV = 'test';
process.env.JEST_WORKER_ID = '1';

const { setupTestDB, cleanDB, createTestAdmin } = require('./utils/testSetup');

const run = async () => {
    try {
        console.log('Setting up DB...');
        await setupTestDB();
        console.log('Cleaning DB...');
        await cleanDB();
        console.log('Creating Admin...');
        const admin = await createTestAdmin();
        console.log('Admin created:', admin.emp_id);
        process.exit(0);
    } catch (err) {
        console.error('FAILED:', err);
        process.exit(1);
    }
};
run();
