import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = ["brief", "preproduction", "shoot", "postproduction", "delivery"] as const;

export function ProcessSection() {
  const t = useTranslations("home.process");

  return (
    <section className="bg-[var(--color-base-dark)] py-24 text-[var(--color-base-light)] sm:py-32">
      <Container>
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase opacity-60">{t("eyebrow")}</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
            {t("headline")}
          </h2>
        </Reveal>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step} delay={i * 0.07}>
              <div className="border-t border-[var(--color-accent-gold)]/40 pt-4">
                <p className="font-serif text-3xl text-[var(--color-accent-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 font-medium">{t(`steps.${step}.title`)}</p>
                <p className="mt-1 text-sm opacity-70">{t(`steps.${step}.body`)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
