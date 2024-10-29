import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "api:3000", // URL of your NestJS server
        changeOrigin: true,
        secure: false,
      },
    },
    port: 4173,
  },
  clearScreen: false,
});
