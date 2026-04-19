import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { SonyAlphaBadge } from "./SonyAlphaBadge";

export function SiteNav() {
  const t = useTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-gradient-to-b from-black/40 to-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 text-white sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label={t("homeAria")}
            className="flex items-baseline gap-3 transition hover:opacity-80"
          >
            <span className="font-serif text-base tracking-wide sm:text-lg">Vero Esqueda</span>
            <span className="hidden text-[0.65rem] tracking-[0.25em] uppercase opacity-70 sm:inline">
              AI Specialist &amp; Photo
            </span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <SonyAlphaBadge className="hidden sm:inline-flex" />
            <LocaleSwitcher variant="inline" />
          </div>
        </div>
      </div>
    </header>
  );
}
