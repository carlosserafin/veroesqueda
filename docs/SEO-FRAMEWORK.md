# Framework SEO · Vero Esqueda

Este documento describe el framework SEO técnico construido para `veroesqueda.com`.
El framework en sí es parte del producto: muestra a clientes cómo se construye una
landing alineada con buenas prácticas de Google, OpenGraph y Schema.org, sin
"esoterismo" — todo es código verificable.

## Principios

1. **Una sola fuente de verdad**: marca, descripciones, locales y URLs viven en
   [lib/site.ts](../lib/site.ts). Cambiar el dominio o el tagline se hace en un solo lugar.
2. **No inventar URLs externas**: `SOCIAL_PROFILES` arranca vacío. Solo se llena con
   handles verificados por Vero (Instagram, Behance, LinkedIn, YouTube, directorio
   Sony Alpha Partner, etc.). Schema.org `sameAs` no se emite si está vacío.
3. **Bilingüe real**: `<link rel="alternate" hreflang>` bidireccional ES↔EN +
   `x-default` apuntando al locale por defecto (`es`). Cada página declara `canonical`
   absoluto al locale activo.
4. **Static-first**: rutas localizadas se prerenderizan con `generateStaticParams`.
   El sitemap se genera en build (`app/sitemap.ts`).
5. **Schema.org sin ruido**: solo se emite lo que es verdad y verificable. Person
   schema lleva `award` (Sony Alpha Partner, juez internacional, +15 años) y
   `knowsAbout` (food photography, food styling, dirección de arte, CGI, AI image
   generation, prompt engineering, producción híbrida).

## API de [lib/seo.ts](../lib/seo.ts)

| Función | Devuelve | Uso |
| --- | --- | --- |
| `buildAlternates(path)` | `Record<string, string>` con `es`, `en`, `x-default` | Internamente por `buildMetadata` y `buildSitemapEntries`. Exportado por si una página necesita inyectar hreflang manualmente. |
| `buildMetadata({locale, path, title?, description?, image?, type?, noIndex?})` | `Metadata` de Next | Metadatos completos: title, description, canonical absoluto, hreflang, OG (`es_MX`/`en_US` con `alternateLocale`), Twitter `summary_large_image`, robots. |
| `buildPersonJsonLd({locale})` | JSON-LD `Person` | Identidad de Vero (CDMX, MX), `award`, `knowsAbout`, `sameAs` solo si hay perfiles. |
| `buildWebsiteJsonLd({locale})` | JSON-LD `WebSite` | Sitio en idioma activo, `publisher` referencia al `Person` por `@id`. |
| `buildBreadcrumbJsonLd({items})` | JSON-LD `BreadcrumbList` | Para páginas internas con jerarquía. |
| `buildImageObjectJsonLd({url, caption, width?, height?})` | JSON-LD `ImageObject` | Cada foto importante: `creator` y `copyrightHolder` apuntan al `Person`, `creditText` = "Verónica Esqueda", `license` apunta a `/legal/licencia-imagenes`. |
| `buildSitemapEntries()` | `MetadataRoute.Sitemap` | Una entrada por (path, locale) con `alternates.languages`. |

## Convenciones de uso

- **Metadatos por página**: cada `page.tsx` exporta su propio `generateMetadata`
  con `buildMetadata`, pasando `path` (sin locale, ej. `"servicios"`) + `title` y
  `description` traducidos del namespace de esa página.
- **Layout root**: emite `Person` y `WebSite` JSON-LD una sola vez al final del
  `<body>` (ver [app/[locale]/layout.tsx](../app/[locale]/layout.tsx)).
- **Imágenes**: cuando se renderice una foto destacada, llamar a
  `buildImageObjectJsonLd` con la `caption` traducida y emitir el script junto
  al componente.

## Sitemap y robots

- [app/sitemap.ts](../app/sitemap.ts): delega 100% en `buildSitemapEntries`.
  Para añadir una página, basta extender `SITE_PATHS` en [lib/seo.ts](../lib/seo.ts).
- [app/robots.ts](../app/robots.ts): permite todo excepto `/api/` y `/_next/`,
  apunta `Sitemap` a la URL absoluta + `host` a `SITE_URL`.

## Variables de entorno relevantes

| Var | Default | Notas |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://veroesqueda.com` | Base para canonicals, sitemap, JSON-LD `@id`. |
| `NEXT_PUBLIC_SONY_PARTNER_ACTIVE` | `"true"` | Feature flag de CLAUDE.md §9.2. Si Vero deja de ser embajadora, ponerlo a `"false"` y el badge se apaga. |

## Checklist antes de publicar

- [ ] `SOCIAL_PROFILES` poblado con handles verificados.
- [ ] OG image real en `public/og/default.jpg` (1200×630, peso < 300 KB).
- [ ] Vero confirma textos `metaTitle` / `metaDescription` por página en `messages/*.json`.
- [ ] Validar Person schema con [validator.schema.org](https://validator.schema.org/).
- [ ] Validar Rich Results con [search.google.com/test/rich-results](https://search.google.com/test/rich-results).
- [ ] Submitear `sitemap.xml` en Google Search Console.
- [ ] Decidir y enlazar `/legal/licencia-imagenes` (referenciada por `ImageObject.license`).
