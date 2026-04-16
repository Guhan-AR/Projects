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

describe('Production Module CRUD', () => {

    describe('Weaving Unit Operations', () => {
        let unitId = 'UNIT-TEST-01';

        it('should create a new weaving unit', async () => {
            const res = await request(app)
                .post('/api/v1/units')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    unit_id: unitId,
                    unit_name: 'Test Loom Center',
                    branch_id: 'TBR01',
                    unit_type: 'Handloom'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.data.unit_id).toBe(unitId);
        });

        it('should get all units', async () => {
            const res = await request(app)
                .get('/api/v1/units')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe('Production Order Operations', () => {
        let prodOrderId = 'PO-TEST-2026';

        it('should create a new production order', async () => {
            // Pre-requisite: Design
            const design = await request(app)
                .post('/api/v1/designs')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    design_id: 'D-PO-TEST',
                    design_name: 'PO Test Design',
                    category: 'Silk'
                });

            const res = await request(app)
                .post('/api/v1/units/orders') // Adjusting based on common patterns if subroutes exist
                .set('Authorization', `Bearer ${token}`)
                .send({
                    prod_order_id: prodOrderId,
                    design_id: 'D-PO-TEST',
                    quantity: 100,
                    unit_id: 'UNIT-TEST-01'
                });

            // Check if route exists or if it's top level /api/v1/production?
            // Re-checking routes...
            expect(res.statusCode).toBe(201);
        });
    });
});
