import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
	"/public/assets/**/*.{avif,jpeg,jpg,png,webp}",
);

export async function getContentImage(src: string): Promise<ImageMetadata | undefined> {
	const image = await images[`/public${src}`]?.();
	return image?.default;
}
