import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@config": path.resolve(__dirname, "./config"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173,
      host: "localhost",
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },

    // 🔥 PROXY PARA A CLOUD (frontend local → BFF Azure)
    proxy: {
      "/auth": {
        target:
          "https://zeni-bff.victorioushill-8ccd4751.brazilsouth.azurecontainerapps.io",
        changeOrigin: true,
        secure: false,
      },
      "/me": {
        target:
          "https://zeni-bff.victorioushill-8ccd4751.brazilsouth.azurecontainerapps.io",
        changeOrigin: true,
        secure: false,
      },
      "/financial-registers-bff": {
        target:
          "https://zeni-bff.victorioushill-8ccd4751.brazilsouth.azurecontainerapps.io",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
