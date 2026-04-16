const express = require('express');
const { getShipments, createShipment } = require('../controllers/shipmentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getShipments)
    .post(authorize('Warehouse Staff', 'Logistics', 'Admin'), createShipment);

module.exports = router;
