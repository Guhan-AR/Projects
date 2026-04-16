const Employee = require('../models/Employee');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const { generateAccessToken, generateRefreshToken, hashPassword, comparePassword } = require('../utils/auth');

// @desc    Register employee
// @route   POST /api/v1/auth/register
// @access  Private/Admin
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role, dept_id, branch_id, emp_id } = req.body;

        // Create employee
        const hashedPassword = await hashPassword(password);
        const employee = await Employee.create({
            name,
            email,
            password: hashedPassword,
            role,
            dept_id,
            branch_id,
            emp_id
        });

        res.status(201).json({
            success: true,
            data: { id: employee._id, name: employee.name, email: employee.email, role: employee.role }
        });
    } catch (err) {
        logger.error(`Registration Error: ${err.message}`);
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Login employee
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check for employee
        const employee = await Employee.findOne({ email }).select('+password');

        if (!employee) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check for account lockout (simplified)
        if (employee.status === 'Locked') {
            return res.status(403).json({ success: false, message: 'Account is locked due to multiple failed attempts' });
        }

        if (!(await comparePassword(password, employee.password))) {
            // Track failed attempts logic would go here
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Create tokens
        const accessToken = generateAccessToken(employee._id);
        const refreshToken = generateRefreshToken(employee._id);

        res.status(200).json({
            success: true,
            accessToken,
            refreshToken
        });
    } catch (err) {
        logger.error(`Login Error: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Refresh Token
// @route   POST /api/v1/auth/refresh
// @access  Public
exports.refresh = async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ success: false, message: 'Refresh token required' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Check if token is blacklisted in Redis
        const isBlacklisted = await redisClient.get(`blacklist_${refreshToken}`);
        if (isBlacklisted) return res.status(401).json({ success: false, message: 'Token revoked' });

        const newAccessToken = generateAccessToken(decoded.id);
        const newRefreshToken = generateRefreshToken(decoded.id);

        // Optional: Blacklist the old refresh token (Rotation)
        await redisClient.set(`blacklist_${refreshToken}`, 'true', { EX: 7 * 24 * 60 * 60 });

        res.status(200).json({ success: true, accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
};

// @desc    Logout / Revoke Token
// @route   POST /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // Blacklist access token until it expires
        await redisClient.set(`blacklist_${token}`, 'true', { EX: 3600 }); // Assuming 1h expiry
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Logout failed' });
    }
};
