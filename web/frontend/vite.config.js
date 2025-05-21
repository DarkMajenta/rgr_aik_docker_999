import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Корень проекта — текущая директория (/app/)
  publicDir: 'public', // Путь к public относительно корня
  build: {
    outDir: 'dist', // Выходная директория
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.jsx', // Указываем путь относительно /app/
      },
    },
  },
  server: {
    host: true,
    port: 80,
  },
});