const express = require('express');
const { register, login, logout, refresh } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', protect, authorize('Admin'), register);
router.post('/logout', protect, logout);
router.post('/refresh', refresh);

module.exports = router;
