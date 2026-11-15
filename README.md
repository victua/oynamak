# Oynamak Sports Group

Next.js website and operations portal for Oynamak Sports Group Ltd.

```bash
npm install
npm run dev     # http://localhost:9002
npm run build
```

## Content and images

- Site text, navigation and solutions: `src/lib/site-config.ts`
- Photography: add WebP files under `public/images/` and register them in `src/lib/site-images.ts`. Until a photo is registered, branded artwork is shown (no stock or placeholder photos load).
- Colours: CSS variables in `src/app/globals.css`.
