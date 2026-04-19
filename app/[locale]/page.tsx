import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import type { Locale } from "@/i18n/routing";

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
