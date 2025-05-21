import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Корень проекта
  publicDir: 'public', // Указываем, где находится папка public
  build: {
    outDir: 'dist', // Куда Vite складывает сборку
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 80,
  },
});