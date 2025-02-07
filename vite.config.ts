import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import env from 'vite-plugin-env-compatible';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), env({ prefix: 'VITE', mountedPath: 'process.env' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
