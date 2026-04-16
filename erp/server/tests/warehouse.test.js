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

describe('Warehouse & Inventory CRUD', () => {

    describe('Warehouse Operations', () => {
        let whId = 'WH-TEST-01';

        it('should create a new warehouse', async () => {
            const res = await request(app)
                .post('/api/v1/warehouses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    warehouse_id: whId,
                    warehouse_name: 'Test Storage Surat',
                    branch_id: 'TBR01',
                    warehouse_type: 'Finished Goods'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.data.warehouse_id).toBe(whId);
        });

        it('should get all warehouses', async () => {
            const res = await request(app)
                .get('/api/v1/warehouses')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe('Inventory Operations', () => {
        let sku = 'SKU-TEST-001';

        it('should get inventory list', async () => {
            const res = await request(app)
                .get('/api/v1/inventory')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should update stock (Inventory SKU creation/update)', async () => {
            // Pre-requisite: Design
            await request(app)
                .post('/api/v1/designs')
                .set('Authorization', `Bearer ${token}`)
                .send({ design_id: 'D-INV-TEST', design_name: 'Inv Test Design', category: 'Silk' });

            const res = await request(app)
                .post('/api/v1/inventory') // Or put depending on implementation
                .set('Authorization', `Bearer ${token}`)
                .send({
                    sku: sku,
                    design_id: 'D-INV-TEST',
                    warehouse_id: 'WH-TEST-01',
                    batch_id: 'B001',
                    qty_available: 50
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.data.sku).toBe(sku);
        });
    });

    describe('QC Operations', () => {
        it('should create a QC inspection', async () => {
            const res = await request(app)
                .post('/api/v1/qc')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    qc_id: 'QC-TEST-001',
                    prod_order_id: 'P01', // Mock or use real
                    inspector_emp_id: 'ADMIN001',
                    total_inspected: 10,
                    passed_qty: 10,
                    failed_qty: 0,
                    result: 'Passed'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.data.qc_id).toBe('QC-TEST-001');
        });
    });
});
