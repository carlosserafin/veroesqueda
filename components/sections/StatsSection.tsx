import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { id: "menu", source: "Toast Restaurant Industry Report" },
  { id: "social", source: "Hootsuite Social Trends" },
  { id: "delivery", source: "DoorDash Merchant Insights" },
] as const;

export function StatsSection() {
  const t = useTranslations("home.stats");

  return (
    <section className="bg-[var(--color-base-dark)] py-24 text-[var(--color-base-light)] sm:py-32">
      <Container>
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 text-xs tracking-[0.3em] uppercase opacity-60">{t("eyebrow")}</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
            {t("headline")}
          </h2>
        </Reveal>
        <dl className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {STATS.map((stat, i) => (
            <Reveal as="div" key={stat.id} delay={i * 0.1} className="text-center sm:text-left">
              <dt className="font-serif text-5xl text-[var(--color-accent-gold)] sm:text-6xl">
                {t(`items.${stat.id}.value`)}
              </dt>
              <dd className="mt-4 space-y-2">
                <p className="text-base opacity-90">{t(`items.${stat.id}.body`)}</p>
                <p className="text-[0.65rem] tracking-[0.2em] uppercase opacity-50">
                  {t("sourceLabel")}: {stat.source}
                </p>
              </dd>
            </Reveal>
          ))}
        </dl>
        <Reveal className="mt-12 text-center text-xs opacity-50">
          <p>{t("sourcesNote")}</p>
        </Reveal>
      </Container>
    </section>
  );
}
