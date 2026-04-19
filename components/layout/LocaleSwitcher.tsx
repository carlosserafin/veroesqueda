"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type Variant = "select" | "inline";

interface LocaleSwitcherProps {
  variant?: Variant;
  className?: string;
}

export function LocaleSwitcher({ variant = "select", className }: LocaleSwitcherProps) {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function go(nextLocale: Locale) {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  if (variant === "inline") {
    return (
      <div
        className={clsx("inline-flex items-center gap-1 text-xs tracking-wider", className)}
        role="group"
        aria-label={t("label")}
      >
        {routing.locales.map((loc, i) => (
          <span key={loc} className="contents">
            {i > 0 && <span aria-hidden className="opacity-30">·</span>}
            <button
              type="button"
              onClick={() => go(loc)}
              disabled={isPending}
              aria-current={locale === loc ? "true" : undefined}
              className={clsx(
                "uppercase transition disabled:opacity-50",
                locale === loc ? "opacity-100" : "opacity-50 hover:opacity-100",
              )}
            >
              {loc}
            </button>
          </span>
        ))}
      </div>
    );
  }

  return (
    <label className={clsx("inline-flex items-center gap-2 text-sm", className)}>
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        onChange={(e) => go(e.target.value as Locale)}
        disabled={isPending}
        className="rounded border border-current/20 bg-transparent px-2 py-1 disabled:opacity-50"
        aria-label={t("label")}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {t(loc)}
          </option>
        ))}
      </select>
    </label>
  );
}
