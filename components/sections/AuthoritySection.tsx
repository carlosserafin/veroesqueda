import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { VERTICAL_IMAGES } from "@/lib/images";

const CREDENTIALS = ["sony", "judge", "speaker", "exhibited", "experience", "hybrid"] as const;

export function AuthoritySection() {
  const t = useTranslations("home.authority");
  const portrait = VERTICAL_IMAGES[3] ?? VERTICAL_IMAGES[0];

  return (
    <section
      id="autoridad"
      className="bg-[var(--color-base-light)] py-24 text-[var(--color-base-dark)] sm:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          {portrait && (
            <Reveal className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={portrait.src}
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholder="blur"
                blurDataURL={portrait.blurDataURL}
                className="object-cover"
              />
            </Reveal>
          )}
          <div className="space-y-8">
            <Reveal>
              <p className="mb-3 text-xs tracking-[0.3em] uppercase opacity-60">{t("eyebrow")}</p>
              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
                {t("headline")}
              </h2>
              <p className="mt-6 max-w-prose opacity-80">{t("intro")}</p>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {CREDENTIALS.map((key, i) => (
                <Reveal as="li" key={key} delay={0.05 * i}>
                  <div className="flex h-full items-start gap-3 border border-[var(--color-base-dark)]/15 bg-white/40 px-4 py-3">
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-warm)]"
                    />
                    <div>
                      <p className="text-sm font-medium">{t(`credentials.${key}.title`)}</p>
                      <p className="mt-0.5 text-xs opacity-70">{t(`credentials.${key}.detail`)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal className="text-sm opacity-70">
              <p>{t("closer")}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
