import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // bind explicitamente a 0.0.0.0
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173, // porta que o cliente (browser) usa para HMR
      host: 'localhost' // host que o cliente (browser) usa para HMR
    },
    watch: { 
      usePolling: true,
      interval: 1000
    },
    proxy: {
      "/auth": {
        target: "http://bff:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, '/auth'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying:', req.method, req.url, '=>', proxyReq.path);
          });
        }
      }
    }
  }
});
