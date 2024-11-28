import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        server: {
            port: 3000 // Change to a different port
        },
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});