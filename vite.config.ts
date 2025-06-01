import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import svg from "vite-plugin-solid-svg";

export default defineConfig({
  plugins: [solid(), svg()],
  server: {
    allowedHosts: true,
    proxy: {
      "/api": {
        // target: "http://localhost:3010",
        target: "https://theflux.app",
        changeOrigin: true,
      },
      "/api/notify": {
        // target: "http://localhost:3010",
        target: "https://theflux.app",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
