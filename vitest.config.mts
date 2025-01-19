import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.{js,jsx,ts,tsx}"],
    coverage: {
      include: ["src/**/*"],
      exclude: ["src/**/*.stories.{js,jsx,ts,tsx}", "**/*.d.ts"],
    },
    environmentMatchGlobs: [
      ["**/*.test.tsx", "jsdom"],
      ["src/hooks/**/*.test.ts", "jsdom"],
    ],
    setupFiles: ["./vitest-setup.ts"],
    env: loadEnv("", process.cwd(), ""),
    alias: {
      "@": "/src",
      "@lib": "/src/lib",
      "@components": "/src/components",
      "@features": "/src/features",
    },
  },
});
