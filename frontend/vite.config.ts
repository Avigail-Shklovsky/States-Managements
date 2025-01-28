import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global functions like `describe`, `it`, `expect`
    environment: "jsdom", // Default environment for React and DOM testing
    setupFiles: "./setupTests.ts",
  },
});
