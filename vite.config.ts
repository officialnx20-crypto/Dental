import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  // IMPORTANT: root ko client se hata diya (ab root = project root)
  // isse Vite directly index.html (root wala) use karega

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },

  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
  },
});
