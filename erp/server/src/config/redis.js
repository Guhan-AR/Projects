const redis = require('redis');
const logger = require('../utils/logger');

let client;

console.log('DEBUG: redis.js loading. NODE_ENV:', process.env.NODE_ENV, 'JEST:', !!process.env.JEST_WORKER_ID);
if (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID) {
    // Mock Redis for testing
    client = {
        connect: async () => { },
        get: async () => null,
        set: async () => { },
        del: async () => { },
        on: () => { },
        quit: async () => { },
        isOpen: true
    };
} else {
    client = redis.createClient({
        url: process.env.REDIS_URL
    });

    client.on('error', (err) => logger.error('Redis Client Error', err));

    const connectRedis = async () => {
        try {
            await client.connect();
            logger.info('Connected to Redis...');
        } catch (err) {
            logger.error(`Redis connection error: ${err.message}`);
        }
    };

    connectRedis();
}

module.exports = client;
