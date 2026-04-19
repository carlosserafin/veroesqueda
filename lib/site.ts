import type { Locale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://veroesqueda.com";

export const BRAND = {
  name: "Vero Esqueda",
  full: "Vero Esqueda · AI Specialist & Photo",
  legalName: "Verónica Esqueda",
  tagline: "AI Specialist & Photo",
  description: {
    es: "Fotografía profesional de alimentos y dirección de arte culinaria. Sony Alpha Partner, +15 años de experiencia internacional, juez de fotografía y conferencista. Producción híbrida foto + CGI + AI.",
    en: "Professional food photography and culinary art direction. Sony Alpha Partner, 15+ years of international experience, photography judge and speaker. Hybrid photo + CGI + AI production.",
  },
  base: {
    city: "Ciudad de México",
    country: "México",
    countryCode: "MX",
  },
} as const;

export const LOCALES = ["es", "en"] as const satisfies readonly Locale[];
export const DEFAULT_LOCALE: Locale = "es";

// CLAUDE.md §7: "No inventar URLs de sameAs". Pedir a Vero handles
// verificados (Instagram, Behance, LinkedIn, YouTube, directorio Sony
// Alpha Partner, etc.) y poblar este array antes de publicar.
export const SOCIAL_PROFILES: readonly string[] = [];

// CLAUDE.md §9.2: feature flag para apagar el badge si Vero deja de ser
// Embajadora Sony Alpha. Por defecto activo.
export const SONY_PARTNER_ACTIVE =
  process.env.NEXT_PUBLIC_SONY_PARTNER_ACTIVE !== "false";
