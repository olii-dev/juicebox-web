# Juicebox — Landing Page

The landing page for [Juicebox](https://github.com/olii-dev/Juicebox), a glossy
native macOS retro emulator. Built in deliberately Frutiger Aero style to match
the app: a sky backdrop with drifting bubbles, glassmorphic surfaces, and a
hand-drawn gloss sweep on every panel.

## Stack

Plain HTML, CSS and vanilla JS — no framework, no build step. Same shape as the
stratus-web and lattice-site pages.

```
index.html   # structure
styles.css   # all the glass, gloss and sky
script.js    # bubbles + waitlist form
assets/      # the Juicebox app icon
```

## Run locally

Just open `index.html` in a browser. Or serve it for hot-reload convenience:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Static, so any host works. GitHub Pages is the intended target — enable it on
the `main` branch in repo Settings → Pages.

## Notes

- The waitlist form validates client-side and shows a thank-you, but has no
  backend yet (there's a `TODO` in `script.js` marking the spot to wire a real
  endpoint).
- All colours are lifted from the app's `Sky.swift` and `Flavor.swift` so the
  page and the product read as one design system.
- Respects `prefers-reduced-motion` — bubbles and the floating icon go still.
