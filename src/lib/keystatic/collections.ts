import {
	createAssetOptions,
	createCollection,
	createContentFieldOptions,
	createLabel,
} from "@acdh-oeaw/keystatic-lib";
import { collection, fields } from "@keystatic/core";

import { createDownloadLink } from "@/lib/keystatic/components";

export const conferences = createCollection("/conferences/", (paths, locale) => {
	return collection({
		label: createLabel("Conferences", locale),
		path: paths.contentPath,
		slugField: "title",
		format: { contentField: "content" },
		entryLayout: "content",
		columns: ["title"],
		// previewUrl: createPreviewUrl("/conferences/{slug}"),
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			date: fields.date({
				label: "Start date",
				validation: { isRequired: true },
			}),
			endDate: fields.date({
				label: "End date",
				validation: { isRequired: false },
			}),
			location: fields.text({
				label: "Location",
				validation: { isRequired: true },
			}),
			hosts: fields.array(
				fields.object(
					{
						name: fields.text({
							label: "Name",
							validation: { isRequired: true },
						}),
					},
					{
						label: "Host",
					},
				),
				{
					label: "Hosts",
					itemLabel(props) {
						return props.fields.name.value;
					},
					validation: { length: { min: 1 } },
				},
			),
			image: fields.object(
				{
					src: fields.image({
						label: "Image",
						validation: { isRequired: false },
						...createAssetOptions(paths.assetPath),
					}),
					caption: fields.text({
						label: "Image caption",
						validation: { isRequired: false },
					}),
				},
				{
					label: "Image",
				},
			),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					...createContentFieldOptions(paths),
					codeBlock: false,
					table: false,
				},
				components: {
					...createDownloadLink(paths, locale),
				},
			}),
		},
	});
});

export const events = createCollection("/events/", (paths, locale) => {
	return collection({
		label: createLabel("Events", locale),
		path: paths.contentPath,
		slugField: "title",
		format: { contentField: "content" },
		entryLayout: "content",
		columns: ["title"],
		// previewUrl: createPreviewUrl("/events/{slug}"),
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			date: fields.date({
				label: "Date",
				validation: { isRequired: true },
			}),
			location: fields.text({
				label: "Location",
				validation: { isRequired: true },
			}),
			image: fields.object(
				{
					src: fields.image({
						label: "Image",
						validation: { isRequired: false },
						...createAssetOptions(paths.assetPath),
					}),
					caption: fields.text({
						label: "Image caption",
						validation: { isRequired: false },
					}),
				},
				{
					label: "Image",
				},
			),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: createContentFieldOptions(paths),
				components: {},
			}),
		},
	});
});

export const pages = createCollection("/pages/", (paths, locale) => {
	return collection({
		label: createLabel("Pages", locale),
		path: paths.contentPath,
		slugField: "title",
		format: { contentField: "content" },
		entryLayout: "content",
		columns: ["title"],
		// previewUrl: createPreviewUrl("/{slug}"),
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			image: fields.object(
				{
					src: fields.image({
						label: "Image",
						validation: { isRequired: false },
						...createAssetOptions(paths.assetPath),
					}),
					caption: fields.text({
						label: "Image caption",
						validation: { isRequired: false },
					}),
				},
				{
					label: "Image",
				},
			),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: createContentFieldOptions(paths),
				components: {},
			}),
		},
	});
});

export const links = createCollection("/links/", (paths, locale) => {
	return collection({
		label: createLabel("Links", locale),
		path: paths.contentPath,
		slugField: "name",
		format: { contentField: "content" },
		entryLayout: "content",
		columns: ["name"],
		// previewUrl: createPreviewUrl("/links/{slug}"),
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
					validation: { isRequired: true },
				},
			}),
			href: fields.url({
				label: "URL",
				validation: { isRequired: true },
			}),
			content: fields.mdx({
				label: "Description",
				options: createContentFieldOptions(paths),
				components: {},
			}),
		},
	});
});
