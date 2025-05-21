// web/frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure Vite uses the project root
  publicDir: 'public', // Explicitly set the public directory
  server: {
    port: 80,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: '/public/index.html', // Explicitly specify the entry point
    },
  },
});