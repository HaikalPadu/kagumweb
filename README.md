# Kagum Advance local website

This is the first localhost redesign for Kagum Academy. It keeps the current public information and gives the site a cleaner, responsive structure. The project now uses React, TypeScript, Vite, Tailwind CSS v4, and a shadcn-compatible `/components/ui` structure.

## Run locally

From this folder, install dependencies once and start the React development server:

```powershell
npm install
npm run dev
```

Then open the URL shown by Vite, normally http://localhost:5173.

The animated tabs component is at [components/ui/tabs.tsx](components/ui/tabs.tsx), with its CSS module and motion tokens in `components/ui/tabs-utils/`. This location follows the shadcn convention so components can be imported consistently with `@/components/ui/...`.

The booking form is currently a local prototype. It displays a confirmation message but does not send email until a real backend or form service is connected.

For the current design, page structure, brand assets, collaboration logos, animation behavior and known limitations, see [KAGUM_ADVANCE_WEBSITE_IMPLEMENTATION.md](KAGUM_ADVANCE_WEBSITE_IMPLEMENTATION.md).
