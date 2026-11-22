import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import type { Writable } from "type-fest";
import { loadEnv } from "vite";

import { defaultLocale, locales } from "./src/config/i18n.config";

/** Keep in sync with the react override in `.oxlintrc.json`. */
const reactFiles = [
	"keystatic.config.@(ts|tsx)",
	"**/content/**/*.@(ts|tsx)",
	"**/keystatic/**/*.@(ts|tsx)",
];

const env = loadEnv(import.meta.env.MODE, process.cwd(), "");

export default defineConfig({
	/**
	 * When switching to static site generation, place an empty `index.astro` file in
	 * the `src/pages` folder, so `astro` will generate a redirect to the default locale
	 * via `<meta http-equiv="refresh" content="0;url=/en/">`.
	 */
	adapter: node({
		mode: "standalone",
	}),
	base: env.PUBLIC_APP_BASE_PATH,
	i18n: {
		defaultLocale,
		locales: locales as Writable<typeof locales>,
		routing: "manual",
	},
	integrations: [
		icon({
			/** @see https://www.astroicon.dev/reference/configuration/#include */
			include: {
				lucide: ["square-arrow-out-up-right"],
				simpleIcons: ["orcid"],
			},
		}),
		/** Only needed to make the astro jsx runtime work correctly. */
		mdx(),
		react({
			include: reactFiles,
		}),
		sitemap({
			i18n: {
				defaultLocale,
				locales: Object.fromEntries(
					locales.map((locale) => {
						return [locale, locale];
					}),
				),
			},
		}),
	],
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	redirects: {
		"/admin": {
			destination:
				env.PUBLIC_APP_BASE_PATH != null
					? `${env.PUBLIC_APP_BASE_PATH.replace(/\/$/, "")}/keystatic`
					: "/keystatic",
			status: 307,
		},
		"/de/publications": {
			destination: "/de/publikationen",
			status: 307,
		},
		"/en/publikationen": {
			destination: "/en/publications",
			status: 307,
		},
	},
	scopedStyleStrategy: "where",
	security: {
		/**
		 * Trust `X-Forwarded-Host` from the reverse proxy for the app's public domain, so that
		 * `Astro.url` (and keystatic's github oauth redirect url) uses the public host.
		 *
		 * @see https://docs.astro.build/en/reference/configuration-reference/#securityalloweddomains
		 */
		allowedDomains: [{ hostname: new URL(env.PUBLIC_APP_BASE_URL!).hostname }],
	},
	server: {
		/** Required by keystatic. */
		host: "127.0.0.1",
		port: 3000,
	},
	site: env.PUBLIC_APP_BASE_URL,
	vite: {
		plugins: [tailwindcss()],
	},
});
