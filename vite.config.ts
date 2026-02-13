import path from "path";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  resolve: {
    alias: {
      pages: path.resolve(__dirname, "./src/pages"),
      components: path.resolve(__dirname, "./src/components"),
      utils: path.resolve(__dirname, "./src/utils"),
      common: path.resolve(__dirname, "./src/common"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      types: path.resolve(__dirname, "./src/types"),
      assets: path.resolve(__dirname, "./src/assets"),
      "@redux": path.resolve(__dirname, "./src/redux"),
    },
  },
  esbuild: {
    loader: "tsx",
    include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
    exclude: ["node_modules"],
  },
  server: {
    port: 3000,
    open: false,
    host: "0.0.0.0",
  },
  build: {
    outDir: "build",
  },
});
