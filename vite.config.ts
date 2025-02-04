import { defineConfig } from "vite";

export default defineConfig({
  root: "./src", // Set the root directory
  server: {
    open: true, // Automatically open the app in the browser
    port: 3000, // Default port
  },
});
