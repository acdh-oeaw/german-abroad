import { pick } from "@acdh-oeaw/lib";
import { collection, config, fields, singleton } from "@keystatic/core";
import { mark, wrapper } from "@keystatic/core/content-components";
import { DownloadIcon, ImageIcon } from "lucide-react";

import { Logo } from "@/components/logo";
import { createAssetPaths, createPreviewUrl } from "@/config/content.config";
import { env } from "@/config/env.config";

function createComponents(assetPath: `/${string}/`, components?: Array<"Download" | "Figure">) {
	const allComponents = {
		Download: mark({
			label: "Download",
			// description: "A link to an uploaded file.",
			tag: "a",
			className: "underline decoration-dotted",
			icon: <DownloadIcon />,
			schema: {
				href: fields.image({
					label: "File",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
			},
		}),
		Figure: wrapper({
			label: "Figure",
			description: "An image with caption.",
			icon: <ImageIcon />,
			schema: {
				href: fields.image({
					label: "Image",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
				alt: fields.text({
					label: "Image description for screen readers",
					// validation: { isRequired: false },
				}),
			},
		}),
	};

	if (components == null) return allComponents;

	return pick(allComponents, components);
}

export default config({
	ui: {
		brand: {
			name: "German Abroad",
			// @ts-expect-error `ReactNode` is a valid return type.
			mark: Logo,
		},
		navigation: {
			Pages: ["indexPage", "pages"],
			Data: ["events", "people"],
			Navigation: ["navigation"],
			Settings: ["metadata"],
		},
	},
	storage:
		/**
		 * @see https://keystatic.com/docs/github-mode
		 */
		env.PUBLIC_KEYSTATIC_MODE === "github" &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME
			? {
					kind: "github",
					repo: {
						owner: env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER,
						name: env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME,
					},
					branchPrefix: "content/",
				}
			: {
					kind: "local",
				},
	collections: {
		pages: collection({
			label: "Pages",
			path: "./content/pages/**",
			slugField: "title",
			format: { contentField: "content" },
			previewUrl: createPreviewUrl("/{slug}"),
			entryLayout: "content",
			columns: ["title"],
			schema: {
				title: fields.slug({
					name: {
						label: "Title",
						validation: { isRequired: true },
					},
				}),
				content: fields.mdx({
					label: "Content",
					options: {
						image: createAssetPaths("/content/pages/"),
					},
					components: createComponents("/content/pages/"),
				}),
			},
		}),
		events: collection({
			label: "Events",
			path: "./content/events/*",
			slugField: "title",
			format: { data: "json" },
			// previewUrl: createPreviewUrl("/events/{slug}"),
			entryLayout: "form",
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
				place: fields.text({
					label: "Place",
					validation: { isRequired: true },
				}),
				host: fields.text({
					label: "Host",
					validation: { isRequired: true },
				}),
			},
		}),
		people: collection({
			label: "People",
			path: "./src/content/people/*",
			slugField: "name",
			format: { data: "json" },
			// previewUrl: createPreviewUrl("/people/{slug}"),
			entryLayout: "form",
			schema: {
				name: fields.slug({
					name: {
						label: "Name",
						validation: { isRequired: true },
					},
				}),
				image: fields.image({
					label: "Image",
					...createAssetPaths("/content/people/"),
					validation: { isRequired: true },
				}),
				email: fields.text({
					label: "Email",
					// validation: { isRequired: false },
				}),
				website: fields.url({
					label: "Website",
					// validation: { isRequired: false },
				}),
			},
		}),
	},
	singletons: {
		indexPage: singleton({
			label: "Home page",
			path: "./content/index-page/",
			format: { contentField: "content" },
			entryLayout: "form",
			schema: {
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
				subtitle: fields.text({
					label: "Subtitle",
					validation: { isRequired: true },
				}),
				content: fields.mdx({
					label: "Content",
					options: {
						image: createAssetPaths("/content/index-page/"),
					},
					components: createComponents("/content/index-page/"),
				}),
			},
		}),
		metadata: singleton({
			label: "Metadata",
			path: "./content/metadata",
			format: { data: "json" },
			entryLayout: "form",
			schema: {
				title: fields.text({
					label: "Site title",
					validation: { isRequired: true },
				}),
				shortTitle: fields.text({
					label: "Short site title",
					validation: { isRequired: true },
				}),
				description: fields.text({
					label: "Site description",
					validation: { isRequired: true },
				}),
				twitter: fields.text({
					label: "Twitter handle",
					// validation: { isRequired: false },
				}),
			},
		}),
		navigation: singleton({
			label: "Navigation",
			path: "./content/navigation",
			format: { data: "json" },
			entryLayout: "form",
			schema: {
				links: fields.blocks(
					{
						link: {
							label: "Link",
							itemLabel(props) {
								return props.fields.label.value;
							},
							schema: fields.object({
								label: fields.text({
									label: "Label",
									validation: { isRequired: true },
								}),
								url: fields.url({
									label: "URL",
									validation: { isRequired: true },
								}),
							}),
						},
						menu: {
							label: "Menu",
							itemLabel(props) {
								return props.fields.label.value + " (Menu)";
							},
							schema: fields.object({
								label: fields.text({
									label: "Label",
									validation: { isRequired: true },
								}),
								links: fields.array(
									fields.object(
										{
											label: fields.text({
												label: "Label",
												validation: { isRequired: true },
											}),
											url: fields.url({
												label: "URL",
												validation: { isRequired: true },
											}),
										},
										{
											label: "Link",
										},
									),
									{
										label: "Links",
										itemLabel(props) {
											return props.fields.label.value;
										},
										validation: { length: { min: 1 } },
									},
								),
							}),
						},
					},
					{
						label: "Links",
						validation: { length: { min: 1 } },
					},
				),
			},
		}),
	},
});
