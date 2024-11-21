// @ts-check
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
	site: 'https://houseofyair.github.io',
	base: 'gh-planeswalker-list',
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
  ],
});
