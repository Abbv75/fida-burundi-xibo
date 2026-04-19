import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api-piparvb': {
        target: 'https://piparvb.fidaburundi.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-piparvb/, ''),
      },
      '/api-proder': {
        target: 'https://proder.fidaburundi.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proder/, ''),
      },
      '/api-paifarb': {
        target: 'https://paifarb.fidaburundi.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-paifarb/, ''),
      },
      '/api-sise': {
        target: 'https://sise.fc-psfe.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-sise/, ''),
      },
      '/api-suivi-piparvb': {
        target: 'https://suivipiparvb.fidaburundi.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-suivi-piparvb/, ''),
      },
      '/api-suivi-proder': {
        target: 'https://suiviproder.fidaburundi.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-suivi-proder/, ''),
      },
      '/api-suivi-paifarb': {
        target: 'https://suivipaifarb.fidaburundi.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-suivi-paifarb/, ''),
      },
      '/api-suivi': {
        target: 'https://suivi.fc-psfe.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-suivi/, ''),
      },
    },
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['highcharts', 'highcharts-react-official'],
          ui: ['@mui/joy', '@emotion/react', '@emotion/styled'],
        },
      },
    },
  },
});
