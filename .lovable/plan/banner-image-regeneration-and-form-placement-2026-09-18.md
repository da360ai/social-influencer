# Banner image regeneration and form placement

## Goal
Match the uploaded banner reference more closely: the photograph stays clearly visible on the left, runs continuously to the right edge, and contains the booking form within its bounds.

## Changes
- Regenerate the banner photograph as a wide composition designed for this exact layout.
- Place the creator and key visual details on the left side so the form does not hide them.
- Keep the right side visually calm and suitable behind the booking form, with enough image coverage to reach the form’s outer right edge.
- Replace the curved/arched image treatment with a rectangular image using the existing 20px corner radius.
- Keep the image left-aligned at the established start point and make it fill the full right-hand banner area.
- Keep the booking form floating inside the image at the far right, with a balanced inset from the image boundary.
- Preserve every detail, word, field, price, button, and interaction inside the booking form.
- Keep the existing stacked mobile treatment readable without forcing the desktop overlap onto small screens.

## Validation
- Confirm the subject remains visible and is not obscured by the form.
- Confirm the photograph reaches the right edge behind the form and has no arch or curved top.
- Confirm the form sits fully inside the image and all its existing content remains unchanged.
- Check desktop and mobile layouts for clipping, overlap, and readability.

## Technical notes
- Generate one new wide banner asset with composition-aware subject placement.
- Update only the banner image source and its image/form positioning wrappers.
