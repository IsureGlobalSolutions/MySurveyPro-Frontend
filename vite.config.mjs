import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 1000, // Adjusted chunk size limit warning
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('redux')) {
              return 'redux-vendor';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  plugins: [react(), svgr()],
  assetsInclude: ['**/*.xlsx', '**/*.csv'],
});
