import { Check, ChevronDown, MessageCircle } from "lucide-react";
import { LOGO, NAV_BAR, PROMOS, SWATCHES, TYPE_SCALE } from "./content";

// Delta's own UI kit, drawn in Delta's brand colours and fonts rather than the site's.
const SERIF = "font-['PT_Serif',Georgia,serif]";
const SANS = "font-['Fira_Sans','Work_Sans',sans-serif]";
const CONTINUE = `${SANS} bg-[#E51937] px-[42px] py-[15px] text-[15px] font-bold text-white`;
const TAG = `${SANS} inline-block py-[5px] pl-[10px] pr-4 text-[11px] font-semibold text-white [clip-path:polygon(0_0,100%_0,calc(100%-9px)_50%,100%_100%,0_100%)]`;
const HELP_BAR = `${SANS} flex items-center justify-between bg-[#0B1F66] px-4 py-[13px] text-[13px] font-bold text-white`;
const SPECIAL = [
  "Passengers with disabilities",
  "Older travelers",
  "Passengers with medical needs",
  "Families with kids",
];

function Kit({ title, children }) {
  return (
    <div className="mb-[26px] rounded-[12px] border border-black/[.08] bg-paper px-7 py-[26px] shadow-[0_16px_32px_-26px_rgba(0,0,0,.35)]">
      <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[1.8px] text-airmail">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Img({ image, className = "" }) {
  return (
    <img
      className={`block h-auto max-w-full ${className}`}
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading="lazy"
    />
  );
}

function Price({ amount, cents }) {
  return (
    <div className={`${SERIF} mt-[18px]`}>
      From <sup>$</sup>
      <b className="text-[26px]">{amount}</b>
      <sup>.{cents}</sup>
    </div>
  );
}

function SafUpgrade() {
  return (
    <div className={`${SANS} mt-[10px] flex items-center gap-2 text-[11px]`}>
      <span className="inline-block h-[13px] w-[13px] flex-none border-[1.5px] border-current" />
      <span>
        Upgrade this flight to include Sustainable Aviation Fuel + <sup>$</sup>
        20
      </span>
    </div>
  );
}

export default function DeltaUiKit() {
  return (
    <>
      <Kit title="Logo">
        <Img image={LOGO} className="mx-auto max-w-[250px]" />
      </Kit>

      <Kit title="Colour palette">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {SWATCHES.map((hex) => (
            <div
              key={hex}
              className={`${SANS} flex h-[78px] items-center justify-center rounded-[4px] border border-black/[.12] text-[13px] tracking-[.5px]`}
              style={{
                background: hex,
                color: hex === "#FFFFFF" ? "#000" : "#fff",
              }}
            >
              {hex}
            </div>
          ))}
        </div>
      </Kit>

      <Kit title="Nav bar">
        <Img image={NAV_BAR} />
      </Kit>

      <Kit title="Typography">
        {TYPE_SCALE.map(([font, label, size, weight], i) => (
          <div
            key={label}
            className={`mb-[6px] leading-[1.3] text-black ${font === "serif" ? SERIF : SANS} ${font === "sans" && TYPE_SCALE[i - 1]?.[0] === "serif" ? "mt-[14px]" : ""}`}
            style={{ fontSize: size, fontWeight: weight }}
          >
            {label}
          </div>
        ))}
      </Kit>

      <Kit title="Buttons">
        <div className="mb-[14px] flex flex-wrap items-center gap-[14px]">
          <span className={CONTINUE}>Continue Button</span>
          <span
            className={`${SANS} border-2 border-[#E51937] bg-white px-10 py-[13px] text-[15px] font-bold text-[#E51937]`}
          >
            Button
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-[14px]">
          <span
            className={`${SANS} bg-[#C31256] px-4 py-[9px] text-[12px] font-bold text-white`}
          >
            Help Button
          </span>
          <span
            className={`${SANS} bg-[#C31256] px-[14px] py-2 text-[11px] font-bold text-white`}
          >
            Button
          </span>
          <span
            className={`${SANS} border-2 border-black bg-white px-[14px] py-2 text-[11px] font-bold tracking-[.4px] text-black`}
          >
            EDIT SEARCH
          </span>
        </div>
      </Kit>

      <Kit title="Tags">
        <span className={`${TAG} mr-[10px] bg-[#33798E]`}>
          Free Wi-Fi for SkyMiles Members
        </span>
        <span className={`${TAG} bg-[#4A784A]`}>NONSTOP</span>
      </Kit>

      <Kit title="Overlay">
        <div className="max-w-[330px]">
          <div className={HELP_BAR}>
            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Need
              Help?
            </span>
            <span aria-hidden="true">⟶</span>
          </div>
        </div>
        <div className="mt-4 max-w-[330px]">
          <div className={HELP_BAR}>
            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Need
              Help?
            </span>
            <span aria-hidden="true">—</span>
          </div>
          <div
            className={`${SANS} border border-t-0 border-black/[.14] px-4 py-[14px]`}
          >
            <p className="mb-3 text-[12px] leading-[1.45] text-[#333]">
              Please fill out the details below to start chatting with a live
              agent
            </p>
            {["Name", "Email"].map((field) => (
              <div
                key={field}
                className="mb-[10px] border border-[#BBB] px-[10px] py-[9px] text-[11px] text-[#8A8A8A]"
              >
                {field}
              </div>
            ))}
            <div className="flex justify-end">
              <span className="bg-[#0B1F66] px-[14px] py-2 text-[11px] font-bold text-white">
                Start Chat
              </span>
            </div>
          </div>
        </div>
      </Kit>

      <Kit title="Special assistance seating option card">
        <div className="max-w-[760px]">
          <div
            className={`${SANS} bg-[#10172E] px-5 py-4 text-[14px] font-bold text-white`}
          >
            Need special assistance?
          </div>
          <div
            className={`${SANS} mb-2 mt-3 text-[11px] font-bold text-[#4470C3]`}
          >
            Learn More about SAF
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border border-t-4 border-black/[.12] border-t-[#2E4C9B] bg-white p-5">
              <h5 className={`${SERIF} mb-3 text-[19px] font-bold text-black`}>
                Main Cabin
              </h5>
              <p
                className={`${SANS} flex gap-[9px] text-[12.5px] leading-[1.4]`}
              >
                <Check className="h-4 w-4 flex-none" aria-hidden="true" />
                Select and change seats at any time
              </p>
              <Price amount="763" cents="90" />
              <SafUpgrade />
            </div>
            <div className="bg-[linear-gradient(120deg,#1E3F7D,#4A63CD)] p-5 text-white">
              <h5 className={`${SERIF} mb-3 text-[19px] font-bold`}>
                Special Assistance
              </h5>
              <p className={`${SANS} mb-[10px] text-[12px] leading-[1.45]`}>
                Please choose this option only if you fall under these
                categories:
              </p>
              <ul>
                {SPECIAL.map((item) => (
                  <li
                    key={item}
                    className={`${SANS} mb-[7px] flex gap-[9px] text-[12.5px] leading-[1.4]`}
                  >
                    <Check className="h-4 w-4 flex-none" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Price amount="843" cents="90" />
              <SafUpgrade />
            </div>
          </div>
          <div
            className={`${SANS} mt-3 flex items-center gap-1 text-[12px] text-[#333]`}
          >
            <ChevronDown className="h-3 w-3" aria-hidden="true" /> Terms and
            Conditions
          </div>
        </div>
      </Kit>

      <Kit title="Promotional cards">
        <div className="grid grid-cols-1 items-start gap-[22px] md:grid-cols-2">
          {PROMOS.map((promo) => (
            <Img
              key={promo.src}
              image={promo}
              className="w-full rounded-[4px]"
            />
          ))}
        </div>
      </Kit>
    </>
  );
}
