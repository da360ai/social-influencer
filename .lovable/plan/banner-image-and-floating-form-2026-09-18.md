# Banner image and floating form

## Goal
Rework only the first banner’s layout so the existing image becomes the full-height visual background from its current left starting point through the right edge, while the unchanged booking form floats above it at the far right.

## Changes
- Keep the left headline, supporting copy, workshop details, prices, buttons, and social proof exactly as they are.
- Keep the image’s left edge aligned to its current desktop starting point; remove the separate narrow image-column treatment.
- Extend the image behind the full right-hand area, including behind the booking form, without adding the current extra right-side gap.
- Make the image fill the banner’s available height and apply a consistent 20px corner radius.
- Position the existing booking form above the image at the right edge with sufficient inset for the 20px rounded boundary; do not change any form text, fields, controls, pricing, or visual details.
- Preserve a clean stacked layout on smaller screens so the content and form remain readable without overlap.

## Validation
- Check the banner at desktop and mobile widths for full-height image coverage, correct left alignment, a flush right edge, and no clipping or overlap.
- Confirm the form’s content and behavior remain unchanged.

## Technical notes
- Restructure only the banner grid wrappers and positioning classes in the workshop page.
- Use a shared right-side image layer and place the form above it with stacking order rather than duplicating content.
