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
            '/logout': {
                target: 'https://localhost:44389/',
                secure: false
            },
            '/register': {
                target: 'https://localhost:44389/',
                secure: false
            },
            '/needsregister': {
                target: 'https://localhost:44389/',
                secure: false
            },
            '/pingauth': {
                target: 'https://localhost:44389/',
                secure: false
            },
            '/account/setup': {
                target: 'https://localhost:44389/',
                secure: false
            },
        }
    }
})
