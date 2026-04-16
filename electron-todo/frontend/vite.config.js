import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // VERY IMPORTANT:
    // Use relative paths to allow Electron to load the local index.html correctly
    base: './',
})
