import {
	createAssetOptions,
	createCollection,
	createContentFieldOptions,
	createLabel,
} from "@acdh-oeaw/keystatic-lib";
import { collection, fields } from "@keystatic/core";

export const conferences = createCollection("/conferences/", (paths, locale) => {
	return collection({
		label: createLabel("Conferences", locale),
		path: paths.contentPath,
		slugField: "title",
		format: { contentField: "content" },
		entryLayout: "content",
		columns: ["title"],
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
			image: fields.image({
				label: "Image",
				validation: { isRequired: false },
				...createAssetOptions(paths.assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: createContentFieldOptions(paths.assetPath),
				components: {},
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
			image: fields.image({
				label: "Image",
				validation: { isRequired: false },
				...createAssetOptions(paths.assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: createContentFieldOptions(paths.assetPath),
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
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			image: fields.image({
				label: "Image",
				validation: { isRequired: false },
				...createAssetOptions(paths.assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: createContentFieldOptions(paths.assetPath),
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
				options: createContentFieldOptions(paths.assetPath),
				components: {},
			}),
		},
	});
});

export const steeringCommittee = createCollection("/steering-committee/", (paths, locale) => {
	return collection({
		label: createLabel("Steering committee", locale),
		path: paths.contentPath,
		slugField: "name",
		format: { contentField: "content" },
		entryLayout: "content",
		columns: ["name"],
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
					validation: { isRequired: true },
				},
			}),
			affiliation: fields.text({
				label: "Affiliation",
				validation: { isRequired: false },
			}),
			image: fields.image({
				label: "Image",
				validation: { isRequired: false },
				...createAssetOptions(paths.assetPath),
			}),
			website: fields.url({
				label: "Website",
				validation: { isRequired: false },
			}),
			orcid: fields.url({
				label: "ORCID",
				validation: { isRequired: false },
			}),
			content: fields.mdx({
				label: "Short biography",
				options: createContentFieldOptions(paths.assetPath),
				components: {},
			}),
		},
	});
});
