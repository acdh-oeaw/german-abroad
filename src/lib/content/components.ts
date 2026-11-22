import DownloadLink from "@/components/download-link.astro";
import LocaleLink from "@/components/locale-link.astro";

const components = {
	// oxlint-disable-next-line @typescript-eslint/no-unsafe-assignment
	a: LocaleLink,
	// oxlint-disable-next-line @typescript-eslint/no-unsafe-assignment
	DownloadLink,
};

declare global {
	type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
	return components;
}
