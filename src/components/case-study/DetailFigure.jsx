// A close-up screenshot on a paper card, tagged with a gold chip and captioned below.
// `image` is { src, width, height, alt }.
export default function DetailFigure({ image, chip = "detail", caption }) {
  return (
    <div className="relative mb-[26px] mt-[22px] rounded-[12px] border border-black/10 bg-paper p-[18px] shadow-[0_16px_32px_-24px_rgba(0,0,0,.4)]">
      <span className="absolute -top-[11px] left-[18px] rounded-full bg-gold px-[10px] py-1 font-mono text-[9px] font-bold uppercase tracking-[1.4px] text-navy-deep">
        {chip}
      </span>
      <img
        className="block h-auto w-full rounded-[6px]"
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="lazy"
      />
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[1.4px] text-muted">
        {caption}
      </p>
    </div>
  );
}
