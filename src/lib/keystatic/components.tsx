/* @jsxImportSource react */

import { createAssetOptions, createComponent } from "@acdh-oeaw/keystatic-lib";
import { fields } from "@keystatic/core";
import { mark } from "@keystatic/core/content-components";
import { DownloadIcon } from "lucide-react";

export const createDownloadLink = createComponent((paths, _locale) => {
	return {
		DownloadLink: mark({
			label: "DownloadLink",
			icon: <DownloadIcon />,
			style: { color: "var(--kui-color-foreground-accent)" },
			schema: {
				file: fields.file({
					label: "File",
					validation: { isRequired: true },
					...createAssetOptions(paths.downloadPath),
				}),
			},
		}),
	};
});
