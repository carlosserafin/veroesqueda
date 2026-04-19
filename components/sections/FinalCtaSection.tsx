import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { HORIZONTAL_IMAGES } from "@/lib/images";

export function FinalCtaSection() {
  const t = useTranslations("home.finalCta");
  const bg = HORIZONTAL_IMAGES[12] ?? HORIZONTAL_IMAGES[0];

  return (
    <section
      id="contacto"
      className="relative isolate flex min-h-[80svh] items-center overflow-hidden text-[var(--color-base-light)]"
    >
      {bg && (
        <Image
          src={bg.src}
          alt=""
          fill
          aria-hidden
          sizes="100vw"
          placeholder="blur"
          blurDataURL={bg.blurDataURL}
          className="object-cover"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[var(--color-base-dark)] via-[var(--color-base-dark)]/70 to-[var(--color-base-dark)]/40"
      />
      <Container className="relative z-10 py-24">
        <div className="max-w-2xl space-y-6">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase opacity-70">{t("eyebrow")}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
              {t("headline")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base opacity-85 sm:text-lg">{t("body")}</p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap items-center gap-3 pt-2">
            <CTAButton href="mailto:hola@veroesqueda.com" external variant="primary">
              {t("ctaPrimary")}
            </CTAButton>
            <CTAButton
              href="https://wa.me/525500000000"
              external
              variant="secondary"
              ariaLabel={t("ctaWhatsappAria")}
            >
              {t("ctaWhatsapp")}
            </CTAButton>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="pt-4 text-xs opacity-60">{t("formNote")}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
