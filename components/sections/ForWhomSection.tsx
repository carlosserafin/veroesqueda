import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const AUDIENCES = [
  "independent",
  "chains",
  "bars",
  "hotels",
  "producers",
  "chefs",
  "packaged",
  "agencies",
] as const;

export function ForWhomSection() {
  const t = useTranslations("home.forWhom");

  return (
    <section className="bg-[var(--color-base-dark)] py-24 text-[var(--color-base-light)] sm:py-32">
      <Container>
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase opacity-60">{t("eyebrow")}</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
            {t("headline")}
          </h2>
        </Reveal>
        <ul className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
          {AUDIENCES.map((key, i) => (
            <Reveal
              as="li"
              key={key}
              delay={0.04 * i}
              className="bg-[var(--color-base-dark)] p-6 transition hover:bg-white/5"
            >
              <p className="font-serif text-lg">{t(`items.${key}.title`)}</p>
              <p className="mt-2 text-sm opacity-70">{t(`items.${key}.body`)}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
