# MNC Saree Production & Marketing ERP

A comprehensive Enterprise Resource Planning (ERP) system for a Multi-National Company (MNC) specializing in Saree production and marketing. Built with Node.js, Express, and MongoDB.

## 🚀 Key Modules
The application covers 11 core modules:
1.  **Org Master**: Branches, Departments, and Employee management.
2.  **Supplier Management**: Comprehensive supplier profiles, types, and rating systems.
3.  **Raw Materials**: Inventory tracking for Yarn, Zari, Dyes, etc., with reorder alerts.
4.  **Design & Catalog**: Saree design management, seasonal collections, and MRP/Wholesale pricing.
5.  **Production**: Management of Weaving Units, Looms (Handloom/Powerloom), and Production Orders.
6.  **Operations**: Quality Control (QC) inspections, Warehouse, and Inventory tracking.
7.  **Sales & Marketing**: Customer segment management, Sales orders across multiple channels.
8.  **Finance**: Payment recording (Received/Paid) with multi-currency support.
9.  **Logistics**: Shipment tracking with carrier integration and domestic/international support.

## 🔐 Advanced Security Features
This ERP is built with a **Security-First** approach:

### 1. Authentication & Session Management
- **JWT (JSON Web Tokens)**: Secure, stateless authentication.
- **Refresh Token Rotation**: Automatic rotation of refresh tokens for enhanced safety.
- **Token Revocation (Redis)**: Instant logout and token invalidation using a Redis-backed blacklist.
- **Account Lockout**: Automatic locking of accounts after multiple failed login attempts.

### 2. Authorization
- **RBAC (Role-Based Access Control)**: Granular permissions based on roles (Admin, Manager, Supervisor, Weaver, QC, Sales, etc.).

### 3. Middleware Protections
- **Helmet**: Sets secure HTTP headers (HSTS, Content Security Policy, etc.).
- **CORS**: Strict Cross-Origin Resource Sharing with domain whitelisting.
- **CSRF Protection**: Protection against Cross-Site Request Forgery via `csurf` and `cookie-parser`.
- **Rate Limiting**: Brute-force and DDoS protection for sensitive API routes.
- **Sanitization**: Automatic NoSQL Injection (`mongo-sanitize`) and XSS cleaning.
- **Size Limits**: Strict request body size limits (10kb) to prevent payload-based attacks.

### 4. Logging & Monitoring
- **Audit Logging**: Structured JSON logging using `Winston` for tracking all sensitive actions.
- **Request Logging**: Development-mode logging using `Morgan`.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Running on `localhost:27017`)
- Redis (Running on `localhost:6379`)

### Setup Commands
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Variables**:
    Update the `.env` file with your credentials (see `.env.example`).
3.  **Database Seeding**:
    ```bash
    # Import sample data
    npm run data:import
    
    # Remove all data
    npm run data:destroy
    ```
4.  **Run Application**:
    ```bash
    # Normal start
    npm start
    
    # Development mode (requires nodemon)
    npm run dev
    ```

## 📂 Project Structure
- `src/config/`: Database and Redis client configurations.
- `src/controllers/`: Business logic handlers for all 11 modules.
- `src/middleware/`: Auth, Security (Helmet, Rate Limit), and Error handlers.
- `src/models/`: Mongoose schemas (Cleanly structured for all 11 modules).
- `src/routes/`: Express API routing.
- `src/utils/`: Helper utilities (Auth, Logger, Seeder).

## 🧪 Verification
- Health Check: `GET /api/v1/health`
- Postman: Import the routes to test the full API suite.
