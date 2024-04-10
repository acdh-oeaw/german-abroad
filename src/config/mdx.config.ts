import type { CompileOptions } from "@mdx-js/mdx";
import withSyntaxHighlighter from "@shikijs/rehype";
import withHeadingIds from "rehype-slug";
import withFrontmatter from "remark-frontmatter";
import withGfm from "remark-gfm";
import withMdxFrontmatter from "remark-mdx-frontmatter";
import withTypographicQuotes from "remark-smartypants";
import type { Options as TypographicOptions } from "retext-smartypants";

import type { Locale } from "@/config/i18n.config";
import { config as syntaxHighlighterConfig } from "@/config/syntax-highlighter.config";
import { createI18n } from "@/lib/i18n";

const cache = new Map<Locale, CompileOptions>();

const typography: Record<Locale, TypographicOptions> = {
	de: {
		openingQuotes: { double: "„", single: "‚" },
		closingQuotes: { double: "“", single: "‘" },
	},
};

export async function createConfig(locale: Locale) {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	if (cache.has(locale)) return cache.get(locale)!;

	const { t } = await createI18n(locale);

	const config: CompileOptions = {
		remarkPlugins: [
			withFrontmatter,
			withMdxFrontmatter,
			withGfm,
			[withTypographicQuotes, typography[locale]],
		],
		remarkRehypeOptions: {
			footnoteBackLabel(referenceIndex, rereferenceIndex) {
				return t("Mdx.FootnoteBackLabel", {
					reference:
						String(referenceIndex + 1) +
						(rereferenceIndex > 1 ? "-" + String(rereferenceIndex) : ""),
				});
			},
			footnoteLabel: t("Mdx.Footnotes"),
		},
		rehypePlugins: [withHeadingIds, [withSyntaxHighlighter, syntaxHighlighterConfig]],
	};

	cache.set(locale, config);

	return config;
}
