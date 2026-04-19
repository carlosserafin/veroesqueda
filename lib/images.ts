import manifest from "@/lib/generated/image-manifest.json";

export type ImageOrientation = "square" | "vertical" | "horizontal";

export type SiteImage = {
  slug: string;
  src: string;
  orientation: ImageOrientation;
  folder: string;
  width: number;
  height: number;
  blurDataURL: string;
};

const ENTRIES: readonly SiteImage[] = manifest.entries as readonly SiteImage[];
const BY_SLUG: Map<string, SiteImage> = new Map(ENTRIES.map((e) => [e.slug, e]));

export const ALL_IMAGES = ENTRIES;

export function getImagesByOrientation(orientation: ImageOrientation): readonly SiteImage[] {
  return ENTRIES.filter((e) => e.orientation === orientation);
}

export const SQUARE_IMAGES = getImagesByOrientation("square");
export const VERTICAL_IMAGES = getImagesByOrientation("vertical");
export const HORIZONTAL_IMAGES = getImagesByOrientation("horizontal");

export function getImage(slug: string): SiteImage {
  const img = BY_SLUG.get(slug);
  if (!img) {
    throw new Error(
      `[lib/images] Unknown image slug "${slug}". Re-run \`pnpm images:manifest\` after adding files.`,
    );
  }
  return img;
}

export function getHeroImage(): SiteImage {
  const hero = HORIZONTAL_IMAGES[0];
  if (!hero) throw new Error("[lib/images] No horizontal images available for hero.");
  return hero;
}

export function getMobileHeroImage(): SiteImage {
  const hero = VERTICAL_IMAGES[0];
  if (!hero) throw new Error("[lib/images] No vertical images available for mobile hero.");
  return hero;
}

export function pickImages(orientation: ImageOrientation, count: number): readonly SiteImage[] {
  return getImagesByOrientation(orientation).slice(0, count);
}
