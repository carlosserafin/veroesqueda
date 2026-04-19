import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { HORIZONTAL_IMAGES, SQUARE_IMAGES } from "@/lib/images";

const SEGMENTS = [
  { key: "restaurant", source: "horizontal" as const, idx: 7 },
  { key: "chain", source: "horizontal" as const, idx: 8 },
  { key: "bar", source: "square" as const, idx: 3 },
  { key: "boutiqueHotel", source: "horizontal" as const, idx: 9 },
  { key: "producer", source: "square" as const, idx: 4 },
  { key: "chef", source: "horizontal" as const, idx: 10 },
];

function pick(source: "horizontal" | "square", idx: number) {
  const arr = source === "horizontal" ? HORIZONTAL_IMAGES : SQUARE_IMAGES;
  return arr[idx % arr.length];
}

export function PortfolioTeaserSection() {
  const t = useTranslations("home.portfolio");

  return (
    <section
      id="portafolio"
      className="bg-[var(--color-base-light)] py-24 text-[var(--color-base-dark)] sm:py-32"
    >
      <Container>
        <Reveal className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-xs tracking-[0.3em] uppercase opacity-60">{t("eyebrow")}</p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
              {t("headline")}
            </h2>
          </div>
          <CTAButton href="/#contacto" variant="ghost">
            {t("cta")} →
          </CTAButton>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEGMENTS.map((seg, i) => {
            const img = pick(seg.source, seg.idx);
            if (!img) return null;
            return (
              <Reveal as="li" key={seg.key} delay={i * 0.05}>
                <article className="group relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={t(`items.${seg.key}.imageAlt`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={img.blurDataURL}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-[var(--color-base-light)]">
                    <p className="text-[0.65rem] tracking-[0.25em] uppercase opacity-80">
                      {t(`items.${seg.key}.category`)}
                    </p>
                    <p className="mt-1 font-serif text-xl">{t(`items.${seg.key}.title`)}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
