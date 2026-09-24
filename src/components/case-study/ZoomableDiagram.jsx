import { useRef, useState } from "react";
import Lightbox from "./Lightbox";

const BUTTON =
  "flex h-[30px] min-w-[30px] items-center justify-center rounded-[7px] border border-black/[.18] bg-paper px-[10px] font-mono text-[12px] font-bold text-ink hover:border-[#B4832E] hover:bg-gold";
const ZOOM = { min: 0.6, max: 4, step: 0.25 };

// A wide diagram in a scrollable frame with zoom buttons, drag-to-pan (mouse), and a full-screen view.
// `children` is the diagram itself (an <svg>); it's drawn at least `minWidth` px wide.
export default function ZoomableDiagram({
  label,
  caption,
  minWidth = 900,
  children,
}) {
  const [zoom, setZoom] = useState(1);
  const [full, setFull] = useState(false);
  const view = useRef(null);
  const drag = useRef(null);

  // Functional update, so quick repeated clicks each count.
  const zoomBy = (step) =>
    setZoom((z) => Math.min(ZOOM.max, Math.max(ZOOM.min, z + step)));

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return; // touch scrolls natively
    const v = view.current;
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      left: v.scrollLeft,
      top: v.scrollTop,
    };
    v.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    view.current.scrollLeft = d.left - (e.clientX - d.x);
    view.current.scrollTop = d.top - (e.clientY - d.y);
  };
  const endDrag = () => (drag.current = null);

  return (
    <div className="mb-[26px] rounded-[12px] border border-black/10 bg-paper p-5 shadow-[0_16px_32px_-26px_rgba(0,0,0,.35)]">
      <div className="relative">
        <div className="absolute right-[10px] top-[10px] z-[3] flex gap-[6px]">
          <button
            type="button"
            className={BUTTON}
            aria-label="Zoom out"
            onClick={() => zoomBy(-ZOOM.step)}
          >
            −
          </button>
          <button
            type="button"
            className={BUTTON}
            aria-label="Zoom in"
            onClick={() => zoomBy(ZOOM.step)}
          >
            +
          </button>
          <button
            type="button"
            className={`${BUTTON} text-[10px] tracking-[1px]`}
            aria-label="Reset zoom"
            onClick={() => {
              setZoom(1);
              view.current.scrollLeft = 0;
            }}
          >
            FIT
          </button>
          <button
            type="button"
            className={`${BUTTON} text-[10px] tracking-[1px]`}
            aria-label="Open full screen"
            onClick={() => setFull(true)}
          >
            FULL
          </button>
        </div>
        <div
          ref={view}
          className="max-h-[560px] cursor-grab overflow-auto active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div
            className="transition-[width,min-width] duration-150 [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
            style={{ width: `${zoom * 100}%`, minWidth: minWidth * zoom }}
          >
            {children}
          </div>
        </div>
      </div>
      <p className="mt-[10px] font-mono text-[9px] uppercase tracking-[1px] text-muted">
        Use + / − to zoom, drag to pan, or open full screen
      </p>
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[1.4px] text-muted">
        {caption}
      </p>
      <Lightbox open={full} onClose={() => setFull(false)} label={label}>
        {children}
      </Lightbox>
    </div>
  );
}
