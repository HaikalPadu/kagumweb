# Kagum Advance Website â€” Local Implementation Notes

**Company:** Kagum Advance Sdn. Bhd.  
**Website:** `kagumadvance.com`  
**Local preview:** `http://localhost:5173/`  
**Original reference:** [Kagum Academy Wix website](https://kagumadvance.wixsite.com/kagum-academy-4)  
**Last updated:** 27 October 2026

## Version 2 redesign (27 October 2026)

The site was fully redesigned and restructured:

- **Visual direction:** bold corporate. White background, Kagum red `#c8102e`, navy ink `#0f172a`, full-bleed photography, Plus Jakarta Sans headings and Inter body text.
- **Routing:** real URLs using hash routes (`#/`, `#/services`, `#/services/:id`, `#/training`, `#/about`, `#/career`, `#/contact`) and a 404 page. Works on any static host.
- **Structure:**
  - `src/data/content.ts`: all editable content (services, courses, stats, partners, roles, contact details, image URLs).
  - `src/router.tsx`: hash router.
  - `src/components/Layout.tsx`: top bar, sticky header, mobile menu and footer.
  - `src/components/ui-kit.tsx`: shared buttons, section titles, page banners and the CTA band.
  - `src/pages/`: Home, Services (with per-service detail pages), Training, About, Career and Contact.
- **New features:** a detail page for each service, an "All courses" view grouped by training pillar with search, a Contact form that opens a pre-filled email to `info@kagum.co`, and a Google Maps embed.
- **Backups:** the previous version is saved in `legacy/App.v1.tsx` and `legacy/index.v1.css`. The old `components/ui/*` files are no longer used.
- **Logos** were copied to `public/assets/` so they are included in production builds.
## Purpose

This project is the first local redesign of the former Kagum Academy Wix website. The current information is intentionally preserved while the layout, visual hierarchy, responsiveness and interaction design are improved. Photos and final business content can be replaced later without changing the overall structure.

## Current website structure

The local website uses a single-page React application with page-state navigation. The main sections are:

- **Home** â€” brand introduction, capability statement, services overview, statistics, learning highlights and collaborations.
- **Services** â€” HRDC Training Provider, Digital Marketing Services, IT Consultant, Supply & Trading and Akademi ProSilat.
- **Training Provider** â€” searchable course catalogue organised by training pillar.
- **About** â€” company background, mission, vision and impact statistics.
- **Career** â€” current role categories and recruitment enquiry CTA.
- **Contact** â€” email, phone, addresses and enquiry form.

## Homepage direction

The homepage now follows a premium editorial / capability-lab direction inspired by modern Apple-style websites:

- Large, concise headline: **â€œMake room for whatâ€™s next.â€**
- Warm ivory background with Kagum red and deep charcoal accents.
- Strong typography contrast using DM Sans for body copy and Manrope for display headlines.
- Rounded cards, generous whitespace and restrained shadows.
- Clear CTA buttons for services and training.
- Responsive layout for desktop, tablet and mobile screens.

The supplied agency hero component was adapted into a Kagum-specific component at:

- `components/ui/hero-01.tsx`

The demo agency branding and unrelated sample copy were not used. The hero uses Kagumâ€™s own Academy, Digital and Supplies brand assets.

## Collaboration and client logos

The Wix website carousel contains **30 official partner & client logos** across 5 paginated slides (6 logos per slide):

1. HRDC Training
2. HRD Corp Claimable
3. Majlis Amanah Rakyat (MARA)
4. Dewan Perniagaan Melayu Malaysia (DPMM)
5. Kementerian Pembangunan Usahawan (KUSKOP)
6. Khazanah Nasional
7. UCAM
8. UTHM
9. UniKL
10. UiTM
11. UTeM
12. POLYCC
13. EduCity
14. UniSHAMS
15. MAAHAD
16. Akademi ProSilat
17. Universiti Geomatika
18. FSKTM
19. NAWAL
20. TEKUN Nasional
21. AR Mechatronics
22. CWAL
23. Sakses
24. Kolej RISDA
25. PERNAS
26. JELITA
27. K-Youth
28. INSKEN
29. AIINTEX
30. FPTV

These logos are saved locally under:
`public/assets/collaborations/`

They are displayed in the homepage collaboration marquee. The animation is deliberately slow at **180 seconds per loop** so it feels like subtle ambient movement rather than a fast ticker. The logos are grayscale by default and become full color on hover. Reduced-motion users receive the browserâ€™s reduced-animation behavior.

## Brand assets

Existing local assets include:

- `assets/kagum-academy-logo.png`
- `assets/kagum-digital-logo.png`
- `assets/kagum-supplies-logo.png`

These are used in the header, footer, hero composition and brand cluster.

## Technology

The local implementation uses:

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- `tw-animate-css`
- `lucide-react`
- Motion-based carousel component
- shadcn-compatible component location: `components/ui/`

Important UI files include:

- `src/App.tsx` â€” page structure, navigation state and content.
- `src/index.css` â€” global styling, typography, form styles and marquee animation.
- `components/ui/hero-01.tsx` â€” Kagum homepage hero and collaboration marquee.
- `components/ui/polaroid-line-carousel.tsx` â€” learning highlights carousel.
- `components/ui/tabs.tsx` â€” reusable animated tabs component.

## Current interactions

- Desktop and mobile navigation.
- Service cards navigate to the Services section.
- Training catalogue filtering by pillar and search text.
- Homepage learning carousel with arrows, drag interaction and autoplay.
- Collaboration logo marquee.
- Contact enquiry form confirmation state.
- External social links for Facebook, Instagram and LinkedIn.

## Prototype limitations

The following features are visual/local prototypes and still need a production service:

- Contact form opens the visitor's email app with a pre-filled enquiry to `info@kagum.co` (mailto). A server-side form service is still recommended for production.
- Online booking is not connected to a booking provider.
- Google Maps is embedded on the Contact page using the Johor Bahru address; the exact office pin still needs confirmation.
- Course and company content is currently hard-coded in `src/App.tsx`.
- Some homepage imagery still uses remote Pexels image URLs and should later be replaced with approved Kagum photography.

## Run the project

From the project folder:

```powershell
npm install
npm run dev
```

Open `http://localhost:5173/` in a browser.

To verify a production build:

```powershell
npm run build
```

The build was last verified successfully after the collaboration logo animation update.

## Next recommended updates

1. Replace temporary photography with approved Kagum images.
2. Confirm the correct official logo files and brand color values.
3. Connect the contact form to Kagumâ€™s email or CRM workflow.
4. Add the Google Maps embed and confirm the exact office pin.
5. Connect online booking for training enquiries.
6. Move editable courses, services and testimonials into a CMS or JSON data source.
7. Add the final TikTok link and any missing social channels.

