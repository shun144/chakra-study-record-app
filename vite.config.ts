import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import env from "vite-plugin-env-compatible";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    env({ prefix: "VITE", mountedPath: "process.env" }),
  ],
});
