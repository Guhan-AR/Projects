const express = require('express');
const { getSuppliers, createSupplier } = require('../controllers/supplierController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getSuppliers)
    .post(authorize('Manager', 'Admin'), createSupplier);

module.exports = router;
