/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { MDXComponents } from "mdx/types";

import Download from "@/components/content/download.astro";
import Figure from "@/components/content/figure.astro";

export function useMDXComponents(): MDXComponents {
	return {
		Download,
		Figure,
	};
}
