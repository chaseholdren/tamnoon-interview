/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    svgr({
      svgrOptions: {
        memo: true,
      },
    }),
  ],
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    globals: true,
    setupFiles: '.vitest/setup',
    include: ['**/*.test.{ts,tsx}'],
    includeSource: ['src/**/*.{ts,tsx}'],
    environment: 'happy-dom',
    css: false,
  },
});
