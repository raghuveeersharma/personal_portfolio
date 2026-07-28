import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // Every image here is a below-the-fold logo or screenshot. Once they
    // were converted to WebP most dropped under Vite's 4kB inline
    // threshold, which base64'd them into the entry chunk — +71kB of
    // render-blocking JS to save a few requests the page never waits on.
    // Keep them as separate, cacheable, lazily-fetched files.
    assetsInlineLimit: 0,
  },
});
