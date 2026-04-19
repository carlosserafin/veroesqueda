import { readdir, writeFile, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { getPlaiceholder } from "plaiceholder";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUBLIC_IMAGES = join(ROOT, "public/images");
const OUT_DIR = join(ROOT, "lib/generated");
const OUT_FILE = join(OUT_DIR, "image-manifest.json");

const ORIENTATIONS = [
  { folder: "cuadradas", orientation: "square" as const },
  { folder: "verticales", orientation: "vertical" as const },
  { folder: "horizontales", orientation: "horizontal" as const },
];

const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

type ManifestEntry = {
  slug: string;
  src: string;
  orientation: "square" | "vertical" | "horizontal";
  folder: string;
  width: number;
  height: number;
  blurDataURL: string;
};

async function buildEntry(
  absPath: string,
  folder: string,
  orientation: ManifestEntry["orientation"],
): Promise<ManifestEntry> {
  const buffer = await readFile(absPath);
  const meta = await sharp(buffer).metadata();
  if (!meta.width || !meta.height) {
    throw new Error(`Could not read dimensions for ${absPath}`);
  }
  const { base64 } = await getPlaiceholder(buffer, { size: 10 });
  const filename = basename(absPath);
  const slug = `${folder}/${filename.replace(extname(filename), "")}`;
  const src = "/" + relative(join(ROOT, "public"), absPath).split("\\").join("/");
  return {
    slug,
    src,
    orientation,
    folder,
    width: meta.width,
    height: meta.height,
    blurDataURL: base64,
  };
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    await mkdir(OUT_DIR, { recursive: true });
  }

  const entries: ManifestEntry[] = [];

  for (const { folder, orientation } of ORIENTATIONS) {
    const dir = join(PUBLIC_IMAGES, folder);
    if (!existsSync(dir)) continue;
    const files = (await readdir(dir))
      .filter((f) => SUPPORTED_EXTS.has(extname(f).toLowerCase()))
      .sort();
    for (const file of files) {
      const entry = await buildEntry(join(dir, file), folder, orientation);
      entries.push(entry);
      console.log(`  ✓ ${entry.slug} (${entry.width}×${entry.height})`);
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    count: entries.length,
    entries,
  };

  await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`\n✓ Wrote ${entries.length} entries → ${relative(ROOT, OUT_FILE)}`);
}

main().catch((err) => {
  console.error("✗ image-manifest failed:", err);
  process.exit(1);
});
