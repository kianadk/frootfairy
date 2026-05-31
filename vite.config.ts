import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react(),
    tsConfigPaths(),
  ],
  server: {
    open: true, // automatically open the app in the browser
    port: 5173,
    proxy: {
      // Matches any request starting with /api
      '/api': {
        target: 'http://localhost:3000', // Your backend Node.js server address
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      screens: path.resolve(__dirname, './src/screens'),
    },
  },
  build: {
    outDir: 'build',
  },
});
