import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  server: {
    port: 4000,
  },
  build: {
    outDir: 'build',
  },
  plugins: [react(), tsconfigPaths()],
});
