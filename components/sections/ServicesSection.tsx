import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTAButton } from "@/components/ui/CTAButton";

const PACKAGES = ["photo", "web", "academy"] as const;

export function ServicesSection() {
  const t = useTranslations("home.services");

  return (
    <section
      id="servicios"
      className="bg-[var(--color-base-light)] py-24 text-[var(--color-base-dark)] sm:py-32"
    >
      <Container>
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase opacity-60">{t("eyebrow")}</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
            {t("headline")}
          </h2>
          <p className="mt-6 opacity-80">{t("intro")}</p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((key, i) => (
            <Reveal
              as="article"
              key={key}
              delay={0.05 * i}
              className="flex h-full flex-col gap-5 border border-[var(--color-base-dark)]/15 bg-white/50 p-8"
            >
              <div className="flex items-baseline justify-between">
                <p className="font-serif text-2xl">{t(`items.${key}.name`)}</p>
                <p className="text-xs tracking-[0.2em] uppercase opacity-60">
                  {t(`items.${key}.tag`)}
                </p>
              </div>
              <p className="text-sm opacity-80">{t(`items.${key}.body`)}</p>
              <ul className="space-y-1 text-sm">
                {(["a", "b", "c"] as const).map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span aria-hidden className="opacity-50">
                      ·
                    </span>
                    <span>{t(`items.${key}.bullets.${bullet}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto space-y-3 pt-4">
                <p className="font-serif text-lg">{t(`items.${key}.price`)}</p>
                <CTAButton href="/#contacto" variant="primary" className="w-full">
                  {t(`items.${key}.cta`)}
                </CTAButton>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-base-dark)]/15 pt-8 sm:flex-row">
          <div>
            <p className="font-serif text-xl">{t("workshops.name")}</p>
            <p className="text-sm opacity-70">{t("workshops.body")}</p>
          </div>
          <CTAButton href="/#contacto" variant="secondary">
            {t("workshops.cta")}
          </CTAButton>
        </Reveal>
      </Container>
    </section>
  );
}
