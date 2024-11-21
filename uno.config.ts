import { defineConfig, presetIcons, presetUno } from "unocss";

export default defineConfig({
	presets: [
		presetUno({
			dark: {
				dark: '[data-theme="dark"]',
				light: '[data-theme="light"]',
			},
		}),
		presetIcons({}),
	],
});
