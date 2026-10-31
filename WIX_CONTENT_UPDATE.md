# Wix content update — 30 October 2026

Source pages: `/services-9` and `/about-3` on https://kagumadvance.wixsite.com/kagum-academy-4

The Digital Marketing detail page now includes the original welcome, impact figures, benefits, service starting prices, Bronze/Silver/Gold descriptions and prices, 10/20/30-post descriptions and prices, application form and contact details. Package copy is stored in `src/data/wix-copy.ts`.

About now includes the Wix welcome, Academy logo, company description (including original spelling), Why Kagum text, mission, vision, eight impact metrics, contact details, main address and branch address.

Career contains one poster slot. Add your image as `public/assets/career-poster.jpg`, or edit `careerPoster` in `src/pages/Career.tsx` to use another filename. The image displays at its natural proportions. Until the file exists, a portrait placeholder is shown.

Forms remain local prototypes and do not transmit applications. The application form explains this after submission.

Verification: production build passed; Digital Marketing page checked in the local browser.
