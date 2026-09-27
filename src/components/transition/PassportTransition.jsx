import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import { PassportContext } from "../../hooks/usePassport";
import { PORTRAIT } from "../../pages/about/content";
import { ROUTES } from "../../routes";
import ArrivalStamp from "../illustrations/ArrivalStamp";

// Provides openPassport(passportElement). The moment it's clicked the passport opens and zooms at
// once, while the rest of the page fades to plain beige behind it: its data page turns over on the spine while the whole passport grows until the blank visa
// page underneath fills the screen, and an ARRIVED stamp thunks down at the exact centre of the
// screen. It then fades into the About page, the stamp settling beside Tanvi's photo.
// Every step moves pre-drawn layers only (transform/opacity), so the browser keeps animating even
// while the About page is being drawn for the first time behind it.

// Durations in ms. Tune the passport-to-About transition here.
const TIMELINE = {
  clear: 400, // the rest of the page fades to plain beige, during the open
  open: 1000, // the page turns while the passport zooms in to fill the screen...
  stampAt: 0.55, // ...and the ARRIVED stamp starts coming down this far into the open
  stamp: 320, // how long the stamp takes to thunk down
  land: 500, // it fades into the About page while the stamp flies to its place there
};
const EASE = "cubic-bezier(.65,0,.25,1)";
const THUNK = "cubic-bezier(.3,1.5,.5,1)"; // overshoots slightly, like a stamp hitting paper
const STAMP_TILT = -13; // degrees, while it's on the visa page
const SCROLL_KEYS = [
  " ",
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
];

const px = (n) => `${n}px`;
const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));
const boxOf = ({ left, top, width, height }) => ({
  left: px(left),
  top: px(top),
  width: px(width),
  height: px(height),
});
// How far the backdrop and the visa sheet reach past the top and bottom of the screen, so a
// phone's toolbar sliding in or out mid-transition can't uncover the page at the edges.
const OVERSCAN = 240;
const OVERSCANNED = { top: -OVERSCAN, bottom: -OVERSCAN };

// The flying stamp is two layers: the outer one only moves (it's centred on the screen by CSS, so
// it's exactly central on any screen), the inner one only turns and scales.
const pose = (deg, scale) => `rotate(${deg}deg) scale(${scale})`;

// How an element is really drawn: its untransformed width, and its tilt including every rotated
// ancestor (the About page's stamp is tilted, and so is the photo it sits on). Its bounding box
// can't be used for size, since a tilted square's box is wider than the square.
function drawnAs(el) {
  let deg = 0;
  for (
    let node = el;
    node && node !== document.body;
    node = node.parentElement
  ) {
    const t = getComputedStyle(node).transform;
    if (t && t !== "none") {
      const m = new DOMMatrixReadOnly(t);
      deg += (Math.atan2(m.b, m.a) * 180) / Math.PI;
    }
  }
  const box = el.getBoundingClientRect();
  const width = el.clientWidth; // the CSS width, before any transform
  return {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
    width,
    deg,
    box,
  };
}

async function waitFor(selector, frames = 90) {
  for (let i = 0; i < frames; i++) {
    const el = document.querySelector(selector);
    if (el) return el;
    await nextFrame();
  }
  return null;
}

export default function PassportTransition({ children }) {
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const busy = useRef(false);
  const backdrop = useRef(null);
  const overlay = useRef(null);
  const book = useRef(null);
  const visaLabels = useRef(null);
  const visaTint = useRef(null);
  const leaf = useRef(null);
  const leafFront = useRef(null);
  const stamp = useRef(null);
  const stampFace = useRef(null);

  const run = async (rect, size) => {
    const animate = (el, keyframes, options) =>
      el.animate(keyframes, { fill: "forwards", ...options });

    // 1. Open and zoom together, straight away. The passport grows about its centre until the visa page covers the
    //    whole screen (plus the overscan), moving that centre to the screen's centre, while the data
    //    page turns over and fades. The About page is swapped in underneath meanwhile.
    const screen = overlay.current.getBoundingClientRect();
    const sx = screen.left + screen.width / 2;
    const sy = screen.top + screen.height / 2;
    const zoom =
      1.02 *
      Math.max(
        screen.width / rect.width,
        (screen.height + 2 * OVERSCAN) / rect.height,
      );
    const dx = sx - (rect.left + rect.width / 2);
    const dy = sy - (rect.top + rect.height / 2);
    const openOptions = { duration: TIMELINE.open, easing: EASE };
    const opening = [
      animate(backdrop.current, [{ opacity: 0 }, { opacity: 1 }], {
        duration: TIMELINE.clear,
        easing: "ease-out",
      }),
      animate(
        book.current,
        [
          { transform: "none" },
          { transform: `translate(${dx}px, ${dy}px) scale(${zoom})` },
        ],
        openOptions,
      ),
      // The page turns in two halves, meeting edge-on (-90°) at the midpoint, so the faces can be
      // swapped exactly there. Safari ignores backface-visibility here and would draw the plain back
      // over the passport, so each face's visibility is animated directly instead.
      animate(
        leaf.current,
        [
          { transform: "perspective(2200px) rotateY(0deg)", easing: "ease-in" },
          {
            transform: "perspective(2200px) rotateY(-90deg)",
            offset: 0.5,
            easing: "ease-out",
          },
          { transform: "perspective(2200px) rotateY(-180deg)" },
        ],
        { duration: TIMELINE.open, easing: "linear" },
      ),
      // front: the passport, until the page is edge-on
      animate(
        leaf.current.children[0],
        [
          { opacity: 1 },
          { opacity: 1, offset: 0.5 },
          { opacity: 0, offset: 0.5 },
          { opacity: 0 },
        ],
        { duration: TIMELINE.open },
      ),
      // back: plain paper once it has turned past edge-on, then fading out as it zooms away
      animate(
        leaf.current.children[1],
        [
          { opacity: 0 },
          { opacity: 0, offset: 0.5 },
          { opacity: 1, offset: 0.5 },
          { opacity: 0, offset: 0.9 },
          { opacity: 0 },
        ],
        { duration: TIMELINE.open },
      ),
      // the About page's beige comes in as its own layer
      animate(visaTint.current, [{ opacity: 0 }, { opacity: 1 }], openOptions),
      animate(visaLabels.current, [{ opacity: 1 }, { opacity: 0 }], {
        duration: TIMELINE.open * 0.4,
        easing: "ease-out",
      }),
      animate(
        stampFace.current,
        [
          { opacity: 0.001, transform: pose(STAMP_TILT, 1.8) },
          { opacity: 1, transform: pose(STAMP_TILT, 1) },
        ],
        {
          duration: TIMELINE.stamp,
          delay: TIMELINE.open * TIMELINE.stampAt,
          easing: THUNK,
        },
      ),
    ];
    // Swap in the About page only once the beige has covered the old page (the zoom keeps going
    // meanwhile), so the new page never shows around the passport.
    await opening[0].finished;
    navigate(ROUTES.about);
    const title = await waitFor('[data-passport-target="title"]');
    await Promise.all(opening.map((a) => a.finished));

    // 2. The full-screen paper now covers the backdrop, so drop it.
    backdrop.current.getAnimations().forEach((a) => a.cancel());
    backdrop.current.style.opacity = "0";
    const target = document.querySelector('[data-passport-target="stamp"]');
    await nextFrame();

    // 3. Land: the paper fades into the About page, and the stamp settles exactly onto the one
    //    beside Tanvi's photo (same spot, size and tilt), which takes over once they line up.
    const landOptions = { duration: TIMELINE.land, easing: EASE };
    const fades = [
      animate(
        book.current.firstElementChild,
        [{ opacity: 1 }, { opacity: 0 }],
        landOptions,
      ),
    ];
    const to = target && drawnAs(target);
    if (to && to.box.top < innerHeight && to.box.bottom > 0) {
      target.style.visibility = "hidden";
      fades.push(
        animate(
          stamp.current,
          [
            { transform: "none" },
            { transform: `translate(${to.x - sx}px, ${to.y - sy}px)` },
          ],
          landOptions,
        ),
        animate(
          stampFace.current,
          [
            { transform: pose(STAMP_TILT, 1) },
            { transform: pose(to.deg, to.width / size) },
          ],
          landOptions,
        ),
      );
      await Promise.all(fades.map((a) => a.finished));
      target.style.visibility = "";
    } else {
      fades.push(
        animate(
          stampFace.current,
          [{ opacity: 1 }, { opacity: 0 }],
          landOptions,
        ),
      );
      await Promise.all(fades.map((a) => a.finished));
    }
    return title;
  };

  const openPassport = async (passport) => {
    if (busy.current) return;
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || !passport) {
      navigate(ROUTES.about);
      return;
    }

    busy.current = true;
    // Start decoding the About page's portrait now, so it's ready when the page appears.
    const portrait = new Image();
    portrait.src = PORTRAIT.src;
    portrait.decode().catch(() => {});
    const { left, top, width, height } = passport.getBoundingClientRect();
    const rect = { left, top, width, height };
    const size = Math.min(150, width * 0.36);
    const blockScroll = (e) => e.preventDefault();
    const blockKeys = (e) => SCROLL_KEYS.includes(e.key) && e.preventDefault();
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("keydown", blockKeys);

    let landedTitle = null;
    try {
      flushSync(() => setTrip({ rect, size }));
      // The page that turns is a copy of the real passport, so it looks identical.
      const copy = passport.cloneNode(true);
      copy.inert = true;
      Object.assign(copy.style, { width: "100%", height: "100%", margin: "0" });
      leafFront.current.appendChild(copy);
      passport.style.visibility = "hidden";
      // One frame for the browser to draw the new overlay, so the first frame of motion is smooth.
      await nextFrame();
      landedTitle = await run(rect, size);
    } finally {
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("keydown", blockKeys);
      passport.style.visibility = "";
      flushSync(() => setTrip(null));
      busy.current = false;
      landedTitle?.focus({ preventScroll: true });
    }
  };

  return (
    <PassportContext.Provider value={openPassport}>
      {children}
      {trip && (
        <div
          ref={overlay}
          className="fixed inset-0 z-[9999]"
          aria-hidden="true"
        >
          <div
            ref={backdrop}
            // the page's own beige, so the rest of the page just quietly clears around the passport
            className="absolute inset-x-0 bg-kraft opacity-0"
            style={OVERSCANNED}
          />

          {/* the passport, which zooms in as a whole: the blank visa page underneath
              (which ends up filling the screen) and the data page turning over on top */}
          <div
            ref={book}
            className="absolute will-change-transform"
            style={boxOf(trip.rect)}
          >
            <div className="passport-paper absolute inset-0 overflow-hidden rounded-[3px] border border-black/15 bg-paper">
              <div
                ref={visaTint}
                className="absolute inset-0 bg-kraft opacity-0"
              />
              <div
                ref={visaLabels}
                className="absolute inset-0 flex flex-col items-center justify-between py-5 font-mono text-[10px] tracking-[3px] text-muted"
              >
                <span>VISAS · ENTRIES</span>
                <span>02</span>
              </div>
            </div>

            {/* the data page: a copy of the passport on the front, plain paper on the back */}
            <div
              ref={leaf}
              className="absolute inset-0 origin-left will-change-transform [transform-style:preserve-3d]"
            >
              <div
                ref={leafFront}
                className="absolute inset-0 [backface-visibility:hidden]"
              />
              <div className="passport-paper absolute inset-0 rounded-[3px] border border-black/15 bg-paper opacity-0 [transform:rotateY(180deg)]" />
            </div>
          </div>

          {/* centred on the screen by CSS, so it lands at the exact centre on any screen */}
          <div
            ref={stamp}
            className="absolute left-1/2 top-1/2 will-change-transform"
            style={{
              width: px(trip.size),
              height: px(trip.size),
              margin: px(-trip.size / 2),
            }}
          >
            <div
              ref={stampFace}
              className="h-full w-full opacity-[.001] [will-change:transform,opacity]"
            >
              <ArrivalStamp className="h-full w-full" />
            </div>
          </div>
        </div>
      )}
    </PassportContext.Provider>
  );
}
