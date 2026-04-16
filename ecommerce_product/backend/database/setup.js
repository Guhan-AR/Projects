const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

console.log('Initializing database tables...');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('Admin', 'Seller', 'User'))
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    seller_id INTEGER NOT NULL,
    FOREIGN KEY(seller_id) REFERENCES users(id)
  );
  
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  );
`);

console.log('Tables created. Seeding data...');

const insertUser = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
const checkUser = db.prepare('SELECT id FROM users WHERE username = ?');

const seedUser = (username, plainPassword, role) => {
    const existing = checkUser.get(username);
    if (!existing) {
        const hash = bcrypt.hashSync(plainPassword, 10);
        insertUser.run(username, hash, role);
        console.log(`Seeded ${role}: ${username}`);
    }
};

seedUser('admin', 'admin123', 'Admin');
seedUser('seller', 'seller123', 'Seller');
seedUser('user', 'user123', 'User');

console.log('Database setup complete.');
db.close();
