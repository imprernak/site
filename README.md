# Prerna: The Muse

A cinematic, editorial personal site built with React, Vite, Tailwind CSS v4, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

Output goes to `dist/`.

## Notes

- Hero background video is loaded from the CloudFront URL provided in the brief.
- The BTS/Jung Kook section intentionally does not include official promotional
  artwork (copyright). It's ready for your own photos — drop images into
  `src/assets/bts/` and reference them in `src/components/BTS.jsx`.
- Artwork gallery pulls every file in `src/assets/artwork/` automatically —
  add or remove images there and the gallery updates.
- Candid photos live in `src/assets/candid/`.
- Fonts: Helvetica Now Text (as specified) for body copy, Fraunces (an
  editorial serif) for display headlines.
