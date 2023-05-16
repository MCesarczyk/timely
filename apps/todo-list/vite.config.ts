/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/todo-list',

  resolve: {
    alias: {
      '~': path.resolve(__dirname, '/src'),
    },
  },

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  define: {
    'process.env': {},
  },

  build: {
    outDir: 'build',
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
    svgr({ svgrOptions: { icon: true } })
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
