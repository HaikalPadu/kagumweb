# Website image enhancement

The earlier uploaded photos and career posters have separate enhanced versions under `public/assets/enhanced/`. Original JPGs remain in `public/assets/`.

## Assets

- `gambarmain`: homepage and About banner
- `gambarhrdctrainingprovider`: training provider service and training banner
- `gambardigitalservices`: digital marketing service
- `gambaritconsultant`: IT Consultant
- `gambarsupplyandtrading`: Supply & Trading
- `gambarsilat`: Akademi ProSilat
- `gambarhrdcclaimmable`: homepage HRDC claimable programmes photograph
- `gambarcareer`: Career banner
- `gambarposter`: general hiring poster
- `gambarse`: Software Engineering poster
- `gambardm`: Digital Marketing poster
- `gambaradmin`: Administration poster

## Method

Built-in image enhancement tool, with each image supplied as an edit target. Prompt: Conservative image restoration only; improve clarity, gentle sharpness and noise reduction with natural colours. Preserve original composition, people and identity, clothing, expressions, objects, branding, wording and aspect ratio. No redesign, new people, beauty retouching or invented details.

AI restoration reconstructs details. Originals remain the reference for exact faces, signage and poster fine print. Enhancement is not a substitute for the original high-resolution photograph or editable poster artwork.

Website references are managed in `src/data/content.ts` and `src/pages/Career.tsx`. The three brand posters are documented separately in `BRAND_POSTERS.md`.
