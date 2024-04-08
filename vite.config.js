import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  }, build: {
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: ['SFSportsNightAlternate.ttf'], // Añade aquí el nombre de tu archivo de fuente
  },
});
