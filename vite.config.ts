import { defineConfig, loadEnv } from "vite";
import solid from "vite-plugin-solid";
import svg from "vite-plugin-solid-svg";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_URL = env.VITE_API_URL ?? "http://localhost:3010";

  return {
    plugins: [solid(), svg()],
    server: {
      allowedHosts: true,
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
        },
        "/api/notify": {
          target: API_URL,
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };
});
