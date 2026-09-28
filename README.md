# CapLab — Vanilla JS Commerce State Demo

CapLab modernizes the original 2023 cap-shop exercise into a small, framework-free commerce-state demo.

## What changed

The original project had placeholder links, Lorem Ipsum, fake forms, external font/icon dependencies, absolute asset paths, no tests or CI, and a broken color-selector implementation caused by conflicting identifiers.

The maintained version focuses on **state management in vanilla JavaScript**.

## Features

- data-driven product catalog
- product color configurator
- persistent selected product
- favorites
- cart with quantity editing
- live subtotal calculation
- product search
- favorites-only filter
- cart drawer
- localStorage persistence
- accessible mobile navigation
- local-only demo forms
- responsive CSS
- reduced-motion support
- zero runtime dependencies

## Architecture

```text
products.js
   │
   ▼
store.js  ← pure commerce logic
   │
   ├── cart
   ├── favorites
   ├── selection
   ├── filtering
   └── totals
   │
   ▼
persistence.js
   │
   ▼
main.js
   │
   ▼
DOM
```

## Tests

```bash
npm test
```

Coverage includes cart quantities, subtotal math, favorites, and catalog filtering.

Run the full quality gate:

```bash
npm run check
```

## Local development

No package installation is required.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

Enable **Settings → Pages → Source → GitHub Actions**, then run **Actions → Deploy Pages → Run workflow**.

## Scope

This is a front-end portfolio demo. It does not process payments, submit contact messages, or provide a production checkout backend.

## License

MIT.
