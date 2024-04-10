import type { Entry } from "@keystatic/core/reader";

import type config from "~/keystatic.config";

export type IndexPage = Entry<(typeof config)["singletons"]["indexPage"]>;

export type Page = Entry<(typeof config)["collections"]["pages"]>;

export type Event = Entry<(typeof config)["collections"]["events"]>;

export type Person = Entry<(typeof config)["collections"]["people"]>;

export type Metadata = Entry<(typeof config)["singletons"]["metadata"]>;

export type Navigation = Entry<(typeof config)["singletons"]["navigation"]>;
