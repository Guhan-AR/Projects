const express = require('express');
const { getInventory, updateStock } = require('../controllers/inventoryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getInventory);

router.route('/:sku')
    .patch(authorize('Admin', 'Manager'), updateStock);

module.exports = router;
