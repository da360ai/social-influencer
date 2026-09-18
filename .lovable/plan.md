# Testimonial video pop-out

## Goal
Make the exact testimonial video a visitor clicks open in a focused overlay, while leaving the existing card layout and content unchanged.

## Changes
- Track the selected testimonial in the page state.
- Make each testimonial video preview open its matching video when clicked.
- Show the selected video in a centered, enlarged overlay with the person’s name, darkened background, playback controls, and automatic playback.
- Stop playback and clear the selection when the overlay is closed.
- Preserve the existing fanned cards, video order, names, thumbnails, and all other page sections.

## Verification
- Click multiple testimonial cards and confirm each opens its own matching video.
- Confirm close controls and the Escape key dismiss the overlay.
- Check the interaction on desktop and mobile without overlap or layout shifts.
