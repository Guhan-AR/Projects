import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the HMS Backend API' });
});

// Mock Stats (to quickly serve frontend with beautiful dashboard data)
app.get('/api/stats', async (req, res) => {
    try {
        // Since database might be empty, we mock data for the frontend prototype
        return res.json({
            bedOccupancy: 85,
            activeER: 12,
            doctorsOnDuty: 24,
            revenueToday: 15400,
            pendingPatients: 8
        });
    } catch (err) {
        res.status(500).json({ status: 'Error', error: err.message });
    }
});

// Inventory - Mocked temporarily for frontend testing
app.get('/api/inventory', async (req, res) => {
    try {
        // Attempt to fetch from DB, but return mock data for frontend demo if empty
        const items = await prisma.inventoryItem.findMany();
        if (items.length > 0) {
           return res.json(items);
        }
        
        return res.json([
            { id: 1, name: 'Paracetamol 500mg', category: 'MEDICINE', quantity: 450, threshold: 100, supplier: 'PharmaCorp' },
            { id: 2, name: 'Surgical Masks', category: 'CONSUMABLE', quantity: 20, threshold: 500, supplier: 'HealthPlus' }, // Low stock
            { id: 3, name: 'MRI Contrast Dye', category: 'MEDICINE', quantity: 15, threshold: 50, supplier: 'MedTech' },
            { id: 4, name: 'Syringes 5ml', category: 'CONSUMABLE', quantity: 1200, threshold: 300, supplier: 'PharmaCorp' },
        ]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
