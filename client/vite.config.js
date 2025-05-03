import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // or your desired dev port
    proxy: {
      '/api': 'http://localhost:5000', // 🔥 forward /api requests to backend
    },
  },
  build: {
    rollupOptions: {
      input: '/index.html',
    },
  },
});
