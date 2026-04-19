import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HORIZONTAL_IMAGES, SQUARE_IMAGES, VERTICAL_IMAGES } from "@/lib/images";

const TILES = [
  { source: "horizontal" as const, idx: 2, span: "col-span-2 row-span-2 aspect-[3/2]" },
  { source: "square" as const, idx: 0, span: "aspect-square" },
  { source: "vertical" as const, idx: 1, span: "row-span-2 aspect-[2/3]" },
  { source: "horizontal" as const, idx: 3, span: "col-span-2 aspect-[3/2]" },
  { source: "square" as const, idx: 1, span: "aspect-square" },
  { source: "square" as const, idx: 2, span: "aspect-square" },
  { source: "vertical" as const, idx: 2, span: "row-span-2 aspect-[2/3]" },
  { source: "horizontal" as const, idx: 4, span: "col-span-2 aspect-[3/2]" },
];

function pick(source: "horizontal" | "vertical" | "square", idx: number) {
  const arr =
    source === "horizontal"
      ? HORIZONTAL_IMAGES
      : source === "vertical"
        ? VERTICAL_IMAGES
        : SQUARE_IMAGES;
  return arr[idx % arr.length];
}

export function VisualProofSection() {
  const t = useTranslations("home.visualProof");

  return (
    <section className="bg-[var(--color-base-light)] py-24 text-[var(--color-base-dark)] sm:py-32">
      <Container>
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs tracking-[0.3em] uppercase opacity-60">{t("eyebrow")}</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
            {t("headline")}
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {TILES.map((tile, i) => {
            const img = pick(tile.source, tile.idx);
            if (!img) return null;
            return (
              <Reveal
                key={`${tile.source}-${tile.idx}-${i}`}
                delay={i * 0.05}
                className={`group relative overflow-hidden ${tile.span}`}
              >
                <Image
                  src={img.src}
                  alt={t("itemAlt", { n: i + 1 })}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL={img.blurDataURL}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
