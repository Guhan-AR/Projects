const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const setupSecurity = (app) => {
    // 1. Helmet for secure HTTP headers
    app.use(helmet());

    // 2. CORS - Cross-Origin Resource Sharing
    app.use(cors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }));

    // 3. Rate Limiting - Protection against Brute-force/DoS
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again after 15 minutes'
    });
    app.use('/api/', limiter);

    // 4. NoSQL Injection Protection
    app.use(mongoSanitize());

    // 5. XSS Protection
    app.use(xss());

    // 6. HTTP Parameter Pollution (HPP) prevention
    app.use(hpp());

    // 7. Cookie Parser for CSRF
    app.use(cookieParser());

    // 8. CSRF Protection (Optional: only for specific routes if desired)
    // app.use(csrf({ cookie: true }));

    // 9. Body parser with size limit
    const express = require('express');
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true, limit: '10kb' }));
};

module.exports = setupSecurity;
