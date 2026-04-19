import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HORIZONTAL_IMAGES } from "@/lib/images";

const BENEFITS = ["variants", "impossible", "consistency", "speed"] as const;

export function HybridProductionSection() {
  const t = useTranslations("home.hybrid");
  const before = HORIZONTAL_IMAGES[5] ?? HORIZONTAL_IMAGES[0];
  const after = HORIZONTAL_IMAGES[6] ?? HORIZONTAL_IMAGES[1];

  return (
    <section className="bg-[var(--color-base-dark)] py-24 text-[var(--color-base-light)] sm:py-32">
      <Container>
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase opacity-60">{t("eyebrow")}</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
            {t("headline")}
          </h2>
          <p className="mt-6 opacity-85 sm:text-lg">{t("intro")}</p>
        </Reveal>

        {/* Split: foto pura → versión aumentada. TODO: reemplazar 'after' con asset real CGI/AI de Vero */}
        <Reveal className="grid gap-3 overflow-hidden sm:grid-cols-2 sm:gap-4">
          {[
            { img: before, label: t("labelPhoto") },
            { img: after, label: t("labelHybrid"), tag: t("tagPlaceholder") },
          ].map((item, i) =>
            item.img ? (
              <div key={i} className="group relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                <Image
                  src={item.img.src}
                  alt={`${item.label}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={item.img.blurDataURL}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <span className="text-xs tracking-[0.25em] uppercase">{item.label}</span>
                  {item.tag && (
                    <span className="rounded-full border border-white/40 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider opacity-80">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            ) : null,
          )}
        </Reveal>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((key, i) => (
            <Reveal as="li" key={key} delay={0.05 * i}>
              <p className="font-serif text-2xl text-[var(--color-accent-gold)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-base font-medium">{t(`benefits.${key}.title`)}</p>
              <p className="mt-1 text-sm opacity-70">{t(`benefits.${key}.body`)}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
