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

describe('Supply Module CRUD', () => {

    describe('Supplier Operations', () => {
        let supplierId = 'SUP-TEST-001';

        it('should create a new supplier', async () => {
            const res = await request(app)
                .post('/api/v1/suppliers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    supplier_id: supplierId,
                    supplier_name: 'Test Supplier Silk',
                    supplier_type: 'Yarn',
                    contact_person: 'Mr. Supplier'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.supplier_id).toBe(supplierId);
        });

        it('should get all suppliers', async () => {
            const res = await request(app)
                .get('/api/v1/suppliers')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe('Raw Material Operations', () => {
        let materialId = 'MAT-TEST-001';

        it('should create a new raw material', async () => {
            const res = await request(app)
                .post('/api/v1/raw-materials')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    material_id: materialId,
                    material_name: 'Gold Zari Thread',
                    category: 'Zari',
                    unit: 'meter',
                    current_stock: 5000
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.data.material_id).toBe(materialId);
        });

        it('should get all raw materials', async () => {
            const res = await request(app)
                .get('/api/v1/raw-materials')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});
