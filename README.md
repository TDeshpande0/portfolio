# Tanvi Deshpande — Portfolio

A React + Vite portfolio site, built from the original `Portfolio Artifact.jsx` proof of concept (preserved unmodified in `reference/`).

## Stack

- **React 18** + **Vite** — build tooling
- **React Router** — page routes (each case study has its own URL)
- **Tailwind CSS** — all styling, as utility classes in the components
- **Headless UI** — unstyled accessible components (menus, dialogs, tabs), ready for new interactive UI
- **lucide-react** — icons
- **Prettier** — formatting with automatic Tailwind class sorting (`npm run format`)

## Project structure

```
src/
├── main.jsx                 # mounts the app inside the router
├── App.jsx                  # route table: which page renders at which URL
├── routes.js                # URL paths, shared by App.jsx and the content files
├── index.css                # Tailwind directives, base resets, and named decorative classes
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
│   ├── layout/              # SiteLayout (page wrapper), SiteNav, SiteFooter, Section, FlightProvider (plane transition)
│   ├── home/                # Hero, Ticker, Passport, SkillTags, LuggageTag, WorkSection, BoardingPass, Postcard
│   ├── case-study/          # reusable case-study blocks: CaseStudyHero, CaseStudyLabel, PhaseRoute,
│   │                        #   CaseStudySection, InfoCard, ComparisonTable, Figure
│   └── illustrations/       # SVG artwork: BeachScene, Lily, HibiscusFlower, PlaneMark
└── hooks/                   # usePendulum (tag swing physics), usePointerVelocity, useFlight, useDocumentTitle
tailwind.config.js           # design tokens: colours, fonts, animations, breakpoints
```

### Styling conventions

- **Design tokens** live in `tailwind.config.js`. Colours: `kraft`, `kraft-deep`, `ink`, `navy`, `navy-deep`, `airmail`, `gold`, `paper`, `mint`, `lav`, `muted`, `pen`. Fonts: `font-sans` (Work Sans), `font-mono` (Space Mono), `font-fraunces`, `font-hand` (Caveat).
- **Breakpoints** match the design: `sm` = 521px+ and `md` = 821px+. Classes are mobile-first, so an unprefixed class is the phone style and `md:` overrides it for desktop.
- **Exact values** use Tailwind's bracket syntax (e.g. `text-[13.5px]`, `tracking-[3px]`), which carries over the original design's measurements exactly.
- **Decorative effects** that would be unreadable as utility strings are named classes in `src/index.css`: paper textures, perforated edges, barcodes, the luggage tag shape, and the hero scrim. Examples: `barcode`, `tag-shape`, `stamp-perforation`.
- **Repeated class strings** inside a component are pulled into a constant at the top of the file (e.g. `LABEL`, `LINE` in `Postcard.jsx`).

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
- **Restyle a component:** edit the Tailwind classes in its `.jsx` file; to change a colour or font everywhere, edit `tailwind.config.js`.

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
