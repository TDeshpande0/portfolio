const HEADING =
  "mb-[10px] font-mono text-[10px] font-bold uppercase tracking-[1.8px] text-airmail";
const LEVELS = ["Low", "Moderate", "High"];
const LIST_BOX =
  "mt-4 rounded-[10px] border border-black/[.08] bg-kraft px-[18px] py-4";

// A research persona: photo, quote, needs and bio on the left; scales, goals and frustrations
// on the right. See PERSONAS in the Delta content for the shape.
export default function PersonaCard({
  name,
  role,
  photo,
  quote,
  needs,
  bio,
  scales,
  goals,
  frustrations,
}) {
  return (
    <div className="mb-6 overflow-hidden rounded-[12px] border border-black/10 bg-paper shadow-[0_16px_32px_-24px_rgba(0,0,0,.4)]">
      <div className="flex flex-wrap items-baseline justify-between gap-[14px] bg-navy-deep px-[22px] py-4 text-paper">
        <h3 className="font-fraunces text-[21px] font-semibold">{name}</h3>
        <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-gold">
          {role}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="border-b border-black/[.07] p-[22px] md:border-b-0 md:border-r">
          <img
            className="block h-24 w-24 rounded-full border-[3px] border-gold object-cover shadow-[0_8px_18px_-10px_rgba(0,0,0,.4)]"
            src={photo.src}
            alt={photo.alt}
            width={96}
            height={96}
            loading="lazy"
          />
          <p className="mb-[18px] mt-4 border-l-[3px] border-gold py-[2px] pl-[14px] font-fraunces text-[15px] italic leading-[1.55] text-navy-deep">
            “{quote}”
          </p>
          <h4 className={HEADING}>Priority needs</h4>
          <div className="mb-[18px] flex flex-wrap gap-2">
            {needs.map(({ label, on }) => (
              <span
                key={label}
                className={`rounded-full border px-[11px] py-[5px] text-[11.5px] ${on ? "border-navy-deep bg-navy-deep font-semibold text-paper" : "border-black/[.14] bg-kraft text-muted"}`}
              >
                {label}
              </span>
            ))}
          </div>
          <h4 className={HEADING}>Bio</h4>
          <p className="text-[13.5px] leading-[1.6] text-[#2F534C]">{bio}</p>
        </div>

        <div className="p-[22px]">
          {scales.map(({ label, level }) => (
            <div key={label} className="mb-4">
              <div className="mb-[7px] font-mono text-[10px] uppercase tracking-[1.5px] text-navy-deep">
                {label}
              </div>
              <div
                className="relative h-[22px]"
                role="img"
                aria-label={`${label}: ${LEVELS[level]}`}
              >
                <span className="absolute inset-x-[6px] top-[9px] h-[2px] bg-black/[.14]" />
                {LEVELS.map((_, i) => (
                  <span
                    key={i}
                    className={`absolute top-[3px] h-[15px] w-[15px] -translate-x-1/2 rounded-full border-2 ${i === level ? "border-airmail bg-airmail shadow-[0_0_0_4px_rgba(255,90,78,.18)]" : "border-black/25 bg-paper"}`}
                    style={{ left: ["6%", "50%", "94%"][i] }}
                  />
                ))}
              </div>
              <div className="mt-[2px] flex justify-between font-mono text-[9px] text-muted">
                {LEVELS.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
          ))}
          {[
            ["Goals", goals],
            ["Frustrations", frustrations],
          ].map(([title, items]) => (
            <div key={title} className={LIST_BOX}>
              <h4 className={HEADING}>{title}</h4>
              <ul className="list-disc pl-[17px]">
                {items.map((item) => (
                  <li
                    key={item}
                    className="mb-[6px] text-[13px] leading-[1.5] text-[#2F534C] last:mb-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
