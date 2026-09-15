import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LINK =
  "flex items-center gap-[6px] border-b font-mono text-[12px] text-ink no-underline";

// Top bar: a label on the left, and either in-page `links` or a `back` link on the right.
export default function SiteNav({ mark, links, back }) {
  return (
    <nav className="flex items-center justify-between border-b-[3px] border-ink px-10 py-5">
      <div className="font-mono text-[12px] tracking-[2px]">{mark}</div>

      {links && (
        <div className="flex gap-7 font-mono text-[12px] tracking-[1px]">
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
      )}

      {back && (
        <Link to={back.to} className={`${LINK} border-ink`}>
          <ArrowLeft size={14} aria-hidden="true" /> {back.label}
        </Link>
      )}
    </nav>
  );
}
