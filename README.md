# CLICON

Electronics e-commerce frontend built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Zustand and TanStack Query.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Notes

- Data is mocked in `src/services/mockData.ts`. `productService`, `orderService` and `userService` return it
  with a short delay. Swap them for `api.get(...)` calls (see `src/services/api.ts`) when your backend is ready.
- Auth pages and checkout simulate success. Replace the `TODO` calls with real endpoints.
- Product images in `public/assets/products` are SVG placeholders. Drop in real images and update the paths in `mockData.ts`.
- Cart and wishlist persist in `localStorage` through Zustand `persist`.

## CI / CD

- `.github/workflows/ci.yml` runs lint, typecheck and build on every push and pull request to `main`.
- `.github/workflows/deploy-vercel.yml` (optional) deploys to Vercel after CI passes. It needs the secrets
  `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`. Delete the file if you deploy another way.
