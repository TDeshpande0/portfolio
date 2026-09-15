import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import { findProject } from "../../data/home";
import { FlightContext } from "../../hooks/useFlight";
import PlaneMark from "../illustrations/PlaneMark";
import TicketFace from "../home/TicketFace";

// Durations in ms. Tune the feel of the ticket-to-case-study transition here.
const TIMELINE = {
  lift: 400, // navy fades in and the ticket lifts off while its stub tears away
  rise: 650, // ticket flies to the top and unfolds into the case study header
  detailsLead: 120, // header details start fading in this long before the card settles
  details: 220, // ...and take this long to fade in
  reveal: 700, // a circle opens from the centre of the header onto the page
};
const LIFT_PX = 8;
const EASE_LIFT = "cubic-bezier(.2,.8,.2,1)";
const EASE_RISE = "cubic-bezier(.65,0,.25,1)";
const EASE_REVEAL = "cubic-bezier(.6,0,.2,1)";
// The flying plane is drawn at this size and scaled to the ticket's and header's planes.
const PLANE_PX = 40;
// Text that exists on both the ticket and the header, so it travels instead of fading.
const SHARED_LABELS = ["board-label", "flight-label"];
const TYPE_PROPS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "letterSpacing",
  "lineHeight",
  "textTransform",
  "color",
];

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
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));

function rectOf(el) {
  const { left, top, width, height } = el.getBoundingClientRect();
  return { left, top, width, height };
}

function boxKeyframe({ left, top, width, height }) {
  return { left: px(left), top: px(top), width: px(width), height: px(height) };
}

// Transform that sits the flying plane over `rect` (centre-aligned, scaled to its width).
function planeOver(rect) {
  const x = rect.left + rect.width / 2 - PLANE_PX / 2;
  const y = rect.top + rect.height / 2 - PLANE_PX / 2;
  return `translate(${x}px, ${y}px) scale(${rect.width / PLANE_PX})`;
}

// Where the glyphs of an element's text (or part of one text node) actually sit on screen.
function textRect(el, start, end) {
  const range = document.createRange();
  if (start === undefined) range.selectNodeContents(el);
  else {
    range.setStart(el.firstChild, start);
    range.setEnd(el.firstChild, end);
  }
  return range.getBoundingClientRect();
}

// Each word of a single-text-node element with its on-screen position.
function words(el) {
  const text = el.firstChild.textContent;
  const found = [];
  let index = 0;
  for (const word of text.split(" ")) {
    if (word) {
      found.push({
        text: word,
        rect: textRect(el, index, index + word.length),
      });
    }
    index += word.length + 1;
  }
  return found;
}

async function waitFor(selector, frames = 90) {
  for (let i = 0; i < frames; i++) {
    const el = document.querySelector(selector);
    if (el) return el;
    await nextFrame();
  }
  return null;
}

// Provides flyTo(path, ticketElement). As the clicked ticket's stub tears off, the ticket lifts
// off the page, rises into the case study header, and a circle opens from it onto the new page.
export default function FlightTransition({ children }) {
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const busy = useRef(false);
  const hiddenShadow = useRef(null);
  const backdrop = useRef(null);
  const shell = useRef(null);
  const face = useRef(null);
  const pieces = useRef(null);
  const plane = useRef(null);

  // Leave a bookmark on the page we're leaving (the ticket's section), so browser Back returns to it.
  const depart = (path, ticket) => {
    const section = ticket?.closest("[id]")?.id;
    if (section) {
      navigate(`${window.location.pathname}#${section}`, { replace: true });
    }
    navigate(path);
  };

  const run = async (path, ticket, src) => {
    const animate = (el, keyframes, options) =>
      el.animate(keyframes, { fill: "forwards", ...options });

    const source = (name) =>
      face.current.querySelector(`[data-flight-source="${name}"]`);
    source("plane").style.visibility = "hidden";
    ticket.style.visibility = "hidden";

    // 1. Lift-off: the clone takes the ticket's place and rises off the page as navy fades in
    //    over the stub tearing away underneath.
    const lifted = { ...src.card, top: src.card.top - LIFT_PX };
    const planeLifted = { ...src.plane, top: src.plane.top - LIFT_PX };
    const liftOptions = { duration: TIMELINE.lift, easing: EASE_LIFT };
    await Promise.all([
      animate(backdrop.current, [{ opacity: 0 }, { opacity: 1 }], {
        ...liftOptions,
        easing: "ease-out",
      }).finished,
      animate(
        shell.current,
        [boxKeyframe(src.card), boxKeyframe(lifted)],
        liftOptions,
      ).finished,
      animate(
        plane.current,
        [
          { transform: planeOver(src.plane) },
          { transform: planeOver(planeLifted) },
        ],
        liftOptions,
      ).finished,
    ]);

    // 2. Swap pages behind the opaque backdrop, then measure where everything lands.
    depart(path, ticket);
    const card = await waitFor('[data-flight-target="card"]');
    if (!card) {
      await animate(backdrop.current, [{ opacity: 1 }, { opacity: 0 }], {
        duration: 300,
      }).finished;
      return null;
    }
    await nextFrame();
    // The real header's shadow is switched off while the flying copy (with its own shadow) sits on
    // top of it; otherwise the two stack into a darker shadow that visibly lightens at the hand-off.
    const headerFrame = card.parentElement;
    const headerShadow = getComputedStyle(headerFrame).filter;
    headerFrame.style.filter = "none";
    hiddenShadow.current = headerFrame;
    const target = (name) =>
      card.querySelector(`[data-flight-target="${name}"]`);
    const targetCard = rectOf(card);
    const targetPlane = rectOf(target("plane"));

    // 3. Rise: the card unfolds into the header while everything the two share travels across.
    const riseOptions = { duration: TIMELINE.rise, easing: EASE_RISE };

    // Moves one piece of text from the ticket to the header. Its real font size animates (rather
    // than scaling a copy), so the letterforms match the page exactly at both ends.
    const flyText = (text, from, fromEl, to, toEl) => {
      const copy = document.createElement("span");
      copy.textContent = text;
      const style = getComputedStyle(toEl);
      TYPE_PROPS.forEach((prop) => (copy.style[prop] = style[prop]));
      Object.assign(copy.style, {
        position: "absolute",
        left: "0px",
        top: "0px",
        whiteSpace: "pre",
      });
      // Line height as a multiple of the font size, so the glyphs keep their place in the line as it grows.
      if (style.lineHeight.endsWith("px")) {
        copy.style.lineHeight = String(
          parseFloat(style.lineHeight) / parseFloat(style.fontSize),
        );
      }
      pieces.current.appendChild(copy);
      // Offset of the glyphs inside the copy's box; it grows with the font size.
      const glyphs = textRect(copy);
      copy.style.left = px(to.left - glyphs.left);
      copy.style.top = px(to.top - glyphs.top);
      const ratio =
        parseFloat(getComputedStyle(fromEl).fontSize) /
        parseFloat(style.fontSize);
      const dx = from.left - to.left + glyphs.left * (1 - ratio);
      const dy = from.top - to.top + glyphs.top * (1 - ratio);
      animate(
        copy,
        [
          {
            fontSize: px(parseFloat(style.fontSize) * ratio),
            transform: `translate(${dx}px, ${dy}px)`,
          },
          { fontSize: style.fontSize, transform: "none" },
        ],
        riseOptions,
      );
    };

    const sourceTitle = source("title");
    const targetTitle = target("title");
    const targetWords = words(targetTitle);
    words(sourceTitle).forEach((word, i) =>
      flyText(
        word.text,
        word.rect,
        sourceTitle,
        targetWords[i].rect,
        targetTitle,
      ),
    );
    SHARED_LABELS.forEach((name) =>
      flyText(
        target(name).textContent,
        textRect(source(name)),
        source(name),
        textRect(target(name)),
        target(name),
      ),
    );
    const pathLine = document.createElement("div");
    pathLine.className = "absolute border-t border-dashed border-ink/25";
    pieces.current.appendChild(pathLine);
    animate(
      pathLine,
      [
        boxKeyframe(rectOf(source("path"))),
        boxKeyframe(rectOf(target("path"))),
      ],
      riseOptions,
    );
    ["title", "path", ...SHARED_LABELS].forEach(
      (name) => (source(name).style.visibility = "hidden"),
    );

    // The shadow eases from "lifted off the page" to the header's own while the card is moving.
    animate(
      shell.current,
      [
        {
          ...boxKeyframe(lifted),
          filter: getComputedStyle(shell.current).filter,
        },
        { ...boxKeyframe(targetCard), filter: headerShadow },
      ],
      riseOptions,
    );
    animate(
      face.current,
      [{ opacity: 1 }, { opacity: 0, offset: 0.35 }, { opacity: 0 }],
      riseOptions,
    );
    animate(
      plane.current,
      [
        { transform: planeOver(planeLifted) },
        { transform: planeOver(targetPlane) },
      ],
      riseOptions,
    );
    await sleep(TIMELINE.rise - TIMELINE.detailsLead);

    // The card is landing: fade in a copy of the real header's details so it never sits empty.
    // The pieces that travelled stay hidden in it, since the flying copies occupy those spots.
    const details = card.cloneNode(true);
    details
      .querySelectorAll("[data-flight-target]")
      .forEach((piece) => (piece.style.visibility = "hidden"));
    const detailsPlane = details.querySelector('[data-flight-target="plane"]');
    [
      details,
      ...details.querySelectorAll("[data-flight-target], [tabindex]"),
    ].forEach((el) => {
      el.removeAttribute("data-flight-target");
      el.removeAttribute("tabindex");
    });
    Object.assign(details.style, {
      position: "absolute",
      margin: "0",
      ...boxKeyframe(targetCard),
    });
    shell.current.after(details);
    const detailsIn = animate(details, [{ opacity: 0 }, { opacity: 1 }], {
      duration: TIMELINE.details,
      easing: "ease-out",
    });
    await sleep(TIMELINE.detailsLead);

    // 4. Reveal: a circle opens from the centre of the landed header onto the case study.
    //    It starts at the card's half-height so it emerges from behind the card straight away.
    const cx = targetCard.left + targetCard.width / 2;
    const cy = targetCard.top + targetCard.height / 2;
    const startRadius = Math.min(targetCard.width, targetCard.height) / 2;
    const reach =
      Math.hypot(
        Math.max(cx, innerWidth - cx),
        Math.max(cy, innerHeight - cy),
      ) + 40;
    backdrop.current.style.setProperty("--reveal-x", px(cx));
    backdrop.current.style.setProperty("--reveal-y", px(cy));
    const reveal = animate(
      backdrop.current,
      [{ "--reveal-r": px(startRadius) }, { "--reveal-r": px(reach) }],
      { duration: TIMELINE.reveal, easing: EASE_REVEAL },
    );

    // Once the details are in, hand the plane over to the copy's own, which sits in the same spot.
    await detailsIn.finished;
    detailsPlane.style.visibility = "visible";
    plane.current.style.visibility = "hidden";

    await reveal.finished;
    // The copies now match the real header exactly, so removing them is invisible.
    return targetTitle;
  };

  const flyTo = async (path, ticket) => {
    if (busy.current) return;
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const project = findProject(path);
    if (reduceMotion || !ticket || !project) {
      depart(path, ticket);
      return;
    }

    busy.current = true;
    const src = {
      card: rectOf(ticket),
      plane: rectOf(ticket.querySelector('[data-flight-source="plane"]')),
    };
    const blockScroll = (e) => e.preventDefault();
    const blockKeys = (e) => SCROLL_KEYS.includes(e.key) && e.preventDefault();
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("keydown", blockKeys);

    let landedTitle = null;
    try {
      flushSync(() => setFlight({ project, src }));
      landedTitle = await run(path, ticket, src);
    } finally {
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("keydown", blockKeys);
      // Remove the copies and give the header its shadow back in the same frame.
      flushSync(() => setFlight(null));
      if (hiddenShadow.current) {
        hiddenShadow.current.style.filter = "";
        hiddenShadow.current = null;
      }
      busy.current = false;
      landedTitle?.focus({ preventScroll: true });
    }
  };

  return (
    <FlightContext.Provider value={flyTo}>
      {children}
      {flight && (
        <div className="fixed inset-0 z-[9999]" aria-hidden="true">
          <div
            ref={backdrop}
            className="flight-backdrop absolute inset-0 bg-navy-deep opacity-0"
          />

          {/* card shell: holds no text, so it can resize without distorting */}
          <div
            ref={shell}
            className="absolute [filter:drop-shadow(0_18px_22px_rgba(0,0,0,.35))]"
            style={boxKeyframe(flight.src.card)}
          >
            <div className="ticket-main relative h-full w-full overflow-hidden rounded-[6px_6px_0_0] bg-paper md:rounded-[6px_0_0_6px]">
              <div
                className="h-[6px]"
                style={{ background: flight.project.accent }}
              />
              <div
                ref={face}
                className="absolute left-0 top-[6px]"
                style={{ width: px(flight.src.card.width) }}
              >
                <TicketFace {...flight.project} boarding planeArrived />
              </div>
            </div>
          </div>

          {/* title words, header labels and flight path travelling from ticket to header */}
          <div ref={pieces} className="absolute inset-0" />

          <div
            ref={plane}
            className="absolute left-0 top-0"
            style={{
              width: px(PLANE_PX),
              height: px(PLANE_PX),
              transform: planeOver(flight.src.plane),
            }}
          >
            <PlaneMark className="h-full w-full" />
          </div>
        </div>
      )}
    </FlightContext.Provider>
  );
}
