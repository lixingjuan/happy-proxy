import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../Chrome',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        popup: resolve(__dirname, 'popup.html')
      }
    }
  },
  resolve: {
    alias: {
      src: path.join(__dirname, 'src')
    }
  }
});
