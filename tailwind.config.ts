import { createPreset } from "@acdh-oeaw/tailwindcss-preset";
import type { Config } from "tailwindcss";

const preset = createPreset();

const config: Config = {
	content: [
		"./src/components/**/*.@(astro|css|ts|tsx)",
		"./src/content/**/*.@(md|mdx)",
		"./src/layouts/**/*.@(astro|css|ts|tsx)",
		"./src/pages/**/*.@(astro|css|ts|tsx)",
		"./src/styles/**/*.css",
	],
	presets: [preset],
};

export default config;
