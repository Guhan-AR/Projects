const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './.env' });

const { Double, Int32 } = mongoose.mongo;

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const db = mongoose.connection.db;
        console.log('--- MongoDB Connected (Native) ---');

        const collections = [
            'branches', 'departments', 'employees', 'suppliers', 'rawmaterials',
            'collections', 'sareedesigns', 'weavingunits', 'looms',
            'productionorders', 'qcinspections', 'warehouses', 'inventories',
            'customers', 'salesorders', 'payments', 'shipments'
        ];

        console.log('--- Truncating collections ---');
        for (const colName of collections) {
            await db.collection(colName).deleteMany({});
        }

        console.log('1. Seeding Branches...');
        await db.collection('branches').insertMany([
            { branch_id: "BR001", branch_name: "Surat Hub", branch_type: "Manufacturing", address: { city: "Surat", state: "Gujarat", country: "India" }, status: "Active", created_at: new Date(), updated_at: new Date() },
            { branch_id: "HQ001", branch_name: "Mumbai HQ", branch_type: "HQ", address: { city: "Mumbai", state: "Maharashtra", country: "India" }, status: "Active", created_at: new Date(), updated_at: new Date() }
        ]);

        console.log('2. Seeding Departments...');
        await db.collection('departments').insertMany([
            { dept_id: "DEP001", dept_name: "Production", branch_id: "BR001", status: "Active", createdAt: new Date(), updatedAt: new Date() },
            { dept_id: "DEP003", dept_name: "Sales", branch_id: "HQ001", status: "Active", createdAt: new Date(), updatedAt: new Date() }
        ]);

        console.log('3. Seeding Employees...');
        await db.collection('employees').insertMany([
            { emp_id: "EMP001", name: "Admin", email: "admin@erp.com", dept_id: "DEP001", branch_id: "BR001", role: "Admin", status: "Active", salary: new Double(50000.0), date_of_joining: new Date(), created_at: new Date(), updated_at: new Date() },
            { emp_id: "EMP002", name: "Designer", email: "des1@erp.com", dept_id: "DEP003", branch_id: "HQ001", role: "Designer", status: "Active", salary: new Double(40000.0), date_of_joining: new Date(), created_at: new Date(), updated_at: new Date() }
        ]);

        console.log('4. Seeding Suppliers...');
        await db.collection('suppliers').insertMany([{
            supplier_id: "S01", supplier_name: "Sup 1", supplier_type: "Yarn", status: "Active",
            credit_limit: new Double(100000.0), outstanding_amount: new Double(0.0), rating: new Double(5.0),
            materials_supplied: [], created_at: new Date(), updated_at: new Date()
        }]);

        console.log('5. Seeding Raw Materials...');
        await db.collection('rawmaterials').insertMany([{
            material_id: "M01", material_name: "Yarn 1", category: "Yarn", unit: "kg",
            current_stock: new Double(100.0), unit_cost: new Double(500.0), preferred_supplier_ids: [],
            created_at: new Date(), updated_at: new Date(), status: "Active"
        }]);

        console.log('6. Seeding Collections...');
        await db.collection('collections').insertMany([{
            collection_id: "C01", collection_name: "Winter 26", season: "Winter",
            year: new Int32(2026), launch_date: new Date(), design_ids: [], status: "Upcoming", created_at: new Date()
        }]);

        console.log('7. Seeding Designs...');
        await db.collection('sareedesigns').insertMany([{
            design_id: "D01", design_name: "Design 1", category: "Silk", collection_id: "C01",
            designer_emp_id: "EMP002", mrp: new Double(10000.0), wholesale_price: new Double(8000.0),
            raw_materials_required: [], occasion: [], available_colors: [], design_images: [], tags: [],
            status: "Draft", created_at: new Date(), updated_at: new Date()
        }]);

        console.log('8. Seeding Production...');
        await db.collection('weavingunits').insertMany([{
            unit_id: "U01", unit_name: "Unit 1", branch_id: "BR001", unit_type: "Handloom",
            status: "Active", created_at: new Date()
        }]);
        await db.collection('looms').insertMany([{
            loom_id: "L01", unit_id: "U01", loom_type: "Handloom", status: "Idle",
            created_at: new Date()
        }]);
        await db.collection('productionorders').insertMany([{
            prod_order_id: "P01", design_id: "D01", quantity: new Int32(10), unit_id: "U01",
            assigned_looms: [], assigned_weavers: [], raw_material_issue: [],
            start_date: new Date(), expected_end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: "Planned", qc_status: "Pending", created_at: new Date(), updated_at: new Date()
        }]);

        console.log('9. Seeding QC & Warehouse...');
        await db.collection('qcinspections').insertMany([{
            qc_id: "Q01", prod_order_id: "P01", design_id: "D01", inspector_emp_id: "EMP001",
            result: "Passed", inspection_date: new Date(), defect_types: [], sample_images: [],
            total_inspected: new Int32(10), passed_qty: new Int32(9), failed_qty: new Int32(1),
            created_at: new Date()
        }]);
        await db.collection('warehouses').insertMany([{
            warehouse_id: "W01", warehouse_name: "WH 1", branch_id: "BR001",
            warehouse_type: "Finished Goods", status: "Active", created_at: new Date()
        }]);
        await db.collection('inventories').insertMany([{
            sku: "SKU01", design_id: "D01", batch_id: "B1", warehouse_id: "W01",
            qty_available: new Int32(10), qty_reserved: new Int32(0), qty_sold: new Int32(0), qty_damaged: new Int32(0),
            mrp: new Double(10000.0), cost_per_piece: new Double(8000.0),
            manufacturing_date: new Date(), status: "Available", created_at: new Date(), updated_at: new Date()
        }]);

        console.log('10. Seeding Sales & Logistics...');
        await db.collection('customers').insertMany([{
            customer_id: "C1", customer_type: "Retail", name: "Cust 1", phone: "1234567890",
            shipping_addresses: [], kyc_documents: [], preferred_categories: [],
            credit_limit: new Double(5000.0), outstanding_amount: new Double(0.0), status: "Active",
            created_at: new Date(), updated_at: new Date()
        }]);
        await db.collection('salesorders').insertMany([{
            order_id: "SO01", customer_id: "C1", channel: "Online", grand_total: new Double(2000.0),
            total_discount: new Double(0), total_tax: new Double(0), shipping_charges: new Double(0),
            advance_paid: new Double(0), balance_due: new Double(2000),
            order_items: [{ item_id: "I1", design_id: "D01", sku: "SKU01", quantity: new Int32(2), unit_price: new Double(1000.0), total_amount: new Double(2000.0) }],
            payment_status: "Unpaid", fulfillment_status: "Pending", status: "Confirmed",
            created_at: new Date(), updated_at: new Date()
        }]);
        await db.collection('payments').insertMany([{
            payment_id: "PAY01", payment_type: "Received", reference_id: "SO01",
            party_id: "C1", amount: new Double(1000.0), payment_date: new Date(), party_type: "Customer",
            status: "Pending", payment_mode: "Cash", created_at: new Date()
        }]);
        await db.collection('shipments').insertMany([{
            shipment_id: "S01", order_id: "SO01", warehouse_id: "W01", carrier: "DHL",
            packages: [], status: "Pending", estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            created_at: new Date()
        }]);

        console.log('✅ ALL MODULES SEEDED SUCCESSFULLY (Native)');
        process.exit();
    } catch (err) {
        console.error('FATAL ERROR:', JSON.stringify(err, null, 2));
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const db = mongoose.connection.db;
        const collections = [
            'branches', 'departments', 'employees', 'suppliers', 'rawmaterials',
            'collections', 'sareedesigns', 'weavingunits', 'looms',
            'productionorders', 'qcinspections', 'warehouses', 'inventories',
            'customers', 'salesorders', 'payments', 'shipments'
        ];
        for (const colName of collections) {
            await db.collection(colName).deleteMany({});
        }
        console.log('--- Data Destroyed (Native) ---');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
