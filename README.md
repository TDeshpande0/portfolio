# Tanvi Deshpande — Portfolio

A React + Vite portfolio site, scaffolded from the original `Portfolio Artifact.jsx` proof of concept (preserved unmodified in `reference/` and now living at `src/App.jsx`).

## Stack

- **React 18** + **Vite** — build tooling (chosen over Create React App, which is deprecated)
- **Tailwind CSS** — configured and ready to use for any new components you add; the existing homepage/case-study UI uses its own hand-written CSS (injected via a `<style>` tag in `src/App.jsx`) and does not depend on Tailwind
- **Headless UI** (`@headlessui/react`) — open-source, unstyled accessible components (menus, dialogs, tabs, etc.), installed and ready for when you add new interactive UI
- **lucide-react** — icon set already used by the artifact

## Project structure

```
.
├── index.html              # Vite entry HTML
├── public/
│   └── favicon.svg
├── reference/
│   └── Portfolio Artifact.jsx   # original artifact file, untouched
├── src/
│   ├── App.jsx              # the artifact content — homepage + case study + all styles
│   ├── main.jsx             # React root / mounts <App />
│   └── index.css            # Tailwind directives
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Notes for future development

- `src/App.jsx` is the original artifact content, unchanged. It's a self-contained component: the `Home` and `DeltaCaseStudy` pages, all supporting SVG illustrations (`Lily`, `HibiscusFlower`, `BeachScene`, `PlaneMark`), and all CSS (as a template literal injected via `<style>{CSS}</style>`).
- To add new sections/pages, either extend `src/App.jsx` directly, or create new components under `src/components/` and import them in — Tailwind utility classes and Headless UI components are available for anything new you build.
- Fonts (Fraunces, Space Mono, Work Sans) are loaded via `@import` inside the CSS template literal in `App.jsx` — no extra setup needed.
- Nothing in this project has been deployed or pushed anywhere; it's set up for local development only. When you're ready, this is a standard Vite app and deploys to Vercel with zero configuration (`vercel.com/new` → import the GitHub repo).
