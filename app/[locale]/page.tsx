import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

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
  return <HomeView />;
}

function HomeView() {
  const t = useTranslations("home");

  return (
    <main className="grid min-h-screen place-items-center p-8 text-center">
      <div className="space-y-6">
        <p className="text-xs tracking-[0.2em] uppercase opacity-60">{t("eyebrow")}</p>
        <h1 className="text-4xl font-medium sm:text-6xl">{t("title")}</h1>
        <p className="mx-auto max-w-prose opacity-70">{t("subtitle")}</p>
        <div className="pt-4">
          <LocaleSwitcher />
        </div>
      </div>
    </main>
  );
}
