# FloriClean — Design direction

## Purpose
FloriClean is a Portuguese-Brazilian marketing and lead-generation page for residential, commercial and post-renovation cleaning in Florianópolis. The primary user journey is service discovery → clear scope → WhatsApp quotation.

## Identity
- **Positioning:** calm, immaculate, approachable local service, without fake reviews, fabricated certification, invented prices or exaggerated claims.
- **Aesthetic:** editorial domestic photography, softly rounded surfaces, structured clean layouts and generous breathing room. Avoid generic glowing SaaS gradients.
- **Signature:** offset mint backing behind the hero's large interior photograph, combined with an oversized, concise headline.
- **Type:** Manrope for display/headlines, DM Sans for body, labels and functional controls; safe system fallback.
- **Palette:** deep forest `#103F42`, ocean teal `#087E70`, highlight `#138C79`, mint `#D7F3E7`, warm white `#FBFCFA`, border `#DAE8DF`, ink `#162D32`.
- **Runtime source:** CSS variables under `src/index.css`; established Tailwind utility colors in `src/App.tsx` predate this contract. When consolidating components, move literal values to tokens rather than creating additional independent copies.

## User experience
- Target: mobile first, down to 320px; desktop max width 7xl.
- Navigation: descriptive anchors, sticky header and mobile menu. Persistent mobile contact CTA must not cover form content.
- Conversion: quotation form covers service type, district, property type, frequency, room/bathroom count and cleaning products. User explicitly confirms WhatsApp send; no silent submission or backend persistence.
- Form failures: inline text feedback in pt-BR, `aria-invalid`, first-error focus; preserve entered values.
- Accessibility: semantic sections, keyboard access and visible focus, optional reduced motion, descriptive alt text, unhidden scrollbars.
- SEO: semantic text in pt-BR, existing metadata, canonical URL and local schema. No hidden keyword stuffing.

## Verification
Run `npm install && npm run build`; inspect mobile 320px/375px, tablet 768px and desktop 1440px; test keyboard menu, disclosure FAQ, form empty/invalid/valid, WhatsApp handoff, links, images and reduced-motion mode. Do not claim a production pass without evidence.
