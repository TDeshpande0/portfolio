import { useEffect, useRef, useState } from "react";

// Tune the sticker peel here.
const PEEL = {
  curl: 30, // px the bottom-right corner stays curled up, hinting it can be peeled
  curlIn: 350, // ms for the corner to curl up once the page has landed (on devices with a mouse)
  overshoot: 40, // px past the opposite corner the crease travels to fully clear the card
  click: 900, // ms for the quick peel (or stick back) on click
  dragThreshold: 5, // px a press must move before it counts as a drag rather than a click
  settle: 0.25, // released past this share of the way, a drag finishes the peel
  stickBackGain: 2, // how much faster than the pointer the corner moves when dragging it back down
};

const easeOut = (t) => 1 - (1 - t) ** 3;

// Eases the lifted corner from one point to another, calling `draw` each frame.
function tween(s, from, to, duration, draw) {
  cancelAnimationFrame(s.anim);
  const start = performance.now();
  const step = (now) => {
    const t = duration ? Math.min(1, (now - start) / duration) : 1;
    const e = easeOut(t);
    draw({ x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e });
    if (t < 1) s.anim = requestAnimationFrame(step);
  };
  s.anim = requestAnimationFrame(step);
}

// The part of the w×h rectangle on one side of the crease through `m` with normal `n`
// (`side` 1 keeps the corner being peeled, -1 the part still stuck down), as a CSS polygon.
export function clipBeyond(w, h, m, n, side) {
  const inside = ([x, y]) => side * ((x - m.x) * n.x + (y - m.y) * n.y) >= 0;
  const corners = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ];
  const kept = [];
  corners.forEach((a, i) => {
    const b = corners[(i + 1) % 4];
    if (inside(a)) kept.push(a);
    if (inside(a) !== inside(b)) {
      const da = (a[0] - m.x) * n.x + (a[1] - m.y) * n.y;
      const db = (b[0] - m.x) * n.x + (b[1] - m.y) * n.y;
      const t = da / (da - db);
      kept.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  });
  if (kept.length < 3) return "polygon(0 0, 0 0, 0 0)";
  return `polygon(${kept.map(([x, y]) => `${x}px ${y}px`).join(", ")})`;
}

// Where the lifted corner sits: flat (or curled by `curl` px) at rest, or past the opposite corner
// once peeled clear off.
function homePoint(card, peel, curl = 0) {
  const w = card.offsetWidth;
  const h = card.offsetHeight;
  return peel
    ? { x: -w - PEEL.overshoot, y: -h - PEEL.overshoot }
    : { x: w - curl, y: h - curl };
}

// Folds the card's corner (w, h) over to `p`. The crease is the perpendicular bisector between them:
// the card is clipped to the side still stuck down, and the flap is the other side mirrored over.
function drawPeel(card, flap, p) {
  const w = card.offsetWidth;
  const h = card.offsetHeight;
  const dx = w - p.x;
  const dy = h - p.y;
  const len = Math.hypot(dx, dy);
  if (len < 0.5) {
    card.style.clipPath = "";
    flap.style.visibility = "hidden";
    return;
  }
  const n = { x: dx / len, y: dy / len };
  const m = { x: (w + p.x) / 2, y: (h + p.y) / 2 };
  card.style.clipPath = clipBeyond(w, h, m, n, -1);
  // Mirror across the crease: X' = X - 2((X - m)·n)n.
  const k = 2 * (m.x * n.x + m.y * n.y);
  const f = flap.style;
  f.visibility = "visible";
  f.clipPath = clipBeyond(w, h, m, n, 1);
  f.transform = `matrix(${1 - 2 * n.x * n.x}, ${-2 * n.x * n.y}, ${-2 * n.x * n.y}, ${1 - 2 * n.y * n.y}, ${k * n.x}, ${k * n.y})`;
  // The underside fades as it leaves the card, so it doesn't linger over the page.
  f.opacity = String(
    Math.min(1, Math.max(0, (p.x + w + PEEL.overshoot) / (w / 2))),
  );
  // Shade the underside darkest along the crease, lightening toward the lifted corner. The
  // gradient runs along n across the whole box, so find where the crease falls on that line.
  const deg = (Math.atan2(n.y, n.x) * 180) / Math.PI + 90;
  const line = w * Math.abs(n.x) + h * Math.abs(n.y);
  const crease = (m.x - w / 2) * n.x + (m.y - h / 2) * n.y + line / 2;
  f.background = `linear-gradient(${deg}deg, #E3D5B6 ${crease}px, #FBF3E1 ${crease + len * 0.35}px)`;
}

// Peels `card` off like a sticker, lifting its bottom-right corner to where the pointer drags it.
// `flap` is an empty element over the card that draws the peeled part's underside.
// Returns the refs to attach, whether it's peeled, and the frame's pointer handlers.
export function usePeel() {
  const frame = useRef(null);
  const card = useRef(null);
  const flap = useRef(null);
  const [peeled, setPeeled] = useState(false);
  // `curl` starts at 0 and lifts to PEEL.curl once the page has landed.
  const state = useRef({
    peeled: false,
    point: null,
    drag: null,
    anim: 0,
    curl: 0,
  });

  const draw = (p) => {
    drawPeel(card.current, flap.current, p);
    state.current.point = p;
  };

  const animateTo = (peel, duration) => {
    const s = state.current;
    const from = s.point ?? homePoint(card.current, s.peeled, s.curl);
    s.peeled = peel;
    setPeeled(peel);
    tween(s, from, homePoint(card.current, peel, s.curl), duration, draw);
  };

  // Redraw in place whenever the card changes size, since the clip shapes are in pixels.
  useEffect(() => {
    const s = state.current;
    const el = card.current;
    const redraw = () => {
      if (s.drag?.from) return;
      s.point = homePoint(el, s.peeled, s.curl);
      drawPeel(el, flap.current, s.point);
    };
    const observer = new ResizeObserver(redraw);
    observer.observe(el);

    // Curl the corner up once any ticket transition has finished. Curling it earlier would make the
    // header visibly change when the transition's copy of it (which has no flap) hands over.
    const curlIn = () => {
      if (document.querySelector("[data-flight-overlay]")) {
        s.anim = requestAnimationFrame(curlIn);
        return;
      }
      s.curl = PEEL.curl;
      if (s.peeled || s.drag?.from) return;
      // Phones draw the curl in one go: each frame of the curl-in redraws the whole header, which
      // stutters on mobile GPUs right as the page arrives.
      const phone = !window.matchMedia?.("(hover: hover)").matches;
      tween(
        s,
        s.point ?? homePoint(el, false, 0),
        homePoint(el, false, s.curl),
        phone ? 0 : PEEL.curlIn,
        (p) => {
          drawPeel(el, flap.current, p);
          s.point = p;
        },
      );
    };
    s.anim = requestAnimationFrame(curlIn);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(s.anim);
    };
  }, []);

  const reduceMotion = () =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    const s = state.current;
    s.dragged = false;
    s.drag = { x: e.clientX, y: e.clientY, from: null, id: e.pointerId };
  };

  const onPointerMove = (e) => {
    const d = state.current.drag;
    if (!d || d.id !== e.pointerId) return;
    const mx = e.clientX - d.x;
    const my = e.clientY - d.y;
    if (!d.from) {
      if (Math.hypot(mx, my) < PEEL.dragThreshold) return;
      cancelAnimationFrame(state.current.anim);
      d.from =
        state.current.point ??
        homePoint(card.current, state.current.peeled, state.current.curl);
      // Peeled, the corner is far off the card, so it travels double to be laid back in one drag.
      d.gain = state.current.peeled ? PEEL.stickBackGain : 1;
      frame.current.setPointerCapture(e.pointerId);
    }
    draw({ x: d.from.x + mx * d.gain, y: d.from.y + my * d.gain });
  };

  const onPointerUp = (e) => {
    const s = state.current;
    const d = s.drag;
    if (!d || d.id !== e.pointerId) return;
    s.drag = null;
    if (!d.from) return; // a click: onClick handles it
    s.dragged = true;
    // How far along the rest → peeled path the corner was let go.
    const a = homePoint(card.current, false);
    const b = homePoint(card.current, true);
    const vx = b.x - a.x;
    const vy = b.y - a.y;
    const t =
      ((s.point.x - a.x) * vx + (s.point.y - a.y) * vy) / (vx * vx + vy * vy);
    animateTo(
      s.peeled ? t > 1 - PEEL.settle : t > PEEL.settle,
      PEEL.click * 0.6,
    );
  };

  // Clicks (and Enter/Space on the frame's button, which bubble here) peel or stick back quickly.
  const onClick = () => {
    const s = state.current;
    if (s.dragged) {
      s.dragged = false;
      return;
    }
    animateTo(!s.peeled, reduceMotion() ? 0 : PEEL.click);
  };

  return {
    frame,
    card,
    flap,
    peeled,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onClick,
    },
  };
}
