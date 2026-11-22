import { createReaders } from "@acdh-oeaw/keystatic-lib/reader";

import { getMdxContent } from "@/lib/content/get-mdx-content";
import config from "~/keystatic.config.tsx";

export const { createCollectionResource, createSingletonResource } = createReaders(
	config,
	getMdxContent,
);
