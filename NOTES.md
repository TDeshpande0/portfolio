# Notes to self: how the portfolio is put together

Working notes for editing and running the site. The public intro is in [README.md](README.md).

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
│   ├── about/
│   │   ├── AboutPage.jsx    # the About page, opened from the passport
│   │   └── content.js       # timeline, customs items, facts, trip photos
│   └── work/
│       ├── tango-portal/
│       │   ├── TangoCaseStudyPage.jsx   # the case study's written content + layout
│       │   └── content.js               # its structured data, including every image path
│       ├── tango-reward-campaigns/
│       │   ├── CampaignsCaseStudyPage.jsx   # brand collections case study
│       │   └── content.js
│       └── delta-airlines-redesign/
│           ├── DeltaCaseStudyPage.jsx
│           ├── DeltaUiKit.jsx           # Delta's brand kit, in Delta's own colours and fonts
│           ├── UserFlowDiagram.jsx      # the booking user flow SVG
│           └── content.js               # meta, phases, research, personas, site map, images
├── components/
│   ├── layout/              # SiteLayout (page wrapper), SiteNav (docks at the top, detaches into a glass pill on scroll), SiteFooter, Section
│   ├── home/                # Hero, Ticker, Passport, SkillTags, LuggageTag, WorkSection, BoardingPass, TicketFace, Postcard
│   ├── case-study/          # reusable case-study blocks. Header + route: CaseStudyHero, PhaseRoute.
│   │                        #   Delta-style: CaseStudyLabel, InfoCard, ComparisonTable, StickyNotes, PersonaCard,
│   │                        #   FindingCards, NeedsGoals, SiteMapTree, ZoomableDiagram, Lightbox.
│   │                        #   Tango-style: StorySection, SectionLabel, BodyText, SectionRule, StatCallout,
│   │                        #   BeforeAfter, FeatureCards, PullQuote, BrowserFrame, PhoneGallery,
│   │                        #   FlowSteps, DetailFigure
│   ├── transition/          # FlightTransition (ticket → case study), PassportTransition (passport → About)
│   └── illustrations/       # Lily, PlaneMark (SVG); HibiscusFlower (Tanvi's drawing, public/assets/illustrations/)
└── hooks/                   # usePendulum (tag swing physics), usePointerVelocity, useFlight, useScrolledPast, useDocumentTitle
public/
└── assets/
    └── case-studies/
        ├── tango-portal/    # Tango screenshots and screen recordings (JPG + animated WebP)
        ├── tango-reward-campaigns/  # brand collections screenshots
        └── delta-airlines-redesign/  # wireframes, Delta brand assets, persona photos (Unsplash)
tailwind.config.js           # design tokens: colours, fonts, animations, breakpoints
```

### Images and illustrations

- **Case study images** live in `public/assets/case-studies/<slug>/` and are referenced by path (e.g. `/assets/case-studies/tango-portal/desktop-template-gallery.jpg`) from that page's `content.js`. To swap a picture, replace the file keeping its name, or point `src` at a new file and update its `width`/`height`.
- **Hero drawing:** `public/assets/home/hero-beach.webp` (Tanvi's hand-drawn beach, converted to WebP) sits behind the nav, ticker and hero via `HeroArt`, filling the whole first screen top to bottom (sides cropped as needed), and blurs into the page at the passport. To replace it, export a new WebP at about 2400px wide and keep the file name, or update `src` and `width`/`height` in `src/components/home/HeroArt.jsx`.
- **Hibiscus:** `public/assets/illustrations/hibiscus.webp` (Tanvi's drawing), shown by `HibiscusFlower` on the luggage tags and the postcard stamp.
- **Other illustrations** (lily, plane) are React SVG components in `src/components/illustrations/` for now. Hand-drawn replacements can go in `public/assets/` when they're ready.

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
- **Tune the ticket → case study transition:** edit `TIMELINE` (and the easing constants) at the top of `src/components/transition/FlightTransition.jsx`. As the clicked ticket's stub tears off, the ticket lifts off the page, rises into the case study header, and a circle opens from the header onto the page.
- **Tune the passport → About transition:** edit `TIMELINE` at the top of `src/components/transition/PassportTransition.jsx`. The passport lifts, its data page turns over, an ARRIVED stamp lands on the blank visa page, and that page opens out into the About page as the stamp settles beside the photo.
- **Add the resume link:** set `RESUME_URL` in `src/data/site.js`; the About page's "View my resume" button appears once it's set.
- **Tune the return transition** (back link, browser Back, or swipe back from a case study): edit `RETURN` at the top of `src/components/layout/SiteLayout.jsx`. A navy circle closes over the case study, the homepage swaps in at the work section, and the navy fades away.
- **Restyle a component:** edit the Tailwind classes in its `.jsx` file; to change a colour or font everywhere, edit `tailwind.config.js`.

### Adding a new case study

1. Add its URL to `src/routes.js`, e.g. `foldFlipCaseStudy: "/work/fold-and-flip"`.
2. Create `src/pages/work/fold-and-flip/FoldFlipCaseStudyPage.jsx` with a `content.js` next to it. Copy the Tango page for the newer section style, or the Delta page for the original one.
3. Put its images in `public/assets/case-studies/fold-and-flip/` and reference them from `content.js`.
4. Register the route in `src/App.jsx`: `<Route path={ROUTES.foldFlipCaseStudy} element={<FoldFlipCaseStudyPage />} />`.
5. In `src/data/home.js`, set that project's `href` to `ROUTES.foldFlipCaseStudy` so its boarding pass opens the page.
6. Give the page a `<CaseStudyHero>` fed from `findProject(ROUTES.foldFlipCaseStudy)`. Its `data-flight-target` markers are what the ticket flies into; without a hero, the transition simply fades.

## Postcard contact form (email setup)

The postcard at the bottom of the homepage sends messages by email through [Web3Forms](https://web3forms.com) (free, no backend needed).

1. Go to web3forms.com, enter the inbox that should receive postcards, and copy the access key they email you.
2. Copy `.env.example` to `.env.local` and paste the key: `VITE_WEB3FORMS_KEY=your-key`
3. Restart `npm run dev`.
4. When deploying to Vercel, add the same `VITE_WEB3FORMS_KEY` variable under Project → Settings → Environment Variables.

Without a key, the Send button instead opens the visitor's email app addressed to `CONTACT_EMAIL` in `src/data/site.js` — currently tanvi1550@gmail.com.

## Deployment notes

Nothing has been deployed or pushed anywhere yet. This is a standard Vite app and deploys to Vercel with zero configuration. `vercel.json` rewrites all paths to `index.html`, so case study URLs work when refreshed or shared directly.
