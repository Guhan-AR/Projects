const express = require('express');
const { getUnits, getLooms, createUnit } = require('../controllers/productionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getUnits)
    .post(authorize('Admin', 'Manager'), createUnit);

router.get('/looms', getLooms);

module.exports = router;
