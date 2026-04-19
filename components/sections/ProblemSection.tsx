import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HORIZONTAL_IMAGES } from "@/lib/images";

export function ProblemSection() {
  const t = useTranslations("home.problem");
  const bg = HORIZONTAL_IMAGES[1] ?? HORIZONTAL_IMAGES[0];

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-base-dark)] py-32 text-[var(--color-base-light)] sm:py-40">
      {bg && (
        <Image
          src={bg.src}
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          placeholder="blur"
          blurDataURL={bg.blurDataURL}
          className="object-cover opacity-25"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-base-dark)] via-transparent to-[var(--color-base-dark)]"
      />
      <Container size="narrow" className="relative z-10 text-center">
        <Reveal>
          <p className="mb-6 text-xs tracking-[0.3em] uppercase opacity-60">{t("eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
            {t("headline")}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-lg opacity-80 sm:text-xl">{t("body")}</p>
        </Reveal>
      </Container>
    </section>
  );
}
