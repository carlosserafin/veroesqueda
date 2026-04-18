# CLAUDE.md — Vero Esqueda AI Specialist & Photo

> Archivo de contexto persistente para Claude Code. Lee esto antes de cualquier tarea en el repo.

---

## 1. Identidad del proyecto

**Nombre comercial:** Vero Esqueda AI Specialist & Photo
**Propietaria / Autora:** Verónica Esqueda
**Ubicación base:** Ciudad de México, México (bilingüe ES/EN, alcance global — foco prioritario LATAM + US, servicio entregable 100% remoto + viajes a producción on-site cuando aplique).

### 1.1 Quién es Vero — perfil real y posicionamiento

Vero Esqueda no es "una fotógrafa más". Es una **autoridad reconocida internacionalmente** en fotografía de alimentos y dirección de arte culinaria, con credenciales que pocos fotógrafos en el mundo tienen. Este perfil cambia TODO sobre cómo se comunica en la landing: no vendemos un servicio barato, vendemos acceso a expertise de clase mundial.

**Credenciales (fuente de verdad — no inventar nada más sin confirmar):**

- **+15 años de carrera** como fotógrafa profesional especializada en alimentos y estilismo gastronómico.
- **Juez internacional de fotografía.** Ha evaluado trabajo de fotógrafos profesionales a nivel internacional.
- **Tallerista y conferencista internacional.** Enseña fotografía, estilismo y dirección de arte en eventos y foros profesionales.
- **Embajadora Sony Alpha Partner** (actualmente vigente). Esta es una distinción selectiva que Sony otorga a fotógrafos de élite — es una señal fuerte de credibilidad técnica y creativa. Usar el badge/logo de Sony Alpha Partner con respeto a guidelines de marca de Sony.
- **Exposiciones de obra en Europa, Estados Unidos y México.** Artista expuesta, no solo "proveedora de servicios".
- **Colaboraciones con marcas internacionales** mezclando fotografía tradicional con **CGI y AI** — esto la posiciona como puente entre el craft fotográfico clásico y las nuevas herramientas generativas, lo cual es extremadamente raro y vendible.

### 1.2 Posicionamiento estratégico

El ángulo de venta debe aprovechar que Vero es **una de las poquísimas personas en LATAM que combina:**

1. Autoridad fotográfica validada (juez internacional + Sony Alpha Partner + exposiciones internacionales).
2. Dominio del estilismo gastronómico.
3. Fluidez real en CGI y AI generativa aplicada a producción comercial.

Esto le permite ofrecer a un restaurante/cadena/marca algo que casi nadie más puede: **producciones híbridas** (foto real + CGI + AI) que reducen costos de producción, permiten iteración infinita de variantes de platillo y crean contenido que un fotógrafo tradicional no puede entregar, con la credibilidad artística de alguien que sí sabe fotografiar "a la antigua".

El copy y los visuales deben proyectar esto sin presumir. Confianza tranquila, no autobombo. Las credenciales se muestran; no se gritan.

### 1.3 Propuesta de valor (qué se vende)

1. **Paquetes de fotografía profesional de alimentos y bebidas** para restaurantes, bares, hoteles, chefs, productores y cadenas — con opción de producciones híbridas foto + CGI + AI como upsell premium.
2. **Paquetes de páginas web profesionales** con framework propio de SEO orgánico (la landing que construimos es la vitrina/prueba).
3. **Membresía tipo Skool** (suscripción mensual) con contenido premium: HOW TOs de fotografía, estilismo, uso de herramientas de AI (Claude, ChatGPT, Higgsfield, Midjourney, Gemini), prompt engineering aplicado a food content, behind-the-scenes.
4. **Talleres, workshops y conferencias** (in-person y online) — línea de ingreso existente que debe tener su lugar en la web aunque no sea el foco de la landing v1. Reservar ruta `/academia/talleres` o similar.
5. **Portafolio segmentado** por tipo de negocio (cadena, restaurante de autor, bar, cafetería, productor artesanal, hotel boutique, etc.) — cada segmento con su propia landing, para que el prospecto diga "esa es para mí".

### 1.4 Objetivo de esta fase

Construir la landing page principal bilingüe, altamente conversiva, con efectos visuales de nivel (parallax, explosión de ingredientes, reveals cinematográficos), comunicando con claridad la autoridad internacional de Vero y dejando la arquitectura lista para escalar a N landings con SEO orgánico.

---

## 2. Stack técnico (obligatorio)

- **Framework:** Next.js 15 (App Router) + React 19
- **Lenguaje:** TypeScript estricto (`"strict": true`)
- **Estilos:** Tailwind CSS v4 + CSS Modules puntuales para animaciones complejas
- **Animación:** Framer Motion (principal) + GSAP + ScrollTrigger (parallax pesado y timelines cinematográficos) + Lenis (smooth scroll)
- **3D / efectos de partículas (explosión de ingredientes):** React Three Fiber + drei, o canvas 2D optimizado si el efecto lo permite (preferir 2D cuando sea posible por performance móvil)
- **Imágenes:** `next/image` SIEMPRE, con `sharp` en build. AVIF + WebP. Placeholders con `blurDataURL`.
- **i18n:** `next-intl` (App Router nativo, mejor DX que next-i18next en Next 15). Rutas `/es` y `/en`, `es` por defecto.
- **Formularios:** React Hook Form + Zod. Envío vía Resend o similar (configurable por env).
- **CMS / contenido:** arrancar con MDX local (`contentlayer2` o `next-mdx-remote`) para que Vero edite contenido sin tocar código. Dejar abstracción para migrar a Sanity/Payload después.
- **Analítica:** Plausible o Umami (privacy-first, sin cookies — ventaja SEO/UX). GA4 opcional.
- **Deploy objetivo:** Vercel.
- **Generación de imagen con AI (build/dev-time, NUNCA runtime cliente):** OpenAI Images (`openai` SDK, modelo por defecto `gpt-image-1`) y Google Gemini 2.5 Flash Image alias "Nano Banana" (`@google/genai`, modelo `gemini-2.5-flash-image-preview`). Usadas exclusivamente desde scripts internos para sprites de la explosión, placeholders del bloque CGI+AI y elementos auxiliares. Detalle completo, casos permitidos y prohibidos en §17.

**Restricciones:**

- Cero uso de `<form>` HTML nativo dentro de artifacts. Dentro de Next.js normal, usar `<form action={serverAction}>` cuando aplique.
- No `localStorage` / `sessionStorage` dentro de Server Components.
- No introducir librerías nuevas sin justificar en el PR: peso, mantenimiento, alternativa nativa.

---

## 3. Arquitectura del repositorio

```
/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # layout raíz con i18n provider
│   │   ├── page.tsx                # landing principal (la que se construye primero)
│   │   ├── portafolio/
│   │   │   ├── page.tsx            # índice de casos
│   │   │   └── [slug]/page.tsx     # landing por tipo de restaurante (generateStaticParams)
│   │   ├── servicios/
│   │   │   ├── fotografia/page.tsx
│   │   │   ├── web-seo/page.tsx
│   │   │   └── membresia/page.tsx
│   │   ├── academia/               # HOW TOs + tips (indexable, ancla SEO)
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── contacto/page.tsx
│   ├── api/
│   │   └── contacto/route.ts
│   ├── sitemap.ts                  # sitemap dinámico
│   ├── robots.ts
│   └── not-found.tsx
├── components/
│   ├── sections/                   # secciones de la landing (Hero, ValueProp, Parallax, etc.)
│   ├── effects/                    # ParallaxLayer, IngredientExplosion, ScrollReveal, etc.
│   ├── ui/                         # botones, inputs, cards reutilizables
│   └── layout/                     # Nav, Footer, LocaleSwitcher
├── content/
│   ├── es/
│   │   ├── academia/*.mdx
│   │   └── portafolio/*.mdx
│   └── en/
│       ├── academia/*.mdx
│       └── portafolio/*.mdx
├── messages/                       # strings i18n (next-intl)
│   ├── es.json
│   └── en.json
├── lib/
│   ├── seo.ts                      # helpers: generateMetadata, JSON-LD, canonicals
│   ├── i18n.ts
│   └── images.ts                   # mapeo de carpetas cuadradas/verticales/horizontales
├── public/
│   └── images/
│       ├── cuadradas/              # (las sube Vero)
│       ├── verticales/
│       └── horizontales/
├── styles/
│   └── globals.css
├── CLAUDE.md                       # este archivo
├── README.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Regla de oro de carpetas de imágenes:**

- `public/images/cuadradas/` → grids de portafolio, cards, thumbnails, instagram-like
- `public/images/verticales/` → hero mobile, parallax layers, stories, menús
- `public/images/horizontales/` → hero desktop, backgrounds cinematográficos, section dividers

`lib/images.ts` debe exportar helpers que lean estos folders y devuelvan metadata (width/height/blurDataURL) en build time para que los componentes sólo pidan `getHeroImage()` sin acoplarse a nombres de archivo.

---

## 4. Diseño y dirección de arte

**Palabras clave de estilo:** editorial, cinematográfico, apetitoso, premium, "food magazine meets Apple product page". Espacios en blanco generosos. Tipografía con personalidad. La foto es la reina — la UI no compite.

**Paleta (propuesta inicial, validar con Vero):**

- Base oscura: `#0E0B08` (casi negro, ligeramente cálido)
- Base clara: `#FAF7F2` (crema)
- Acento cálido: `#C8563C` (terracota / salsa reducida)
- Acento dorado: `#C89F65` (aceite de oliva dorado, para CTAs premium)
- Neutros: escala de grises cálidos

**Tipografía (propuesta):**

- Display: serif editorial con contraste (ej. _Fraunces_, _Canela_, o _PP Editorial New_)
- Texto: sans humanista legible (ej. _Inter_, _Geist_, o _Söhne_)
- Usar `next/font` con `display: swap` y subsetting. Cero FOUT visible.

**Jerarquía mobile-first NO NEGOCIABLE.** Todo se diseña primero en 375px. Los efectos pesados (3D, partículas) degradan elegantemente en móvil (prefers-reduced-motion y breakpoints).

---

## 5. Efectos visuales requeridos (alma de la landing)

Estos efectos son el diferenciador. Implementarlos bien > implementar muchos.

### 5.1 Parallax multicapa en el Hero

- 3-5 capas: fondo (plato completo desenfocado), mid (ingredientes individuales), foreground (hojas, gotas, humo), tipografía.
- Dirección opuesta entre capas según scroll.
- En móvil: parallax reducido (1-2 capas) o reemplazo por animación de entrada simple. Respeto estricto a `prefers-reduced-motion`.

### 5.2 Explosión de ingredientes (hero secundario o transición de sección)

- Al entrar a la sección (IntersectionObserver), los ingredientes de un plato "estallan" desde el centro y se reagrupan formando el plato final.
- Opción A (preferida si se logra <60kb): Canvas 2D con sprites de PNGs con transparencia de las propias fotos de Vero.
- Opción B: React Three Fiber con planos texturizados + física básica.
- Duración total 1.2-1.8s. Easing `cubic-bezier(0.16, 1, 0.3, 1)` o similar orgánico.
- SIEMPRE un fallback estático (imagen final del plato) si falla el script o hay reduced-motion.

### 5.3 Scroll-driven storytelling

- Secciones tipo "pin" con GSAP ScrollTrigger donde el texto cambia mientras la imagen de fondo hace crossfade entre platos.
- Usado para contar el "por qué una buena foto vende más": estadísticas (search + citar fuente), comparativa antes/después (foto amateur vs. foto profesional de Vero).

### 5.4 Reveals cinematográficos

- Texto que aparece letra por letra o palabra por palabra en headings clave (Framer Motion `staggerChildren`).
- Imágenes con máscara `clip-path` que se expande al entrar en viewport.

### 5.5 Cursor / hover premium (solo desktop)

- Cursor custom sutil que crece sobre imágenes interactivas.
- Hover sobre cards de portafolio: zoom leve + reveal del nombre del cliente + CTA.

### 5.6 Las fotos reales de Vero son el material protagonista de TODOS los efectos

Esta es una regla de producto, no estética: las fotografías profesionales que ya están en `public/images/{cuadradas,verticales,horizontales}/` son el activo más fuerte del proyecto. Los efectos de movimiento, parallax y explosión existen para amplificar esas fotos, nunca para sustituirlas con visual sintético.

- **Parallax (§5.1):** las capas son recortes/máscaras de fotos reales horizontales y verticales, no ilustraciones genéricas ni gradientes.
- **Explosión de ingredientes (§5.2):** los sprites son ingredientes recortados con transparencia desde fotos reales de Vero. Si un ingrediente específico no existe como recorte limpio, generarlo con image-to-image (Gemini Nano Banana, ver §17) tomando la foto real como fuente — preservando color, iluminación y textura del set original.
- **Scroll-driven storytelling (§5.3):** los crossfades encadenan fotos reales. El antes/después usa las fotos auténticas en el lado "después".
- **Reveals (§5.4):** los `clip-path` enmascaran fotos reales — no animamos texto sobre fondos sintéticos cuando hay foto disponible.
- **Hover de cards (§5.5):** todas las cards de portafolio/galería usan fotos reales con zoom sobre el archivo original (sin re-render).

Antes de escribir el markup de cualquier sección: revisar `lib/images.ts` y elegir las fotos de mayor impacto disponibles para ese rol.

**Performance innegociable:**

- Lighthouse Performance mobile ≥ 85, desktop ≥ 95.
- LCP < 2.5s. CLS < 0.1. INP < 200ms.
- Cualquier efecto que baje de estos umbrales se refactoriza o se elimina.

---

## 6. Copywriting y estructura de la landing principal

La landing VENDE. No es un portafolio bonito — es una carta de ventas visual. Aprovecha la autoridad real de Vero (§1.1) como motor de conversión: sus credenciales son prueba social irrefutable y van distribuidas estratégicamente a lo largo del scroll, no apiladas en una sola sección.

Estructura obligatoria (bilingüe ES/EN completa):

1. **Hero** — imagen hero (horizontal desktop / vertical mobile) + headline emocional + subheadline de valor + CTA primario ("Ver paquetes" / "Agendar sesión") + CTA secundario ("Ver portafolio"). **Micro-badge Sony Alpha Partner** visible pero discreto cerca del hero (esquina inferior, o línea sutil bajo el headline tipo "Sony Alpha Partner · Juez Internacional de Fotografía"). Nada de poster corporativo — integrado al diseño editorial.

2. **El problema** — "Tu comida es increíble. Tus fotos no lo cuentan." 2-3 líneas punzantes. Parallax sutil.

3. **Prueba visual (sin palabras)** — grid asimétrico con 6-9 fotos de Vero (mezcla de formatos). Cada una con hover reveal. La foto es el argumento.

4. **Por qué una buena foto vende más** — sección con 3 datos/estadísticas con fuente citada (buscar datos reales: Toast, OpenTable, DoorDash, Uber Eats, estudios académicos — **usar web_search antes de inventar números**). Animación scroll-driven.

5. **Autoridad — "Quién está detrás de la cámara"** — sección dedicada a Vero, no al estilo "About Me" biográfico, sino como prueba de credibilidad comercial. Incluye:
   - Retrato editorial (si Vero lo aporta; si no, composición con una de sus mejores fotos y overlay tipográfico).
   - **+15 años de carrera** en fotografía de alimentos.
   - **Sony Alpha Partner** (logo oficial, con enlace al directorio de Sony si existe).
   - **Juez internacional de fotografía.**
   - **Conferencista y tallerista internacional.**
   - **Obra expuesta en Europa, Estados Unidos y México.**
   - **Producciones con marcas internacionales mezclando fotografía, CGI y AI.**
     Presentación: tarjetas/pills horizontales con íconos mínimos, o línea de tiempo sutil, o lista editorial con tipografía grande. NO logos-wall genérico. La idea: "no estás contratando a alguien que aprendió en YouTube, estás contratando a alguien que juzga a otros fotógrafos".

6. **Foto + CGI + AI — el diferenciador** — sección propia que explica, en lenguaje de cliente (no técnico), por qué combinar fotografía real con CGI y AI le ahorra dinero y le da ventaja:
   - Variantes infinitas de un mismo platillo sin reshoot.
   - Escenarios imposibles (platillos gigantes, ingredientes flotando, estaciones del año cambiando de fondo).
   - Consistencia de marca entre campañas.
   - Producción más rápida para menús estacionales.
     Visual: antes/después o split-screen foto pura → versión aumentada con CGI/AI. Idealmente con assets reales de Vero; si no los hay aún, dejar placeholder marcado `TODO: assets CGI/AI`. Este bloque es un upsell estratégico.

7. **Explosión de ingredientes** — transición cinematográfica que lleva al siguiente bloque (ver §5.2).

8. **Servicios / paquetes** — 3 cards principales + 1 secundaria:
   - **Fotografía profesional** (paquetes por # de platillos / día de shoot / estilismo incluido / opción add-on CGI+AI).
   - **Web + SEO orgánico** (landing como la que están viendo + framework SEO propio).
   - **Membresía Academia** (tipo Skool, mensual — HOW TOs fotografía, estilismo, AI, prompt engineering).
   - Card secundaria: **Talleres y conferencias** (link a página dedicada; no saturar la card principal).
     Cada card con precio "desde $X" o "Solicitar cotización" — validar con Vero.

9. **Para quién es** — restaurantes independientes, cadenas, bares, hoteles, productores, chefs personales, marcas de alimentos empacados. Iconografía + 1 línea cada uno.

10. **Portafolio segmentado (teaser)** — 4-6 tipos de negocio con preview, CTA "Ver todos los casos".

11. **Proceso** — 4-5 pasos del shoot o del proyecto web, con ilustración/foto por paso.

12. **Reconocimientos y menciones** — franja sutil con logos/referencias de: Sony Alpha, publicaciones donde ha salido, marcas con las que ha trabajado, instituciones donde ha sido juez o conferencista. SIN inventar — si no tenemos el dato verificado, se omite el logo. Esta sección va en blanco/neutro, pequeña, tipo "As seen in" editorial. Validar lista con Vero antes de publicar.

13. **Testimonios** — si no hay reales aún, dejar placeholder estructurado y marcar como `TODO: testimonios` en el código. Prioridad de obtención: 2-3 testimonios de clientes reales con foto + nombre + negocio.

14. **FAQ** — 6-8 preguntas (precio, locación, derechos de uso de imágenes, entrega, revisiones, si viaja, si hace CGI/AI por separado, cómo funciona la membresía).

15. **CTA final fuerte** — fondo cinematográfico full-bleed + headline + formulario corto (nombre, negocio, email, mensaje) O botón directo a WhatsApp/Calendly.

16. **Footer** — links, redes, cambio de idioma, aviso de privacidad, términos, créditos de autoría de todas las fotos.

**Distribución de credenciales a lo largo del scroll (no concentrar todo en §5):**

- Hero → micro-mención Sony Alpha Partner + una credencial (ej. "Juez internacional").
- §5 → sección completa de autoridad.
- §6 → "producciones con marcas internacionales en CGI+AI" como contexto del diferenciador.
- §12 → franja de reconocimientos.
- Footer → "Sony Alpha Partner · +15 años · México/Internacional".

Esto evita el anti-patrón de "me presumo en un solo bloque y luego desaparezco". La credibilidad se siente presente toda la página.

**Tono de copy:**

- ES: cercano-profesional, tú no usted, frases cortas, verbos activos, cero relleno corporativo.
- EN: confident, warm, no jargon, American English default.
- **Sobre las credenciales:** confianza tranquila, no autobombo. Mostrar, no gritar. Ejemplos de cómo decirlo bien:
  - ✅ "Sony Alpha Partner. Juez internacional. 15 años fotografiando alimentos."
  - ❌ "¡La mejor fotógrafa de México! ¡Premiada internacionalmente!"
  - ✅ "Obra expuesta en tres continentes. Aquí la ponemos a trabajar para tu menú."
  - ❌ "Reconocida mundialmente por su talento extraordinario."
- Nunca usar "soluciones", "sinergia", "potenciar", "empoderar", "disruptivo", "revolucionario". Prohibido.

---

## 7. SEO — framework del proyecto (reutilizable para futuras landings)

Este proyecto ES el producto "Web + SEO" que Vero vende. El SEO se implementa como una **capa declarativa** reutilizable.

**`lib/seo.ts` debe exportar:**

- `buildMetadata({ locale, path, title, description, image, type })` → retorna objeto `Metadata` de Next con OG, Twitter, canonicals, hreflang alternates ES/EN.
- `buildJsonLd({ type, data })` → genera schema.org (LocalBusiness, Service, Article, FAQPage, BreadcrumbList, ImageObject con `creator` = Vero, **Person con credenciales de Vero**).
- `buildSitemapEntries()` → lee rutas estáticas + MDX dinámico.

**Schema.org `Person` de Vero (obligatorio en home y página de autoridad):**

```
{
  "@type": "Person",
  "name": "Verónica Esqueda",
  "alternateName": "Vero Esqueda",
  "jobTitle": ["Food Photographer", "Food Stylist", "AI Specialist"],
  "description": "...",
  "award": [
    "Sony Alpha Partner (Embajadora)",
    "Juez Internacional de Fotografía"
  ],
  "knowsAbout": ["Food Photography", "Food Styling", "CGI", "AI Image Generation", "Prompt Engineering"],
  "sameAs": [ /* redes sociales verificadas */ ],
  "image": "/og/vero-portrait.jpg"
}
```

No inventar URLs de `sameAs` — pedirlas a Vero antes de publicar.

**Reglas SEO obligatorias:**

1. Cada página define su propio `generateMetadata` — nada de metadata heredada silenciosamente.
2. `<html lang={locale}>` correcto por ruta.
3. Hreflang bidireccional ES↔EN en TODAS las páginas traducidas.
4. `sitemap.xml` y `robots.txt` dinámicos desde `app/sitemap.ts` y `app/robots.ts`.
5. URLs limpias, kebab-case, sin parámetros. Slugs traducidos (`/es/servicios/fotografia`, `/en/services/photography`).
6. Todas las imágenes con `alt` descriptivo bilingüe contextual (no "imagen1.jpg"). `alt` se define junto al contenido, no hardcoded.
7. Core Web Vitals monitoreados (Vercel Analytics o `web-vitals` lib).
8. Schema `ImageObject` en fotos de portafolio con `creator`, `copyrightHolder` = Verónica Esqueda, `license` link al aviso de derechos.
9. Breadcrumbs visibles + JSON-LD en todas las páginas excepto home.
10. `next-sitemap` NO — usar el sitemap nativo de Next 15.

**Keywords semilla (validar con research real al arrancar):**

- ES principales: "fotografía profesional de alimentos", "fotógrafa gastronómica México", "food styling restaurantes", "fotos para menú de restaurante", "fotografía de platillos para redes sociales", "fotógrafa de comida León Guanajuato" (ajustar ubicación según Vero).
- ES autoridad/diferenciador: "fotógrafa Sony Alpha Partner", "juez internacional fotografía gastronómica", "fotografía de alimentos con CGI y AI", "producción híbrida foto CGI AI restaurantes", "taller fotografía de alimentos México".
- EN principales: "food photographer Mexico", "restaurant food photography", "food styling photographer", "menu photography services".
- EN autoridad/diferenciador: "Sony Alpha Partner food photographer", "international food photography judge", "hybrid food photography CGI AI", "AI food photography specialist".

Estos términos de autoridad son low-competition y alto-intent: capturan búsquedas de marcas y productoras que específicamente buscan ese perfil raro.

**Entregable del framework:** un archivo `docs/SEO-FRAMEWORK.md` (crear cuando se implemente `lib/seo.ts`) explicando a Vero cómo replicar la landing para otros clientes.

---

## 8. i18n (ES/EN)

- Librería: `next-intl`.
- `es` es idioma por defecto (mercado principal: México/LATAM).
- Detección: middleware de `next-intl` + preferencia del navegador + persistencia en cookie.
- LocaleSwitcher visible en nav y footer.
- Todo string visible vive en `messages/es.json` y `messages/en.json`. **Cero strings hardcoded en componentes.**
- MDX de `content/es/` y `content/en/` se resuelve por locale en tiempo de build.
- Slugs también traducidos (`portafolio` ↔ `portfolio`, `servicios` ↔ `services`, `academia` ↔ `academy`).

---

## 9. Derechos, créditos y marcas de terceros

### 9.1 Fotografías de Vero

- **Todas las fotos en `public/images/` son propiedad de Verónica Esqueda.** Ella es la autora y tiene los derechos.
- En el footer de cada página: "© [año] Verónica Esqueda. Todas las fotografías son obra de la autora."
- JSON-LD `ImageObject` refleja autoría (`creator`, `copyrightHolder`, `copyrightNotice`).
- Meta `og:image` siempre con créditos en alt.
- NO usar stock de terceros sin validar. Si se necesita un asset genérico (icono, ilustración), usar sólo fuentes con licencia clara (Lucide icons, Heroicons, etc.) y documentarlo.

### 9.2 Sony Alpha Partner

- Vero es **Embajadora Sony Alpha Partner vigente.** Puede usarse el badge/logo oficial respetando guidelines de marca de Sony (no distorsionar, no alterar color, no colocar sobre fondos conflictivos, mantener área de respeto).
- Descargar assets oficiales del programa Sony Alpha Partner — no recrear el logo.
- Acompañar siempre con texto "Sony Alpha Partner" o "Embajadora Sony Alpha" para evitar confusión con simple uso del logo.
- Si en algún momento Vero deja de ser partner, remover inmediatamente todas las menciones. Dejar componente `<SonyAlphaBadge />` con un feature flag `NEXT_PUBLIC_SONY_PARTNER_ACTIVE` para poder apagarlo con una sola variable de entorno.

### 9.3 Marcas y clientes internacionales

- Al listar marcas con las que Vero ha colaborado (§6 sección 12 "Reconocimientos"), **sólo incluir aquellas para las cuales Vero tenga derecho de uso de nombre/logo en materiales promocionales propios.** Muchos contratos de producción prohíben esto.
- Antes de publicar cualquier logo de marca internacional, validar con Vero caso por caso.
- Alternativa segura: mencionar los sectores/tipos de marca sin logos ("colaboraciones con marcas internacionales de bebidas, retail gourmet y cadenas hoteleras") hasta confirmar permisos.

### 9.4 Obra expuesta

- Las exposiciones en Europa, Estados Unidos y México son parte del CV artístico de Vero y pueden mencionarse libremente. Si se citan nombres de galerías, museos o ferias, validar con Vero que estén correctos (nombre exacto, ciudad, año) antes de publicar. NO inventar nombres de instituciones.

### 9.5 Imágenes generadas con AI (uso interno del sitio)

- **Boundary físico:** las fotos auténticas de Vero viven en `public/images/{cuadradas,verticales,horizontales}/`. Las imágenes generadas con AI (OpenAI Images, Gemini Nano Banana) viven exclusivamente en `public/images/generated/<propósito>/`. Nunca mezclar carpetas.
- **Sidecar JSON obligatorio** por cada imagen generada: `<archivo>.meta.json` con `prompt`, `model`, `source_image` (si fue image-to-image), `created_at`, `purpose`. Se commitea junto a la imagen.
- **Atribución honesta:** en `alt`, `figcaption` o JSON-LD nunca se atribuye una imagen generada con AI a Vero como autora fotográfica. Si la generada se basa en dirección/concepto de Vero, el crédito apropiado es "Dirección creativa: Verónica Esqueda · Render generativo" o similar. Esto protege la reputación artística de Vero.
- **Uso permitido:** sprites de ingredientes para la explosión (recortes con transparencia derivados de fotos reales), placeholders del bloque Foto+CGI+AI hasta tener assets reales de campañas de Vero, elementos auxiliares (humo, salpicaduras, vapor) cuando no existan en el set fotográfico.
- **Uso prohibido:** generar "fotos de platillos" presentadas como portafolio de Vero. El portafolio es exclusivamente obra real fotografiada por ella.

---

## 10. Formulario de contacto y captura de leads

- Campos mínimos: nombre, tipo de negocio (select: restaurante / bar / hotel / cadena / productor / chef / otro), email, ciudad, presupuesto aproximado (rangos), mensaje.
- Validación Zod en cliente y en server action.
- Anti-spam: honeypot + rate limit simple por IP en la route handler.
- Envío: Resend API (configurable). Fallback a `mailto:` si falla.
- Confirmación on-screen + email automático de gracias en el idioma del visitante.
- Evento de analytics `lead_submitted` con tipo de negocio.

---

## 11. Futuro cercano (arquitectura preparada, no implementar aún)

Estos items NO se construyen en la primera fase pero el código debe dejar ganchos/abstracciones para agregarlos sin refactor grande:

- **Portafolio segmentado:** carpeta `content/[locale]/portafolio/*.mdx` + ruta dinámica ya prevista arriba.
- **Academia / HOW TOs:** igual, MDX + ruta dinámica.
- **Membresía estilo Skool:** probable integración con Outseta, MemberSpace, Whop o construcción custom con Stripe + contenido gated. Dejar `app/[locale]/miembros/` reservado y auth abstraída.
- **Multi-cliente:** la misma base de código debe permitir generar landings por cliente de Vero. Pensar en un posible `app/clientes/[slug]/` o un monorepo en fase 3 — documentar decisión cuando se tome.

---

## 12. Convenciones de código

- **Componentes:** PascalCase, un componente por archivo, `index.ts` barrel sólo en carpetas de UI reutilizable.
- **Server Components por defecto.** `'use client'` sólo cuando sea estrictamente necesario (hooks, event handlers, Framer Motion, Three.js).
- **Props tipados con interface**, no type aliases para props.
- **Tailwind:** usar `clsx` o `tailwind-merge` para condicionales. Zero `style={{}}` inline salvo valores dinámicos de animación.
- **Imports:** alias `@/` a la raíz. Orden: react → next → libs externas → `@/` → relativos → tipos.
- **Commits:** conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `perf:`, `refactor:`).
- **Branches:** `main` protegida. Feature branches `feat/nombre-corto`.
- **Linting:** ESLint + Prettier + Tailwind plugin. Correr en pre-commit con Husky + lint-staged.
- **Tests:** Playwright para E2E de la landing (al menos: carga home ES, carga home EN, envío de formulario, cambio de locale). Vitest para utils puros (`lib/seo.ts`).

---

## 13. Accesibilidad

- WCAG AA mínimo.
- Focus visible siempre. No remover `outline` sin reemplazo.
- `prefers-reduced-motion` respetado en TODOS los efectos.
- Contraste de texto ≥ 4.5:1 (validar paleta final).
- Navegación completa por teclado.
- `alt` real en imágenes, `aria-label` en íconos interactivos, skip links.
- Video/audio (si se agregan): captions.

---

## 14. Workflow esperado con Claude Code

Cuando pidamos una tarea, Claude Code debe:

1. **Confirmar entendimiento brevemente** si la tarea es ambigua (máx 1-2 preguntas). Si es clara, ejecutar.
2. **Leer este CLAUDE.md y los archivos relevantes** antes de escribir código.
3. **Buscar antes de asumir:** usar web_search para datos/precios/estadísticas reales cuando el copy lo requiera. No inventar cifras.
4. **Proponer diff pequeño y enfocado.** Preferir muchos commits pequeños a un mega-PR.
5. **Explicar decisiones no obvias** en el mensaje de commit o en comentarios del código (solo cuando aporten — nada de comentarios obvios).
6. **Performance check mental** antes de agregar librerías pesadas. Si el bundle crece >20kb gzip, justificar.
7. **Siempre mobile-first.** Probar mental o realmente en 375px antes de desktop.
8. **Cuando termine una feature:** correr `pnpm lint`, `pnpm typecheck`, `pnpm build` y reportar resultados.

---

## 15. Definición de "listo" para la landing v1

- [ ] Navegación funcional ES/EN con switcher
- [ ] Home completa con las 16 secciones listadas en §6
- [ ] Sección de autoridad (§6.5) implementada con credenciales reales de Vero
- [ ] Bloque "Foto + CGI + AI" (§6.6) implementado (con placeholder marcado si faltan assets)
- [ ] Micro-badge Sony Alpha Partner en hero + componente `<SonyAlphaBadge />` con feature flag
- [ ] Schema.org `Person` con credenciales de Vero renderizado en home y página de autoridad
- [ ] Parallax multicapa en hero (desktop + fallback móvil)
- [ ] Explosión de ingredientes implementada con fallback estático
- [ ] Todas las fotos de Vero integradas y optimizadas (`next/image`, AVIF/WebP, blurDataURL)
- [ ] Formulario de contacto funcional + email de confirmación
- [ ] `lib/seo.ts` implementado y documentado en `docs/SEO-FRAMEWORK.md`
- [ ] Sitemap + robots dinámicos
- [ ] Hreflang correcto en todas las páginas
- [ ] Lighthouse mobile ≥ 85, desktop ≥ 95
- [ ] Core Web Vitals dentro de umbrales
- [ ] WCAG AA validado
- [ ] `prefers-reduced-motion` respetado
- [ ] Deploy en Vercel funcionando con dominio custom
- [ ] README con instrucciones de setup local, cómo agregar una nueva landing, y cómo subir/rotar credenciales (Sony badge, logos de marcas)

---

## 17. Herramientas de generación de imagen con AI (build/dev-time)

Estas herramientas son **internas del proceso de desarrollo** — se invocan desde scripts en `scripts/ai/`. Ningún componente de la web hace llamadas a estas APIs en runtime desde el cliente. Cero exposición de claves al browser.

### 17.1 Proveedores

- **OpenAI Images** (`openai` SDK, modelo por defecto `gpt-image-1`): generación de alta calidad text-to-image, edición/inpainting con máscara fina. Usado para sprites finales que requieren control estricto.
- **Google Gemini 2.5 Flash Image / "Nano Banana"** (`@google/genai`, modelo `gemini-2.5-flash-image-preview`): iteración rápida y económica, image-to-image excelente, fuerte preservando identidad de la foto fuente. Usado para variantes y para extraer/transformar elementos a partir de fotos reales de Vero.

Heurística: empezar exploración con Gemini Nano Banana (más rápido y barato, mejor para image-to-image desde fotos reales). Pasar a OpenAI cuando se necesite calidad final, máscara fina o inpainting controlado.

### 17.2 Variables de entorno requeridas

Definidas en `.env.example` (commiteado, sin valores) y `.env.local` (gitignored, con valores reales):

```
OPENAI_API_KEY=
GOOGLE_GEMINI_API_KEY=
OPENAI_IMAGE_MODEL=gpt-image-1
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image-preview
```

Las claves NUNCA se exponen al cliente — no llevan prefijo `NEXT_PUBLIC_`. Cualquier llamada a estos proveedores ocurre en scripts CLI o, como excepción justificada, en server actions con rate-limit estricto.

### 17.3 Casos de uso autorizados

1. **Sprites de la explosión (§5.2):** recortar ingredientes individuales (jitomate, hojas de albahaca, gotas de aceite, salpicaduras) con fondo transparente desde las fotos reales de Vero. Image-to-image con Gemini para preservar iluminación; OpenAI para máscaras finas si hace falta.
2. **Placeholders del bloque Foto+CGI+AI (§6.6):** mientras llegan los assets reales de campañas de Vero, generar variantes ilustrativas claramente marcadas como muestra del proceso (no como portafolio terminado).
3. **Elementos auxiliares (§5.1, §5.4):** humo, vapor, partículas, salpicaduras — cuando no existan en el set fotográfico.
4. **PROHIBIDO:** usar AI para "mejorar" o re-renderizar las fotos auténticas de Vero. Ese set es intocable. Tampoco generar fotos de platillos completos para presentar como portafolio.

### 17.4 Workflow operativo

1. Nueva utilidad en `scripts/ai/<nombre>.ts` (ejecutable con `pnpm tsx`).
2. La utilidad lee inputs de `public/images/...` o de prompts hardcodeados, llama al proveedor, y escribe a `public/images/generated/<propósito>/<archivo>.{png,webp}` + sidecar `<archivo>.meta.json`.
3. Loguear costo aproximado por corrida en consola.
4. El output se commitea como cualquier otro asset estático — el sitio no regenera en runtime.

### 17.5 Boundaries de derechos

Ver §9.5. Resumen: las generadas viven separadas, llevan sidecar de procedencia y NUNCA se atribuyen como obra fotográfica de Vero.

---

## 18. Contacto del proyecto

- **Cliente / Autora:** Verónica Esqueda
- **Ubicación base:** Ciudad de México, México (proyecto digital con alcance global).
- **Dev lead / Operador de Claude Code:** Charles (Apps Camelot)
- **Repositorio:** https://github.com/carlosserafin/veroesqueda
- **Dominio de producción objetivo:** https://veroesqueda.com

Última actualización de este archivo: al crear el proyecto. Mantenerlo vivo — cuando algo cambie (stack, decisión de diseño, nuevo módulo), actualizar aquí antes de tocar código.
