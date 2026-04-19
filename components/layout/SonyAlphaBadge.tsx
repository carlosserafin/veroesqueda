import clsx from "clsx";
import { useTranslations } from "next-intl";
import { SONY_PARTNER_ACTIVE } from "@/lib/site";

interface SonyAlphaBadgeProps {
  variant?: "inline" | "stacked";
  className?: string;
}

export function SonyAlphaBadge({ variant = "inline", className }: SonyAlphaBadgeProps) {
  const t = useTranslations("badges.sonyAlpha");
  if (!SONY_PARTNER_ACTIVE) return null;

  return (
    <span
      className={clsx(
        "inline-flex items-center text-[0.65rem] tracking-[0.2em] uppercase opacity-70",
        variant === "stacked" ? "flex-col gap-0.5" : "gap-2",
        className,
      )}
      aria-label={t("aria")}
    >
      <span aria-hidden className="font-medium">α</span>
      <span>{t("label")}</span>
    </span>
  );
}
