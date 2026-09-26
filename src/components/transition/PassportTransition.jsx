import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import { PassportContext } from "../../hooks/usePassport";
import { ROUTES } from "../../routes";
import ArrivalStamp from "../illustrations/ArrivalStamp";

// Provides openPassport(passportElement). The passport lifts off the page, its data page turns
// over on the spine, and the blank visa page underneath opens out to fill the screen as an ARRIVED
// stamp thunks onto it. It then fades into the About page, the stamp settling beside Tanvi's photo.

// Durations in ms. Tune the passport-to-About transition here.
const TIMELINE = {
  lift: 300, // navy fades in and the passport lifts off the page
  turn: 650, // the data page turns over on its spine, revealing a blank visa page
  open: 700, // the visa page opens out to fill the screen...
  stamp: 320, // ...while the ARRIVED stamp thunks down onto it, starting as it opens
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
// The flying stamp is two layers: the outer one only moves (centring a `size` square on x, y),
// the inner one only turns and scales, so the two can run on their own timings.
const centreOn = (x, y, size) =>
  `translate(${x - size / 2}px, ${y - size / 2}px)`;
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
  const visa = useRef(null);
  const visaLabels = useRef(null);
  const leaf = useRef(null);
  const leafFront = useRef(null);
  const stamp = useRef(null);
  const stampFace = useRef(null);

  const run = async (rect, size) => {
    const animate = (el, keyframes, options) =>
      el.animate(keyframes, { fill: "forwards", ...options });

    // 1. Lift-off.
    const lifted = `translateY(-8px) scale(1.015)`;
    await Promise.all([
      animate(backdrop.current, [{ opacity: 0 }, { opacity: 1 }], {
        duration: TIMELINE.lift,
        easing: "ease-out",
      }).finished,
      ...[leaf.current, visa.current].map(
        (el) =>
          animate(el, [{ transform: "none" }, { transform: lifted }], {
            duration: TIMELINE.lift,
            easing: "cubic-bezier(.2,.8,.2,1)",
          }).finished,
      ),
    ]);

    // 2. Page turn: the data page swings over its left edge, like opening to the next page.
    await animate(
      leaf.current,
      [
        { transform: `${lifted} rotateY(0deg)` },
        { transform: `${lifted} rotateY(-180deg)` },
      ],
      { duration: TIMELINE.turn, easing: EASE },
    ).finished;

    // 3. Open: the visa page grows to fill the screen, turning into the About page's paper, while
    //    the turned-over page fades away. The stamp thunks down as it starts to open and rides
    //    along with the page's centre.
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const openOptions = { duration: TIMELINE.open, easing: EASE };
    const screen = { left: 0, top: 0, width: innerWidth, height: innerHeight };
    await Promise.all([
      animate(
        visa.current,
        [
          { ...boxOf(rect), transform: lifted, borderRadius: "3px" },
          {
            ...boxOf(screen),
            transform: "none",
            borderRadius: "0px",
            backgroundColor: "#FFF6E3",
          },
        ],
        openOptions,
      ).finished,
      animate(visaLabels.current, [{ opacity: 1 }, { opacity: 0 }], {
        ...openOptions,
        duration: TIMELINE.open / 2,
      }).finished,
      // each side fades on its own: fading the whole turning page would flatten its 3D and show
      // the passport side mirrored through the back
      ...[...leaf.current.children].map(
        (side) =>
          animate(side, [{ opacity: 1 }, { opacity: 0 }], openOptions).finished,
      ),
      animate(
        stamp.current,
        [
          { transform: centreOn(cx, cy - 8, size) },
          { transform: centreOn(innerWidth / 2, innerHeight / 2, size) },
        ],
        openOptions,
      ).finished,
      animate(
        stampFace.current,
        [
          { opacity: 0, transform: pose(STAMP_TILT, 1.8) },
          { opacity: 1, transform: pose(STAMP_TILT, 1) },
        ],
        { duration: TIMELINE.stamp, easing: THUNK },
      ).finished,
    ]);

    // 4. Swap pages behind the full-screen paper (which now hides the navy, so drop it).
    backdrop.current.getAnimations().forEach((a) => a.cancel());
    backdrop.current.style.opacity = "0";
    navigate(ROUTES.about);
    const title = await waitFor('[data-passport-target="title"]');
    const target = document.querySelector('[data-passport-target="stamp"]');
    await nextFrame();

    // 5. Land: the paper fades into the About page, and the stamp settles exactly onto the one
    //    beside Tanvi's photo (same spot, size and tilt), which takes over once they line up.
    const landOptions = { duration: TIMELINE.land, easing: EASE };
    const fades = [
      animate(visa.current, [{ opacity: 1 }, { opacity: 0 }], landOptions),
    ];
    const to = target && drawnAs(target);
    if (to && to.box.top < innerHeight && to.box.bottom > 0) {
      target.style.visibility = "hidden";
      fades.push(
        animate(
          stamp.current,
          [
            { transform: centreOn(innerWidth / 2, innerHeight / 2, size) },
            { transform: centreOn(to.x, to.y, size) },
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
          className="fixed inset-0 z-[9999] [perspective:2200px]"
          aria-hidden="true"
        >
          <div
            ref={backdrop}
            className="absolute inset-0 bg-navy-deep opacity-0"
          />

          {/* the blank visa page underneath, which opens out into the About page */}
          <div
            ref={visa}
            className="passport-paper absolute overflow-hidden rounded-[3px] border border-black/15 bg-paper shadow-[0_24px_50px_-26px_rgba(0,0,0,.55)]"
            style={boxOf(trip.rect)}
          >
            <div
              ref={visaLabels}
              className="absolute inset-0 flex flex-col items-center justify-between py-5 font-mono text-[10px] tracking-[3px] text-muted"
            >
              <span>VISAS · ENTRIES</span>
              <span>02</span>
            </div>
          </div>

          {/* the data page, turning over on its spine: a copy of the passport on the front,
              plain paper on the back */}
          <div
            ref={leaf}
            className="absolute origin-left [transform-style:preserve-3d]"
            style={boxOf(trip.rect)}
          >
            <div
              ref={leafFront}
              className="absolute inset-0 [backface-visibility:hidden]"
            />
            <div className="passport-paper absolute inset-0 rounded-[3px] border border-black/15 bg-paper [backface-visibility:hidden] [transform:rotateY(180deg)]" />
          </div>

          <div
            ref={stamp}
            className="absolute left-0 top-0"
            style={{ width: px(trip.size), height: px(trip.size) }}
          >
            <div ref={stampFace} className="h-full w-full opacity-0">
              <ArrivalStamp className="h-full w-full" />
            </div>
          </div>
        </div>
      )}
    </PassportContext.Provider>
  );
}
