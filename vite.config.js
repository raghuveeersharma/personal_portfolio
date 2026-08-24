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

    rollupOptions: {
      output: {
        // React itself is ~180kB minified of the entry chunk and never
        // changes between deploys of this site, so it gets its own file:
        // editing a section invalidates the app chunk only, and a returning
        // visitor re-downloads a few kB instead of the whole runtime.
        // Everything else stays eager on purpose — `react-parallax-tilt`
        // and `react-type-animation` are above the fold (About), and the
        // one genuinely deferrable dependency, `@emailjs/browser`, is a
        // dynamic `import()` inside Contact's submit handler.
        manualChunks: {
          react: ["react", "react-dom", "react-dom/client"],
        },
      },
    },
  },
});
