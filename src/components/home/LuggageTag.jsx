import { useRef, useState } from "react";
import { SWING, usePendulum } from "../../hooks/usePendulum";
import HibiscusFlower from "../illustrations/HibiscusFlower";

const SMALL_CAPS = "font-mono uppercase text-muted";
// A hairline edge on each face (symmetric, so it's fine on the flipped side too).
const EDGE = "[filter:drop-shadow(0_0_.6px_rgba(18,59,54,.5))]";
// The soft shadow is its own blurred tag shape behind the tag, not a filter: Safari drew a filter
// shadow mirrored on the flipped side, and drops it entirely around anything that flips in 3D.
const CARD = "tag-shape relative flex aspect-[1/2] flex-col bg-paper";
// The flip: a symmetric ease, so the tag is exactly edge-on halfway through, which is when the
// faces swap. Swapping with opacity rather than backface-visibility, which Safari draws wrongly.
const FLIP_MS = 600;
const SWAP = {
  transition: `opacity 0s linear ${FLIP_MS / 2}ms`,
};

// Coloured band with the reinforced string hole, on both sides of the tag.
function Band({ flash }) {
  return (
    <div
      className="relative flex-[0_0_64px] after:absolute after:inset-x-0 after:bottom-0 after:h-[5px] after:bg-black/[.12] after:content-['']"
      style={{ background: flash }}
    >
      <span className="absolute left-1/2 top-4 -ml-[11px] h-[22px] w-[22px] rounded-full bg-kraft shadow-[inset_0_2px_3px_rgba(0,0,0,.35),0_0_0_4px_#E9DDBB,0_0_0_5px_rgba(0,0,0,.28),0_1px_0_5px_rgba(255,255,255,.35)]" />
    </div>
  );
}

function Stub({ serial }) {
  return (
    <div className="border-t-[1.5px] border-dashed border-black/25 bg-black/[.03] px-[10px] pb-[10px] pt-2 text-center">
      <div className="font-mono text-[8px] tracking-[1px] text-muted">
        {serial}
      </div>
    </div>
  );
}

export default function LuggageTag({
  code,
  dest,
  name,
  flash,
  serial,
  tilt,
  details,
  usedOn,
  pointer,
}) {
  const { ref, kick } = usePendulum(tilt);
  const [flipped, setFlipped] = useState(false);
  const shadow = useRef(null);

  // Flip, and narrow the shadow as the tag turns edge-on so it follows the tag.
  const flip = () => {
    setFlipped((f) => !f);
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    shadow.current?.animate(
      [
        { transform: "scaleX(1)" },
        { transform: "scaleX(.08)" },
        { transform: "scaleX(1)" },
      ],
      { duration: FLIP_MS, easing: "cubic-bezier(.45,0,.55,1)" },
    );
  };

  // Mouse: swing with the speed and direction the cursor was moving when it hit the tag.
  const onPointerEnter = (e) => {
    if (e.pointerType === "touch") return;
    const p = pointer.current;
    kick(e.timeStamp - p.t < 80 ? p.vx : 0);
  };

  // Touch: a gentle swing away from the side that was tapped.
  const onPointerDown = (e) => {
    if (e.pointerType !== "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    kick(e.clientX < r.left + r.width / 2 ? SWING.tapSpeed : -SWING.tapSpeed);
  };

  return (
    // 5 per row on desktop, 3 on tablets, 2 on phones. Rotates around the string knot (4px from the top).
    // will-change gives each tag its own layer: the phone draws the tag and its shadows once and
    // just rotates that, instead of redrawing the shadow filters every frame (and, in Safari,
    // drawing them misaligned mid-swing).
    <div
      ref={ref}
      className="relative flex-[0_0_calc((100%-20px)/2)] origin-[50%_4px] pt-12 will-change-transform sm:basis-[calc((100%-40px)/3)] md:basis-[calc((100%-80px)/5)]"
      style={{ transform: `rotate(${tilt}deg)` }}
      onPointerEnter={onPointerEnter}
      onPointerDown={onPointerDown}
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-x-[3px] translate-y-[10px] [filter:blur(6px)]"
        >
          <div ref={shadow} className="tag-shape h-full w-full bg-black/[.2]" />
        </div>
        <button
          type="button"
          onClick={flip}
          aria-pressed={flipped}
          aria-label={`${name}: ${flipped ? "hide" : "show"} details`}
          className="relative block w-full cursor-pointer rounded-sm text-left text-ink outline-none transition-transform ease-[cubic-bezier(.45,0,.55,1)] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-kraft motion-reduce:transition-none"
          style={{
            transitionDuration: `${FLIP_MS}ms`,
            transform: `perspective(900px) rotateY(${flipped ? 180 : 0}deg)`,
          }}
        >
          {/* front: the skill */}
          <div
            className={`${EDGE} relative`}
            style={{ ...SWAP, opacity: flipped ? 0 : 1 }}
            aria-hidden={flipped}
          >
            <div className={CARD}>
              <Band flash={flash} />
              <div className="flex flex-1 flex-col items-center px-3 pb-3 pt-[14px] text-center">
                <div className={`${SMALL_CAPS} text-[8px] tracking-[2px]`}>
                  to
                </div>
                <div className="mt-[2px] font-fraunces text-[40px] font-bold leading-none">
                  {code}
                </div>
                <div
                  className={`${SMALL_CAPS} mt-1 text-[9px] tracking-[1.5px]`}
                >
                  {dest}
                </div>
                <div className="mb-[10px] mt-3 w-full border-t-[1.5px] border-dashed border-black/[.18]" />
                <div className="text-[14px] font-semibold">{name}</div>
                <div className="mt-[2px] font-mono text-[8px] tracking-[1px] text-muted">
                  skill · tap to flip
                </div>
                <div className="barcode-thin mt-auto h-7 w-[78%]" />
              </div>
              <Stub serial={serial} />
            </div>
            <HibiscusFlower className="absolute bottom-[34px] right-[-12px] h-[42px] w-[42px]" />
          </div>

          {/* back: what the skill covers and where it was used. Turned around so it reads the
            right way once the tag has flipped. */}
          <div
            className={`${EDGE} absolute inset-0 [transform:rotateY(180deg)]`}
            style={{ ...SWAP, opacity: flipped ? 1 : 0 }}
            aria-hidden={!flipped}
          >
            <div className={`${CARD} h-full`}>
              <Band flash={flash} />
              <div className="flex flex-1 flex-col px-3 pb-3 pt-3">
                <div className="text-center text-[13px] font-semibold">
                  {name}
                </div>
                <div className="mb-2 mt-2 w-full border-t-[1.5px] border-dashed border-black/[.18]" />
                <div
                  className={`${SMALL_CAPS} mb-[6px] text-[8px] tracking-[1.5px]`}
                >
                  contents
                </div>
                <ul className="space-y-[5px]">
                  {details.map((item) => (
                    <li
                      key={item}
                      className="relative pl-[10px] text-[11px] leading-[1.3] text-[#2F534C]"
                    >
                      <span
                        className="absolute left-0 top-[5px] h-[4px] w-[4px] rounded-full"
                        style={{ background: flash }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <div
                    className={`${SMALL_CAPS} mb-1 text-[8px] tracking-[1.5px]`}
                  >
                    used on
                  </div>
                  <div className="font-fraunces text-[12.5px] font-semibold leading-[1.3]">
                    {usedOn.join(" · ")}
                  </div>
                </div>
              </div>
              <Stub serial={serial} />
            </div>
          </div>
        </button>
      </div>

      {/* string loop: its lower end sits on the grommet centre (48px padding + 27px into the tag) */}
      <svg
        className="pointer-events-none absolute left-1/2 top-0 z-[3] -ml-[22px] overflow-visible"
        width="44"
        height="78"
        viewBox="0 0 44 78"
        aria-hidden="true"
      >
        <path
          d="M22 75 C9 58 7 24 22 4 C37 24 35 58 22 75"
          stroke="#123B36"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="22" cy="5" r="2.4" fill="#123B36" />
      </svg>
    </div>
  );
}
