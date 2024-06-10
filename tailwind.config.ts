import { createPreset } from "@acdh-oeaw/tailwindcss-preset";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const preset = createPreset();

const config: Config = {
	content: [
		"./keystatic.config.tsx",
		"./content/**/*.@(md|mdx)",
		"./src/@(components|layouts|pages)/**/*.@(astro|css|ts|tsx)",
		"./src/styles/**/*.css",
	],
	presets: [preset],
	theme: {
		extend: {
			colors: {
				hero: {
					from: colors.pink["400"],
					to: colors.yellow["400"],
				},
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: "none",
						/** Don't add quotes around `blockquote`. */
						"blockquote p:first-of-type::before": null,
						"blockquote p:last-of-type::after": null,
						/** Don't add backticks around inline `code`. */
						"code::before": null,
						"code::after": null,
					},
				},
			},
		},
	},
};

export default config;
