// Tanvi's beach drawing behind the top of the homepage. It fills the whole first screen top to
// bottom, starting under the nav, then runs FADE px into the about section, where it blurs and
// fades into the page. The drawing's key parts are on its right, so when the screen's shape
// forces a crop it's anchored 80% across: mostly the left (open sea) is trimmed, and on wide
// screens the sun still fits.
const FADE = 240;
const SRC = "/assets/home/hero-beach.webp";
// Pre-blurred copies (about 5px and 14px of blur on screen), so phones stack images instead of
// running live blur filters, which are slow on mobile GPUs. Regenerate them if the drawing changes.
const LIGHT_BLUR = "/assets/home/hero-beach-light.webp";
const SOFT_BLUR = "/assets/home/hero-beach-soft.webp";
const IMG = "h-full w-full object-cover object-[80%_center]";

// Masks rather than overlays, so it fades to whatever is behind it; prefixed for Safari.
const mask = (gradient) => ({ WebkitMaskImage: gradient, maskImage: gradient });
const FADE_OUT = mask(
  `linear-gradient(to bottom, #000 calc(100% - ${FADE}px), transparent)`,
);
// Everything past the ink rule under the hero (FADE px above the bottom) is softly blurred, with
// a hard edge right at the rule.
const PAST_RULE = mask(
  `linear-gradient(to bottom, transparent calc(100% - ${FADE}px), #000 calc(100% - ${FADE}px))`,
);
const BLUR_IN = mask(
  `linear-gradient(to bottom, transparent calc(100% - ${FADE * 1.6}px), #000 calc(100% - ${FADE * 0.4}px))`,
);

export default function HeroArt() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden"
      style={{ height: `calc(100% + ${FADE}px)`, ...FADE_OUT }}
      aria-hidden="true"
    >
      <img
        className={IMG}
        src={SRC}
        width={2360}
        height={1640}
        alt=""
        fetchpriority="high"
      />
      <img
        className={`absolute inset-0 ${IMG}`}
        style={PAST_RULE}
        src={LIGHT_BLUR}
        alt=""
      />
      {/* a blurred copy that takes over toward the bottom, so the drawing softens as it fades */}
      <img
        className={`absolute inset-0 ${IMG}`}
        style={BLUR_IN}
        src={SOFT_BLUR}
        alt=""
      />
    </div>
  );
}
