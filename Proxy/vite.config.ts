import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../Chrome',
    sourcemap: false
  },
  resolve: {
    alias: {
      src: path.join(__dirname, 'src')
    }
  }
});
