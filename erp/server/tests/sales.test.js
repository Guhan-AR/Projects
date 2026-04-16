const request = require('supertest');
const app = require('../src/app');
const { generateTestToken, setupTestDB, cleanDB, createTestAdmin } = require('./utils/testSetup');

let token;
let admin;

beforeAll(async () => {
    await setupTestDB();
    await cleanDB();
    admin = await createTestAdmin();
    token = generateTestToken(admin._id);
});

afterAll(async () => {
    await cleanDB();
});

describe('Sales & Logistics Module CRUD', () => {

    describe('Customer Operations', () => {
        let custId = 'CUST-TEST-001';

        it('should create a new customer', async () => {
            const res = await request(app)
                .post('/api/v1/customers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    customer_id: custId,
                    customer_type: 'Retail',
                    name: 'John Doe Test',
                    phone: '1234567890'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.data.customer_id).toBe(custId);
        });

        it('should get all customers', async () => {
            const res = await request(app)
                .get('/api/v1/customers')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe('Sales Order Operations', () => {
        it('should get sales orders', async () => {
            const res = await request(app)
                .get('/api/v1/sales')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    describe('Payment Operations', () => {
        it('should get payments', async () => {
            const res = await request(app)
                .get('/api/v1/payments')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    describe('Shipment Operations', () => {
        it('should get shipments', async () => {
            const res = await request(app)
                .get('/api/v1/shipments')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});
