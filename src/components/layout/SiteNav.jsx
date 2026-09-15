import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrolledPast } from "../../hooks/useScrolledPast";

// The docked bar's exact height (20px padding + a 20.2px row + 3px rule), so the page never shifts.
const DOCKED_HEIGHT = "h-[63.2px]";
const EASE = "ease-[cubic-bezier(.2,.8,.2,1)]";
const LINK =
  "flex items-center gap-[6px] border-b font-mono text-[12px] text-ink no-underline";
const HAMBURGER_BAR =
  "absolute left-0 h-[2px] w-5 rounded-full bg-ink transition-all duration-300";

// Phone-sized menu: a hamburger that morphs into an X and opens a glass panel of links.
function NavMenu({ links }) {
  return (
    <Popover className="md:hidden">
      <PopoverButton
        aria-label="Menu"
        className="group -mr-2 flex h-9 w-9 items-center justify-center rounded-full outline-none data-[focus]:ring-2 data-[focus]:ring-gold"
      >
        <span className="relative block h-3 w-5">
          <span
            className={`${HAMBURGER_BAR} top-0 group-data-[open]:top-[5px] group-data-[open]:rotate-45`}
          />
          <span
            className={`${HAMBURGER_BAR} top-[5px] group-data-[open]:opacity-0`}
          />
          <span
            className={`${HAMBURGER_BAR} top-[10px] group-data-[open]:top-[5px] group-data-[open]:-rotate-45`}
          />
        </span>
      </PopoverButton>

      <PopoverPanel
        anchor={{ to: "bottom end", gap: 14 }}
        transition
        data-nav-menu=""
        className="liquid-glass z-[60] w-56 rounded-3xl border border-white/70 p-2 text-ink transition duration-200 ease-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        {({ close }) => (
          <ul>
            {links.map(({ label, href }, i) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => close()}
                  className="flex items-baseline gap-3 rounded-2xl px-4 py-3 outline-none transition-colors hover:bg-white/60 focus-visible:bg-white/60"
                >
                  <span className="font-mono text-[10px] tracking-[1px] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-fraunces text-[22px] italic leading-none">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </PopoverPanel>
    </Popover>
  );
}

// Top bar: a label on the left, and either in-page `links` or a `back` link on the right.
// Docked to the top of the page it's a full-width ruled bar; once the page scrolls it
// detaches into a floating liquid-glass pill.
export default function SiteNav({ mark, links, back }) {
  const detached = useScrolledPast(4);

  return (
    <>
      {/* holds the docked bar's space in the page, since the bar itself is fixed */}
      <div className={DOCKED_HEIGHT} aria-hidden="true" />

      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${EASE} ${detached ? "px-3 pt-3" : ""}`}
      >
        <nav
          aria-label="Main"
          data-detached={detached}
          className={`pointer-events-auto mx-auto flex items-center justify-between transition-[max-width,height,padding,border-radius,border-width,border-color,background-color,box-shadow,backdrop-filter] duration-500 ${EASE} ${
            detached
              ? "liquid-glass h-[52px] max-w-[1000px] rounded-[26px] border border-white/70 px-5 md:px-7"
              : `${DOCKED_HEIGHT} max-w-full border-b-[3px] border-ink px-5 md:px-10`
          }`}
        >
          <div className="font-mono text-[12px] tracking-[2px]">{mark}</div>

          {links && (
            <>
              <div className="hidden gap-7 font-mono text-[12px] tracking-[1px] md:flex">
                {links.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    className={`${LINK} border-transparent hover:border-airmail hover:text-airmail`}
                  >
                    {label}
                  </a>
                ))}
              </div>
              <NavMenu links={links} />
            </>
          )}

          {back && (
            <Link to={back.to} className={`${LINK} border-ink`}>
              <ArrowLeft size={14} aria-hidden="true" /> {back.label}
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
