import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS = ["sony", "international", "speaker", "exhibitions"] as const;

export function RecognitionsSection() {
  const t = useTranslations("home.recognitions");

  return (
    <section className="bg-[var(--color-base-light)] py-16 text-[var(--color-base-dark)]">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase opacity-60">{t("label")}</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            {ITEMS.map((key, i) => (
              <li key={key} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden className="text-[var(--color-accent-warm)]">
                    ·
                  </span>
                )}
                <span className="font-serif text-base">{t(`items.${key}`)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs opacity-60">{t("note")}</p>
        </Reveal>
      </Container>
    </section>
  );
}
