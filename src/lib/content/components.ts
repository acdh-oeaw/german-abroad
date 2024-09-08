import LocaleLink from "@/components/locale-link.astro";

const components = {
	a: LocaleLink,
};

declare global {
	type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
	return components;
}
