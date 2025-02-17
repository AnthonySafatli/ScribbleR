import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    server: {
        port: 52861,
        proxy: {
            '/login': {
                target: 'https://localhost:44389/',
                secure: false
            },
            '/needsregister': {
                target: 'https://localhost:44389/',
                secure: false
            }
        }
    }
})
