const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const logger = require('../utils/logger');
const redisClient = require('../config/redis');

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
        // Check if token is blacklisted in Redis
        const isBlacklisted = await redisClient.get(`blacklist_${token}`);
        if (isBlacklisted) {
            console.log('AUTH DEBUG: Token blacklisted');
            return res.status(401).json({ success: false, message: 'Token revoked' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('AUTH DEBUG: Decoded ID:', decoded.id);

        req.user = await Employee.findById(decoded.id);
        if (!req.user) {
            console.log('AUTH DEBUG: User NOT FOUND in DB for ID:', decoded.id);
            return res.status(401).json({ success: false, message: 'User no longer exists' });
        }

        next();
    } catch (err) {
        console.log('AUTH DEBUG: Error:', err.message);
        logger.error(`Auth Error: ${err.message}`);
        return res.status(401).json({ success: false, message: 'Not authorized' });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};
