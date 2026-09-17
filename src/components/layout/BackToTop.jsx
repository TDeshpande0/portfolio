import { ArrowUp } from "lucide-react";
import { useScrolledPast } from "../../hooks/useScrolledPast";

// Small glass pill that appears once the page has been scrolled, and rides back up to the top.
export default function BackToTop() {
  const shown = useScrolledPast(300);

  const toTop = () => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={`liquid-glass group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-white/70 px-4 py-[10px] font-mono text-[11px] tracking-[1px] text-ink transition-[opacity,transform] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      take me back to the top
      <ArrowUp
        size={14}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:-translate-y-[2px]"
      />
    </button>
  );
}
