# Brand posters

The homepage Our brands section displays the Academy, Digital and Supplies posters in full, with links to the large version and original upload.

Assets are stored in `public/assets/brands/`, with `-original.png` and `-enhanced.png` versions for each brand. Update poster paths in `src/data/content.ts`.

Enhancement used the built-in image tool with the following prompt for each poster (substituting the brand name):

> Enhance resolution, clarity and edge sharpness only. Preserve the entire exact poster composition, every word, number, logo, client mark, QR code and photograph with no additions, deletions or redesign. Preserve portrait aspect ratio. Reduce blur gently, upscale to a high-resolution portrait, natural photograph detail without invented faces or text.

AI enhancement can reconstruct small details. The original upload remains available for checking client marks, fine print and QR codes. Main poster text was visually reviewed; QR scan validity has not been verified.
