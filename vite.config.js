import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss"; // Ensure Tailwind is being imported

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
