const express = require('express');
const { getRawMaterials, createRawMaterial } = require('../controllers/rawMaterialController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getRawMaterials)
    .post(authorize('Manager', 'Admin'), createRawMaterial);

module.exports = router;
