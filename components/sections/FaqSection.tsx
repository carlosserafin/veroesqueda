import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const FAQ_KEYS = ["price", "location", "rights", "delivery", "revisions", "travel", "cgi", "membership"] as const;

export function FaqSection() {
  const t = useTranslations("home.faq");

  return (
    <section className="bg-[var(--color-base-light)] py-24 text-[var(--color-base-dark)] sm:py-32">
      <Container size="narrow">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase opacity-60">{t("eyebrow")}</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
            {t("headline")}
          </h2>
        </Reveal>
        <ul className="divide-y divide-[var(--color-base-dark)]/15 border-y border-[var(--color-base-dark)]/15">
          {FAQ_KEYS.map((key, i) => (
            <Reveal as="li" key={key} delay={i * 0.03}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-lg sm:text-xl">
                  <span>{t(`items.${key}.q`)}</span>
                  <span
                    aria-hidden
                    className="mt-1 text-2xl leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-prose text-sm opacity-80 sm:text-base">
                  {t(`items.${key}.a`)}
                </p>
              </details>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
