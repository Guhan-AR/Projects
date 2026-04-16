const express = require('express');
const { getDepartments, createDepartment } = require('../controllers/departmentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getDepartments)
    .post(authorize('Admin'), createDepartment);

module.exports = router;
