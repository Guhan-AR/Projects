if (process.env.JEST_WORKER_ID) {
    process.env.NODE_ENV = 'test';
}
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const setupSecurity = require('./middleware/security');
const logger = require('./utils/logger');
const morgan = require('morgan');

const app = express();

// Connect to Database (Only if not in test mode, or handle it in test setup)
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

// Global Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security Setup
setupSecurity(app);

// Mount Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/branches', require('./routes/branchRoutes'));
app.use('/api/v1/departments', require('./routes/departmentRoutes'));
app.use('/api/v1/suppliers', require('./routes/supplierRoutes'));
app.use('/api/v1/raw-materials', require('./routes/rawMaterialRoutes'));
app.use('/api/v1/designs', require('./routes/designRoutes'));
app.use('/api/v1/collections', require('./routes/collectionRoutes'));
app.use('/api/v1/units', require('./routes/productionRoutes'));
app.use('/api/v1/qc', require('./routes/qcRoutes'));
app.use('/api/v1/warehouses', require('./routes/warehouseRoutes'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'));
app.use('/api/v1/customers', require('./routes/customerRoutes'));
app.use('/api/v1/sales', require('./routes/salesRoutes'));
app.use('/api/v1/payments', require('./routes/paymentRoutes'));
app.use('/api/v1/shipments', require('./routes/shipmentRoutes'));

// Simple Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, status: 'OK', message: 'Saree ERP Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = app;
