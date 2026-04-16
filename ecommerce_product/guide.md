# E-Commerce RBAC Guide

## Starting the Servers

You will need two separate terminal windows (or tabs) to run the frontend and backend simultaneously.

### 1. Start the Backend Server (Port 3000)
Open a terminal and run the following commands:
```powershell
cd D:\personal\ecommerce_product\backend
node server.js
```

### 2. Start the Frontend Server (Port 5173)
Open a second terminal and run the following commands:
```powershell
cd D:\personal\ecommerce_product\frontend
npm run dev
```

The frontend will be accessible at `http://localhost:5173`. The frontend is configured to automatically point its API requests to the backend at `http://localhost:3000/api`.

---

# E-Commerce RBAC Guide

## Starting the Servers

You will need two separate terminal windows (or tabs) to run the frontend and backend simultaneously.

### 1. Start the Backend Server (Port 3000)
Open a terminal and run the following commands:
```powershell
cd D:\personal\ecommerce_product\backend
node server.js
```

### 2. Start the Frontend Server (Port 5173)
Open a second terminal and run the following commands:
```powershell
cd D:\personal\ecommerce_product\frontend
npm run dev
```

The frontend will be accessible at `http://localhost:5173`. The frontend is configured to automatically point its API requests to the backend at `http://localhost:3000/api`.

---

## Test Credentials

The SQLite database is seeded with exactly three accounts, one for each role in the RBAC system. You can use these to test the access controls on the frontend:

| Role | Username | Password | Access Details |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `admin123` | Has access to the Global Dashboard (`/admin/dashboard`). Can view all system users globally, see all products across the platform, and has the authority to delete any product. |
| **Seller** | `seller` | `seller123` | Has access to the Seller Dashboard (`/seller/products`). Can strictly only add, edit, and delete their **own** products. |
| **User** | `user` | `user123` | Has access to the Public Store (`/`) and their Shopping Cart (`/cart`). Cannot access the admin or seller dashboards—the frontend will boot them back to the homepage, and the backend RBAC middleware will block any API modifications. |
