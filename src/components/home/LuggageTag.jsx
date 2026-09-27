import { SWING, usePendulum } from "../../hooks/usePendulum";
import HibiscusFlower from "../illustrations/HibiscusFlower";

const SMALL_CAPS = "font-mono uppercase text-muted";

export default function LuggageTag({
  code,
  dest,
  name,
  flash,
  serial,
  tilt,
  pointer,
}) {
  const { ref, kick } = usePendulum(tilt);

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
      <div className="relative [filter:drop-shadow(0_0_.6px_rgba(18,59,54,.5))_drop-shadow(3px_10px_12px_rgba(0,0,0,.18))]">
        <div className="tag-shape relative flex aspect-[1/2] flex-col bg-paper">
          {/* coloured band with the reinforced string hole */}
          <div
            className="relative flex-[0_0_64px] after:absolute after:inset-x-0 after:bottom-0 after:h-[5px] after:bg-black/[.12] after:content-['']"
            style={{ background: flash }}
          >
            <span className="absolute left-1/2 top-4 -ml-[11px] h-[22px] w-[22px] rounded-full bg-kraft shadow-[inset_0_2px_3px_rgba(0,0,0,.35),0_0_0_4px_#E9DDBB,0_0_0_5px_rgba(0,0,0,.28),0_1px_0_5px_rgba(255,255,255,.35)]" />
          </div>

          <div className="flex flex-1 flex-col items-center px-3 pb-3 pt-[14px] text-center">
            <div className={`${SMALL_CAPS} text-[8px] tracking-[2px]`}>to</div>
            <div className="mt-[2px] font-fraunces text-[40px] font-bold leading-none">
              {code}
            </div>
            <div className={`${SMALL_CAPS} mt-1 text-[9px] tracking-[1.5px]`}>
              {dest}
            </div>
            <div className="mb-[10px] mt-3 w-full border-t-[1.5px] border-dashed border-black/[.18]" />
            <div className="text-[14px] font-semibold">{name}</div>
            <div className="mt-[2px] font-mono text-[8px] tracking-[1px] text-muted">
              skill · carry-on
            </div>
            <div className="barcode-thin mt-auto h-7 w-[78%]" />
          </div>

          {/* tear-off stub */}
          <div className="border-t-[1.5px] border-dashed border-black/25 bg-black/[.03] px-[10px] pb-[10px] pt-2 text-center">
            <div className="font-mono text-[8px] tracking-[1px] text-muted">
              {serial}
            </div>
          </div>
        </div>
        <HibiscusFlower className="absolute bottom-[34px] right-[-12px] h-[42px] w-[42px]" />
      </div>

      {/* string loop: its lower end sits on the grommet centre (48px padding + 27px into the tag) */}
      <svg
        className="absolute left-1/2 top-0 z-[3] -ml-[22px] overflow-visible"
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
