import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import filterProxy from '../dist';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        filterProxy({
            '/': {
                target: 'http://localhost:3000',
                /*  filter: ((reqPath, req) => req.method === 'POST') */
            }
        })
    ],
    server: {
        port: 3001
    }
})