import { createReaders } from "@acdh-oeaw/keystatic-lib/reader";

import { compileMdx } from "@/lib/content/compile-mdx";
import config from "~/keystatic.config";

const { createCollectionResource, createSingletonResource } = createReaders(config, compileMdx);

export { createCollectionResource, createSingletonResource };
