const express = require('express');
const { getWarehouses, createWarehouse } = require('../controllers/warehouseController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getWarehouses)
    .post(authorize('Admin', 'Manager'), createWarehouse);

module.exports = router;
