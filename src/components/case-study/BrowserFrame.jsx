const DOTS = ["bg-[#FF5F57]", "bg-[#FEBC2E]", "bg-[#28C840]"];

// A desktop screenshot or recording inside a dark browser window, with a caption below.
// `image` is { src, width, height, alt }. `inGrid` drops the outer margins when used in a grid.
export default function BrowserFrame({ image, url, caption, inGrid = false }) {
  return (
    <div className={inGrid ? "" : "mb-[26px] mt-[22px]"}>
      <div className="overflow-hidden rounded-[12px] bg-[#141C2B] pb-3 shadow-[0_22px_44px_-22px_rgba(0,0,0,.55)]">
        <div className="flex items-center gap-[7px] bg-[#1D2838] px-[11px] py-[9px] md:px-[14px] md:py-[11px]">
          {DOTS.map((color) => (
            <i
              key={color}
              className={`block h-[11px] w-[11px] rounded-full ${color}`}
            />
          ))}
          <div className="ml-[10px] flex h-[19px] flex-1 items-center rounded-[5px] bg-white/10 px-[10px] font-mono text-[8px] tracking-[.5px] text-white/[.55] md:text-[9px]">
            {url}
          </div>
        </div>
        <img
          className="block h-auto w-full"
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading="lazy"
        />
      </div>
      <p className="mt-[10px] font-mono text-[9px] uppercase tracking-[1.4px] text-muted">
        {caption}
      </p>
    </div>
  );
}
