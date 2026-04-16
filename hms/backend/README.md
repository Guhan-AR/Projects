# HMS Backend API

This is the backend for the HMS project, built with Node.js and Express.

## Tech Stack
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Configuration**: dotenv
-   **Dev Tools**: nodemon

## Installation
Navigate to the `backend` directory:
```bash
npm install
```

## Running the Server
To run in development mode (with nodemon):
```bash
npm run dev
```

To run in production mode:
```bash
npm start
```

## API Routes
- `GET /` - Returns a welcome message
- `GET /health` - Health check route
