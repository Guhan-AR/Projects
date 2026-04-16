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

describe('Design Module CRUD', () => {

    describe('Collection Operations', () => {
        let collId = 'COLL-2026-TEST';

        it('should create a new collection', async () => {
            const res = await request(app)
                .post('/api/v1/collections')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    collection_id: collId,
                    collection_name: 'Summer Silk 2026',
                    season: 'Summer',
                    year: 2026
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.data.collection_id).toBe(collId);
        });

        it('should get all collections', async () => {
            const res = await request(app)
                .get('/api/v1/collections')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe('Saree Design Operations', () => {
        let designId = 'DES-MNC-001';

        it('should create a new design', async () => {
            const res = await request(app)
                .post('/api/v1/designs')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    design_id: designId,
                    design_name: 'Royal Kanjivaram Blue',
                    category: 'Kanjivaram',
                    mrp: 25000,
                    collection_id: 'COLL-2026-TEST',
                    designer_emp_id: 'ADMIN001'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.data.design_id).toBe(designId);
        });

        it('should get all designs', async () => {
            const res = await request(app)
                .get('/api/v1/designs')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});
