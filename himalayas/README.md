# Himalayas React - Full Stack Landing Page

A modern, responsive, and one-page parallax landing page inspired by the Himalayas theme. Built with React, Express, and Tailwind CSS.

## 🛠 Tech Stack & Dependencies

To ensure a perfect local installation, please use the following versions of the modules:

### Core Dependencies
- **React**: `^19.0.0`
- **React DOM**: `^19.0.0`
- **Vite**: `^6.2.0`
- **Express**: `^4.21.2`
- **Motion**: `^12.23.24` (for animations)
- **Lucide React**: `^0.546.0` (for icons)
- **Tailwind CSS**: `^4.1.14`
- **Dotenv**: `^17.2.3`

### Development Tools
- **TypeScript**: `~5.8.2`
- **tsx**: `^4.21.0` (for running TypeScript server files)
- **Autoprefixer**: `^10.4.21`
- **@types/express**: `^4.17.21`
- **@types/node**: `^22.14.0`

## 🚀 Getting Started Locally

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### 2. Installation
Clone the repository and install the dependencies:

```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your configuration (refer to `.env.example`):

```env
APP_URL="http://localhost:3000"
```

### 4. Running the Application

#### Development Mode
Starts the Express server with Vite middleware:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

#### Production Build
Build the frontend assets:
```bash
npm run build
```
Start the production server:
```bash
npm run start
```

## 📂 Project Structure
- `/src/components`: Reusable React components (Navbar, Hero, About, etc.)
- `/src/App.tsx`: Main application assembly
- `/server.ts`: Express server configuration
- `/src/index.css`: Global styles and Tailwind configuration
- `package.json`: Dependency management and scripts

## 📜 License
This project is licensed under the Apache-2.0 License.
