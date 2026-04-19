import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { SonyAlphaBadge } from "@/components/layout/SonyAlphaBadge";
import { getHeroImage, getMobileHeroImage } from "@/lib/images";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const desktop = getHeroImage();
  const mobile = getMobileHeroImage();

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden text-[var(--color-base-light)]">
      <Image
        src={desktop.src}
        alt={t("imageAlt")}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 100vw"
        placeholder="blur"
        blurDataURL={desktop.blurDataURL}
        className="hidden object-cover md:block"
      />
      <Image
        src={mobile.src}
        alt={t("imageAlt")}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={mobile.blurDataURL}
        className="object-cover md:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-base-dark)] via-[var(--color-base-dark)]/40 to-transparent"
      />
      <Container className="relative z-10 pb-20 pt-32 sm:pb-28">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase opacity-80">
            {t("eyebrow")} · <SonyAlphaBadge className="!opacity-100" />
          </p>
          <h1 className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="max-w-xl text-base opacity-85 sm:text-lg">{t("subtitle")}</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <CTAButton href="/#servicios" variant="primary">
              {t("ctaPrimary")}
            </CTAButton>
            <CTAButton href="/#portafolio" variant="secondary">
              {t("ctaSecondary")}
            </CTAButton>
          </div>
        </div>
      </Container>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-4 z-10 flex justify-center text-[0.6rem] tracking-[0.4em] uppercase opacity-60"
      >
        {t("scroll")}
      </div>
    </section>
  );
}
