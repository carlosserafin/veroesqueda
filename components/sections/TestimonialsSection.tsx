import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

// TODO: testimonios reales de clientes (CLAUDE.md §6.13). Mientras se obtienen 2-3
// con foto + nombre + negocio, mantenemos placeholders sobrios.
const PLACEHOLDERS = [
  { id: "p1", initial: "—" },
  { id: "p2", initial: "—" },
  { id: "p3", initial: "—" },
] as const;

export function TestimonialsSection() {
  const t = useTranslations("home.testimonials");

  return (
    <section className="bg-[var(--color-base-dark)] py-24 text-[var(--color-base-light)] sm:py-32">
      <Container>
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase opacity-60">{t("eyebrow")}</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
            {t("headline")}
          </h2>
          <p className="mt-4 text-sm opacity-60">{t("placeholderNote")}</p>
        </Reveal>
        <ul className="grid gap-6 lg:grid-cols-3">
          {PLACEHOLDERS.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.05}>
              <figure className="flex h-full flex-col gap-4 border border-white/15 bg-white/5 p-6">
                <blockquote className="font-serif text-lg leading-snug opacity-80">
                  &ldquo;{t(`items.${p.id}.quote`)}&rdquo;
                </blockquote>
                <figcaption className="mt-auto text-xs tracking-[0.2em] uppercase opacity-50">
                  {t(`items.${p.id}.attribution`)}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
