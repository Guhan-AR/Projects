const express = require('express');
const { getDesigns, createDesign } = require('../controllers/designController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getDesigns)
    .post(authorize('Admin', 'Designer'), createDesign);

module.exports = router;
