import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'src', // Корень проекта теперь src/
  publicDir: '../public', // Путь к public относительно src
  build: {
    outDir: '../dist', // Выходная директория относительно src
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.js', // Явно указываем точку входа
      },
    },
  },
  server: {
    host: true,
    port: 80,
  },
});