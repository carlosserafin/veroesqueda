import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { SonyAlphaBadge } from "./SonyAlphaBadge";

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0E0B08] text-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div className="space-y-2">
            <p className="font-serif text-lg">Vero Esqueda</p>
            <p className="text-xs tracking-[0.2em] uppercase opacity-70">
              AI Specialist &amp; Photo
            </p>
            <p className="pt-2 text-sm opacity-70">{t("based")}</p>
          </div>

          <div className="space-y-2 text-sm opacity-80 md:text-center">
            <p>{t("experience")}</p>
            <SonyAlphaBadge className="md:justify-center" />
          </div>

          <div className="flex items-start md:justify-end">
            <LocaleSwitcher variant="inline" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs opacity-60 md:flex-row md:items-center md:justify-between">
          <p>{t("credits", { year })}</p>
          <p>{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
