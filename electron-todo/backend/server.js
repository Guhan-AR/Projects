const express = require('express');
const cors = require('cors');

function startServer(port = 3001) {
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Import database after app is initialized 
    // This allows it to access electron.app correctly if needed
    const db = require('./database');

    // GET /todos - List todos
    app.get('/todos', (req, res) => {
        db.all('SELECT * FROM todos', [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        });
    });

    // POST /todos - Add todo
    app.post('/todos', (req, res) => {
        const { title } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        db.run('INSERT INTO todos (title, completed) VALUES (?, 0)', [title], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, title, completed: false });
        });
    });

    // PUT /todos/:id - Mark todo as completed/uncompleted
    app.put('/todos/:id', (req, res) => {
        const { id } = req.params;
        const { completed } = req.body;

        db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed === true ? 1 : 0, id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
    });

    // DELETE /todos/:id - Delete todo
    app.delete('/todos/:id', (req, res) => {
        const { id } = req.params;
        db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
    });

    const server = app.listen(port, () => {
        console.log(`Backend API Server running silently on port ${port}`);
    });

    return server;
}

module.exports = { startServer };
