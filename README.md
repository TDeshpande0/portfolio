# Tanvi Deshpande — Portfolio

A React + Vite portfolio site, built from the original `Portfolio Artifact.jsx` proof of concept (preserved unmodified in `reference/`).

## Stack

- **React 18** + **Vite** — build tooling
- **React Router** — page routes (each case study has its own URL)
- **Plain CSS files** — each component has a stylesheet next to it; site-wide tokens live in `src/styles/base.css`
- **Tailwind CSS** — configured and available for new components (the existing UI doesn't depend on it)
- **Headless UI** — unstyled accessible components (menus, dialogs, tabs), ready for new interactive UI
- **lucide-react** — icons
- **Prettier** — formatting (`npm run format`)

## Project structure

```
src/
├── main.jsx                 # mounts the app inside the router
├── App.jsx                  # route table: which page renders at which URL
├── routes.js                # URL paths, shared by App.jsx and the content files
├── index.css                # Tailwind directives
├── styles/
│   └── base.css             # colour tokens, resets, shared layout (section, footer, headings)
├── data/                    # ✏️  editable site content
│   ├── home.js              # hero text, ticker destinations, passport fields, skill tags, projects
│   └── site.js              # contact email
├── pages/
│   ├── home/
│   │   └── HomePage.jsx     # assembles the homepage sections
│   └── work/
│       └── delta-airlines-redesign/
│           ├── DeltaCaseStudyPage.jsx   # the case study's written content + layout
│           └── content.js               # its structured data (meta, phases, comparison table)
├── components/
│   ├── layout/              # SiteLayout (page wrapper), SiteNav, FlightProvider (plane transition)
│   ├── home/                # Hero, Ticker, Passport, SkillTags, LuggageTag, WorkSection, BoardingPass, Postcard
│   ├── case-study/          # reusable case-study blocks: CaseStudyHero, PhaseRoute, CaseStudySection,
│   │                        #   InfoCard, ComparisonTable, Figure (+ shared case-study.css)
│   └── illustrations/       # SVG artwork: BeachScene, Lily, HibiscusFlower, PlaneMark
└── hooks/                   # usePendulum (tag swing physics), usePointerVelocity, useFlight, useDocumentTitle
```

All site styles are scoped under the `.tp` class, which `SiteLayout` puts on the root element.

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server (usually http://localhost:5173)
npm run build   # production build
npm run preview # preview the production build locally
npm run format  # format everything in src/ with Prettier
```

## Common edits

- **Change homepage text, skills, or projects:** edit `src/data/home.js`.
- **Tune the luggage tag swing:** edit `SWING` in `src/hooks/usePendulum.js`.
- **Restyle a component:** open the `.css` file next to it.

### Adding a new case study

1. Add its URL to `src/routes.js`, e.g. `orbitCaseStudy: "/work/orbit-launch"`.
2. Create `src/pages/work/orbit-launch/OrbitCaseStudyPage.jsx` (copy the Delta page as a starting point) and, if needed, a `content.js` next to it.
3. Register the route in `src/App.jsx`: `<Route path={ROUTES.orbitCaseStudy} element={<OrbitCaseStudyPage />} />`.
4. In `src/data/home.js`, set that project's `href` to `ROUTES.orbitCaseStudy` so its boarding pass opens the page.

## Postcard contact form (email setup)

The postcard at the bottom of the homepage sends messages by email through [Web3Forms](https://web3forms.com) (free, no backend needed).

1. Go to web3forms.com, enter the inbox that should receive postcards, and copy the access key they email you.
2. Copy `.env.example` to `.env.local` and paste the key: `VITE_WEB3FORMS_KEY=your-key`
3. Restart `npm run dev`.
4. When deploying to Vercel, add the same `VITE_WEB3FORMS_KEY` variable under Project → Settings → Environment Variables.

Without a key, the Send button instead opens the visitor's email app addressed to `CONTACT_EMAIL` in `src/data/site.js` — replace the `hello@you.com` placeholder there with the real address.

## Deployment notes

Nothing has been deployed or pushed anywhere yet. This is a standard Vite app and deploys to Vercel with zero configuration. `vercel.json` rewrites all paths to `index.html`, so case study URLs work when refreshed or shared directly.
