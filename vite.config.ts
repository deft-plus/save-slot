import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  server: {
    port: 4000,
  },
  build: {
    outDir: 'build',
  },
  plugins: [react()],
});
