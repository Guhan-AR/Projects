const express = require('express');
const { getCollections, createCollection } = require('../controllers/collectionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getCollections)
    .post(authorize('Admin', 'Manager'), createCollection);

module.exports = router;
