import path from "node:path";
import { defineConfig, mergeConfig } from "vite";
import baseConfig from "./vite.config";

export default mergeConfig(baseConfig, defineConfig({
  build: {
    outDir: "dist-ficha-preview",
    rollupOptions: { input: path.resolve(__dirname, "ficha-preview.html") },
  },
}));
