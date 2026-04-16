const { app, BrowserWindow } = require('electron');
const path = require('path');

// Reference the backend server module
const { startServer } = require('../backend/server');

let mainWindow;
let backendServer;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // 1. Start backend server automatically on port 3001
    // This lives inside the Electron main process
    try {
        backendServer = startServer(3001);
        console.log("Backend started automatically.");
    } catch (error) {
        console.error("Failed to start backend server:", error);
    }

    // 2. Load the React build folder index.html
    // No dev server, pure static file loading
    const indexPath = path.join(__dirname, '../frontend/dist/index.html');
    mainWindow.loadFile(indexPath).catch(err => {
        console.error("Failed to load frontend static files from: ", indexPath);
        console.log("Make sure you run 'npm run build:frontend'");
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Ensure single instance only
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.whenReady().then(createWindow);

    // Quit when all windows are closed, except on macOS
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    // Cleanup server process on quit
    app.on('quit', () => {
        if (backendServer) {
            console.log("Shutting down backend server...");
            backendServer.close();
        }
    });
}
