import { SWING, usePendulum } from "../../hooks/usePendulum";
import HibiscusFlower from "../illustrations/HibiscusFlower";
import "./LuggageTag.css";

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
    <div
      ref={ref}
      className="tag-unit"
      style={{ transform: `rotate(${tilt}deg)` }}
      onPointerEnter={onPointerEnter}
      onPointerDown={onPointerDown}
    >
      <div className="tag-shadow">
        <div className="tag">
          <div className="band" style={{ background: flash }}>
            <span className="grommet" />
          </div>
          <div className="tag-body">
            <div className="to">to</div>
            <div className="code">{code}</div>
            <div className="dest">{dest}</div>
            <div className="divider" />
            <div className="name">{name}</div>
            <div className="sub">skill · carry-on</div>
            <div className="bar" />
          </div>
          <div className="stub">
            <div className="serial">{serial}</div>
          </div>
        </div>
        <HibiscusFlower uid={`tag-${code}`} className="sticker" />
      </div>

      <svg
        className="string"
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
