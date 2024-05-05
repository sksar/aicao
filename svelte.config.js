import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    alias: {
      "@/*": "./path/to/lib/*",
    },
    adapter: adapter({
      fallback: "404.html",
    }),
  },

  preprocess: [vitePreprocess({})],
};

export default config;
