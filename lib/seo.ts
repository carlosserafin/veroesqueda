import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { BRAND, DEFAULT_LOCALE, LOCALES, SITE_URL, SOCIAL_PROFILES } from "@/lib/site";

type BuildMetadataInput = {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
  image?: { url: string; alt: string; width?: number; height?: number };
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
};

function joinUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function localizedPath(locale: Locale, path: string): string {
  const cleanPath = path.replace(/^\//, "");
  return cleanPath ? `/${locale}/${cleanPath}` : `/${locale}`;
}

export function buildAlternates(path = "") {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = joinUrl(SITE_URL, localizedPath(locale, path));
  }
  languages["x-default"] = joinUrl(SITE_URL, localizedPath(DEFAULT_LOCALE, path));
  return languages;
}

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  image,
  type = "website",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = joinUrl(SITE_URL, localizedPath(locale, path));
  const finalDescription = description ?? BRAND.description[locale];
  const ogImage = image ?? {
    url: "/og/default.jpg",
    alt: BRAND.full,
    width: 1200,
    height: 630,
  };
  const absoluteImage = ogImage.url.startsWith("http")
    ? ogImage.url
    : joinUrl(SITE_URL, ogImage.url);

  return {
    title,
    description: finalDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: buildAlternates(path),
    },
    openGraph: {
      type,
      url,
      siteName: BRAND.full,
      title: title ?? BRAND.full,
      description: finalDescription,
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_MX"],
      images: [
        {
          url: absoluteImage,
          alt: ogImage.alt,
          width: ogImage.width ?? 1200,
          height: ogImage.height ?? 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? BRAND.full,
      description: finalDescription,
      images: [absoluteImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

const JOB_TITLE: Record<Locale, string> = {
  es: "Fotógrafa profesional de alimentos · Directora de arte culinaria · AI Specialist",
  en: "Professional food photographer · Culinary art director · AI Specialist",
};

const KNOWS_ABOUT: Record<Locale, readonly string[]> = {
  es: [
    "Fotografía de alimentos",
    "Food styling",
    "Dirección de arte culinaria",
    "CGI para alimentos",
    "Generación de imágenes con IA",
    "Prompt engineering",
    "Producción híbrida foto + CGI + AI",
  ],
  en: [
    "Food photography",
    "Food styling",
    "Culinary art direction",
    "CGI for food",
    "AI image generation",
    "Prompt engineering",
    "Hybrid photo + CGI + AI production",
  ],
};

const AWARDS: Record<Locale, readonly string[]> = {
  es: [
    "Sony Alpha Partner / Embajadora",
    "Juez internacional de fotografía",
    "+15 años de experiencia internacional",
    "Obra exhibida en Europa, Estados Unidos y México",
  ],
  en: [
    "Sony Alpha Partner / Ambassador",
    "International photography judge",
    "15+ years of international experience",
    "Work exhibited in Europe, United States and Mexico",
  ],
};

export function buildPersonJsonLd({ locale }: { locale: Locale }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: BRAND.name,
    alternateName: BRAND.legalName,
    jobTitle: JOB_TITLE[locale],
    description: BRAND.description[locale],
    url: joinUrl(SITE_URL, localizedPath(locale, "")),
    address: {
      "@type": "PostalAddress",
      addressLocality: BRAND.base.city,
      addressCountry: BRAND.base.countryCode,
    },
    knowsAbout: KNOWS_ABOUT[locale],
    award: AWARDS[locale],
    ...(SOCIAL_PROFILES.length > 0 ? { sameAs: SOCIAL_PROFILES } : {}),
  };
}

export function buildWebsiteJsonLd({ locale }: { locale: Locale }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BRAND.full,
    description: BRAND.description[locale],
    url: joinUrl(SITE_URL, localizedPath(locale, "")),
    inLanguage: locale === "es" ? "es-MX" : "en-US",
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

export function buildBreadcrumbJsonLd({
  items,
}: {
  items: ReadonlyArray<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : joinUrl(SITE_URL, item.url),
    })),
  };
}

export function buildImageObjectJsonLd({
  url,
  caption,
  width,
  height,
}: {
  url: string;
  caption: string;
  width?: number;
  height?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: url.startsWith("http") ? url : joinUrl(SITE_URL, url),
    caption,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    creator: { "@id": `${SITE_URL}/#person` },
    copyrightHolder: { "@id": `${SITE_URL}/#person` },
    creditText: BRAND.legalName,
    license: `${SITE_URL}/legal/licencia-imagenes`,
  };
}

type SitemapEntry = {
  url: string;
  lastModified?: Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  alternates?: { languages: Record<string, string> };
};

const SITE_PATHS: ReadonlyArray<{
  path: string;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
}> = [{ path: "", changeFrequency: "weekly", priority: 1 }];

export function buildSitemapEntries(): SitemapEntry[] {
  const now = new Date();
  const entries: SitemapEntry[] = [];
  for (const { path, changeFrequency, priority } of SITE_PATHS) {
    for (const locale of LOCALES) {
      entries.push({
        url: joinUrl(SITE_URL, localizedPath(locale, path)),
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: buildAlternates(path) },
      });
    }
  }
  return entries;
}
