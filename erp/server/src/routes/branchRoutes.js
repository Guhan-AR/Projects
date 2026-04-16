const express = require('express');
const { getBranches, createBranch } = require('../controllers/branchController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes protected

router.route('/')
    .get(getBranches)
    .post(authorize('Admin'), createBranch);

module.exports = router;
