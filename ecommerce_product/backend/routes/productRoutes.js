const express = require('express');
const db = require('../database/db');
const { verifyToken } = require('../middleware/auth');
const rbac = require('../middleware/rbac');

const router = express.Router();

// Public store essentially, but let's make it so that User, Seller, Admin can all view products
router.get('/', (req, res) => {
    const products = db.prepare(`
    SELECT products.*, users.username as seller_name 
    FROM products 
    JOIN users ON products.seller_id = users.id
  `).all();
    res.json(products);
});

// Get currently logged in seller's products
router.get('/my-products', verifyToken, rbac(['Seller']), (req, res) => {
    const products = db.prepare('SELECT * FROM products WHERE seller_id = ?').all(req.userId);
    res.json(products);
});

// Admin can see everything or we just use '/' for admin too
// Adding products: only Seller and Admin
router.post('/', verifyToken, rbac(['Seller', 'Admin']), (req, res) => {
    const { name, description, price } = req.body;
    if (!name || price == null) return res.status(400).json({ error: 'Missing fields' });

    const insert = db.prepare('INSERT INTO products (name, description, price, seller_id) VALUES (?, ?, ?, ?)');
    const result = insert.run(name, description, price, req.userId);
    res.json({ id: result.lastInsertRowid, ...req.body, seller_id: req.userId });
});

router.put('/:id', verifyToken, rbac(['Seller', 'Admin']), (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!product) return res.status(404).json({ error: 'Not found' });

    // Verify ownership or Admin role
    if (req.userRole !== 'Admin' && product.seller_id !== req.userId) {
        return res.status(403).json({ error: 'Forbidden: You do not own this product' });
    }

    db.prepare('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?')
        .run(name, description, price, id);

    res.json({ success: true });
});

router.delete('/:id', verifyToken, rbac(['Seller', 'Admin']), (req, res) => {
    const { id } = req.params;

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!product) return res.status(404).json({ error: 'Not found' });

    // Verify ownership or Admin role
    if (req.userRole !== 'Admin' && product.seller_id !== req.userId) {
        return res.status(403).json({ error: 'Forbidden: You do not own this product' });
    }

    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    res.json({ success: true });
});

module.exports = router;
