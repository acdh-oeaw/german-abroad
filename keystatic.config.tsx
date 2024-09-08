/* @jsxImportSource react */

import { config } from "@keystatic/core";

import { env } from "@/config/env.config";
import { locales } from "@/config/i18n.config";
import { conferences, events, links, pages, steeringCommittee } from "@/lib/keystatic/collections";
import { withI18nPrefix } from "@/lib/keystatic/lib";
import { Logo } from "@/lib/keystatic/logo";
import { indexPage, metadata, navigation } from "@/lib/keystatic/singletons";

export default config({
	collections: {
		[withI18nPrefix("conferences", "de")]: conferences("de"),
		[withI18nPrefix("conferences", "en")]: conferences("en"),

		[withI18nPrefix("events", "de")]: events("de"),
		[withI18nPrefix("events", "en")]: events("en"),

		[withI18nPrefix("links", "de")]: links("de"),
		[withI18nPrefix("links", "en")]: links("en"),

		[withI18nPrefix("steeringCommittee", "de")]: steeringCommittee("de"),
		[withI18nPrefix("steeringCommittee", "en")]: steeringCommittee("en"),

		[withI18nPrefix("pages", "de")]: pages("de"),
		[withI18nPrefix("pages", "en")]: pages("en"),
	},
	singletons: {
		[withI18nPrefix("indexPage", "de")]: indexPage("de"),
		[withI18nPrefix("indexPage", "en")]: indexPage("en"),

		[withI18nPrefix("metadata", "de")]: metadata("de"),
		[withI18nPrefix("metadata", "en")]: metadata("en"),

		[withI18nPrefix("navigation", "de")]: navigation("de"),
		[withI18nPrefix("navigation", "en")]: navigation("en"),
	},
	storage:
		env.PUBLIC_KEYSTATIC_MODE === "github" &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER != null &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME != null
			? {
					kind: "github",
					repo: {
						owner: env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER,
						name: env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME,
					},
					branchPrefix: "content/",
				}
			: {
					kind: "local",
				},
	ui: {
		brand: {
			mark() {
				return <Logo />;
			},
			name: "German Abroad",
		},
		navigation: {
			"Home page": locales.map((locale) => withI18nPrefix("indexPage", locale)),
			Conferences: locales.map((locale) => withI18nPrefix("conferences", locale)),
			Events: locales.map((locale) => withI18nPrefix("events", locale)),
			Links: locales.map((locale) => withI18nPrefix("links", locale)),
			"Steering committee": locales.map((locale) => withI18nPrefix("steeringCommittee", locale)),
			Pages: locales.map((locale) => withI18nPrefix("pages", locale)),
			Navigation: locales.map((locale) => withI18nPrefix("navigation", locale)),
			Metadata: locales.map((locale) => withI18nPrefix("metadata", locale)),
		},
	},
});
