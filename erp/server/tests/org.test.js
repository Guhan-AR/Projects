process.env.NODE_ENV = 'test';
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
    // No need to close mongoose here as setupDB handles connection
});

describe('Organization Module CRUD', () => {

    describe('Branch Operations', () => {
        let branchId = 'test-branch-crud';

        it('should create a new branch', async () => {
            const res = await request(app)
                .post('/api/v1/branches')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    branch_id: branchId,
                    branch_name: 'Test Branch Unit',
                    branch_type: 'Manufacturing',
                    address: { city: 'Surat', state: 'Gujarat' }
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.branch_id).toBe(branchId);
        });

        it('should get all branches', async () => {
            const res = await request(app)
                .get('/api/v1/branches')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        it('should update a branch', async () => {
            const res = await request(app)
                .put(`/api/v1/branches/${branchId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    branch_name: 'Updated Branch Name'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.branch_name).toBe('Updated Branch Name');
        });
    });

    describe('Department Operations', () => {
        let deptId = 'test-dept-crud';

        it('should create a new department', async () => {
            const res = await request(app)
                .post('/api/v1/departments')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    dept_id: deptId,
                    dept_name: 'Production Test',
                    branch_id: 'TBR01' // Established in createTestAdmin
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.data.dept_id).toBe(deptId);
        });

        it('should get all departments', async () => {
            const res = await request(app)
                .get('/api/v1/departments')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});
