import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent-warm)] text-[var(--color-base-light)] hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-base-dark)]",
  secondary:
    "border border-current text-current hover:bg-current/10",
  ghost: "text-current underline-offset-4 hover:underline",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

interface CTAButtonProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
}

export function CTAButton({
  children,
  href,
  external,
  variant = "primary",
  className,
  type = "button",
  onClick,
  ariaLabel,
}: CTAButtonProps) {
  const cls = cn(BASE, VARIANT_STYLES[variant], className);
  if (href && external) {
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href as ComponentPropsWithoutRef<typeof Link>["href"]} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
