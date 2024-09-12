import { createReaders } from "@acdh-oeaw/keystatic-lib";

import { getMdxContent } from "@/lib/content/get-mdx-content";
import config from "~/keystatic.config.tsx";

const { createCollectionResource, createSingletonResource } = createReaders(config, getMdxContent);

export { createCollectionResource, createSingletonResource };
