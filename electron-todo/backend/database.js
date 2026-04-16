const sqlite3 = require('@libsql/sqlite3').verbose();
const path = require('path');
const { app } = require('electron');

let dbPath;

// When running inside Electron packaged app, use user data directory to store database
// Otherwise, the database will be read-only inside the ASAR archive
if (app && app.isPackaged) {
    dbPath = path.join(app.getPath('userData'), 'todos.db');
} else {
    // In development mode, store it alongside the project files
    dbPath = path.join(__dirname, 'todos.db');
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database at:', dbPath);

        // Auto initialize table on first run
        db.run(`CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            completed BOOLEAN DEFAULT 0
        )`, (err) => {
            if (err) console.error("Could not create table", err);
        });
    }
});

module.exports = db;
