import { defineConfig } from "@farmfe/core";
import solid from "vite-plugin-solid";
import svg from "vite-plugin-solid-svg";

export default defineConfig({
  vitePlugins: [
    () => ({
      vitePlugin: solid(),
      filters: ["\\.tsx$", "\\.jsx$"],
    }),
    svg(),
  ],
  server: {
    hmr: false,
    proxy: {
      "/api": {
        target: "http://localhost:3010",
        changeOrigin: true,
        // pathRewrite: (path: any) => path.replace(/^\/api/, ""),
      },
    },
  },
});
