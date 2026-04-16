const express = require('express');
const { getInspections, createInspection } = require('../controllers/qcController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getInspections)
    .post(authorize('QC Inspector', 'Admin'), createInspection);

module.exports = router;
