import LocaleLink from "@/components/locale-link.astro";

const components = {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	a: LocaleLink,
};

declare global {
	type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
	return components;
}
