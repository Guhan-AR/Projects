const express = require('express');
const db = require('../database/db');
const { verifyToken } = require('../middleware/auth');
const rbac = require('../middleware/rbac');

const router = express.Router();

// Get the logged in User's cart items
router.get('/', verifyToken, rbac(['User']), (req, res) => {
    const cartItems = db.prepare(`
    SELECT cart_items.id as cart_item_id, cart_items.quantity, products.*, users.username as seller_name
    FROM cart_items
    JOIN products ON cart_items.product_id = products.id
    JOIN users ON products.seller_id = users.id
    WHERE cart_items.user_id = ?
  `).all(req.userId);
    res.json(cartItems);
});

// Add a product to cart or increment quantity
router.post('/', verifyToken, rbac(['User']), (req, res) => {
    const { product_id, quantity = 1 } = req.body;
    if (!product_id) return res.status(400).json({ error: 'Product ID is required' });

    // Check if product exists
    const product = db.prepare('SELECT id FROM products WHERE id = ?').get(product_id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Check if it already exists in the cart
    const existingItem = db.prepare('SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?').get(req.userId, product_id);

    if (existingItem) {
        db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?').run(quantity, existingItem.id);
        return res.json({ success: true, cart_item_id: existingItem.id, new_quantity: existingItem.quantity + quantity });
    } else {
        const insert = db.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)');
        const result = insert.run(req.userId, product_id, quantity);
        return res.json({ success: true, cart_item_id: result.lastInsertRowid, quantity });
    }
});

// Remove an item from the cart
router.delete('/:id', verifyToken, rbac(['User']), (req, res) => {
    const { id } = req.params;

    // Verify ownership
    const cartItem = db.prepare('SELECT id FROM cart_items WHERE id = ? AND user_id = ?').get(id, req.userId);
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found or you do not own it' });

    db.prepare('DELETE FROM cart_items WHERE id = ?').run(id);
    res.json({ success: true });
});

// Clear the cart
router.delete('/', verifyToken, rbac(['User']), (req, res) => {
    db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.userId);
    res.json({ success: true });
});

module.exports = router;
