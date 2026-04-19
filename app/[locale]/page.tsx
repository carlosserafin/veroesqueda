import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { VisualProofSection } from "@/components/sections/VisualProofSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AuthoritySection } from "@/components/sections/AuthoritySection";
import { HybridProductionSection } from "@/components/sections/HybridProductionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ForWhomSection } from "@/components/sections/ForWhomSection";
import { PortfolioTeaserSection } from "@/components/sections/PortfolioTeaserSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { RecognitionsSection } from "@/components/sections/RecognitionsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({
    locale,
    path: "",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <VisualProofSection />
      <StatsSection />
      <AuthoritySection />
      <HybridProductionSection />
      <ServicesSection />
      <ForWhomSection />
      <PortfolioTeaserSection />
      <ProcessSection />
      <RecognitionsSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
