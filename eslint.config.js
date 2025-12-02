import base from "@acdh-oeaw/eslint-config";
import astro from "@acdh-oeaw/eslint-config-astro";
import playwright from "@acdh-oeaw/eslint-config-playwright";
import react from "@acdh-oeaw/eslint-config-react";
import tailwindcss from "@acdh-oeaw/eslint-config-tailwindcss";
import { defineConfig } from "eslint/config";
import gitignore from "eslint-config-flat-gitignore";

export const reactFiles = [
	"keystatic.config.@(ts|tsx)",
	"**/content/**/*.@(ts|tsx)",
	"**/keystatic/**/*.@(ts|tsx)",
];

const config = defineConfig([
	gitignore({ strict: false }),
	base,
	{
		extends: [astro],
		ignores: reactFiles,
	},
	{
		extends: [react],
		files: reactFiles,
	},
	// @ts-expect-error It's fine.
	tailwindcss,
	playwright,
]);

export default config;
