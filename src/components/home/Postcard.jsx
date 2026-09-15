import { useState } from "react";
import { Plane } from "lucide-react";
import HibiscusFlower from "../illustrations/HibiscusFlower";
import { CONTACT_EMAIL } from "../../data/site";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const LABEL =
  "shrink-0 font-mono text-[9px] uppercase tracking-[2px] text-muted";
const LINE =
  "flex min-h-[42px] items-baseline gap-[10px] border-b-[1.5px] border-[rgba(18,59,54,.4)] pt-2 [transition:border-color_.2s] focus-within:border-airmail";
const INPUT =
  "min-w-0 flex-1 border-0 bg-transparent font-hand text-[25px] leading-[1.2] text-pen outline-none placeholder:text-[rgba(35,68,154,.38)]";

export default function Postcard() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const edit = (setter) => (e) => {
    setter(e.target.value);
    if (status === "sent" || status === "error") setStatus("idle");
  };

  const send = async (e) => {
    e.preventDefault();
    const subject = `Postcard from ${name.trim() || "a portfolio visitor"}`;

    if (!WEB3FORMS_KEY) {
      const body = `${message}\n\n— ${name.trim() || "A portfolio visitor"} (${email})`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: name.trim() || "Portfolio visitor",
          email,
          message,
          botcheck: e.currentTarget.botcheck.checked,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus("sent");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const note = {
    idle: "write on the lines, then drop it in the mailbox.",
    sending: "stamping & sorting…",
    sent: "postmarked! Tanvi will write back soon.",
    error: `the mail truck broke down. try again, or email ${CONTACT_EMAIL}.`,
  }[status];

  return (
    <form
      className="postcard-paper relative flex flex-col rounded-[3px] bg-[#FBF6EA] px-5 pb-6 pt-[22px] shadow-[0_1px_1px_rgba(0,0,0,.08),0_12px_22px_-10px_rgba(0,0,0,.22),0_34px_56px_-32px_rgba(0,0,0,.4)] md:aspect-[3/2] md:rotate-[-.6deg] md:px-[34px] md:pb-7 md:pt-[26px]"
      onSubmit={send}
    >
      <div
        className="mb-[14px] pl-2 text-center font-fraunces text-[18px] font-bold tracking-[8px] md:pl-3 md:text-[22px] md:tracking-[12px]"
        aria-hidden="true"
      >
        POST CARD
      </div>

      {/* stacked on phones; message | divider | address on desktop */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-[18px] md:grid-cols-[1fr_auto_1fr] md:gap-x-[30px] md:gap-y-0">
        {/* ---------- message ---------- */}
        <div className="relative flex min-h-0 flex-col gap-[6px]">
          <label className={LABEL} htmlFor="pc-msg">
            correspondence
          </label>
          <textarea
            id="pc-msg"
            name="message"
            className="lined-paper min-h-[204px] w-full flex-1 resize-none border-0 px-1 font-hand text-[25px] leading-[34px] text-pen outline-none placeholder:text-[rgba(35,68,154,.38)] focus-visible:bg-[rgba(255,197,61,.08)]"
            required
            maxLength={3000}
            placeholder="Wish you were here…"
            value={message}
            onChange={edit(setMessage)}
          />
          {status === "sent" && (
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] animate-thunk rounded-[8px] border-4 border-double border-airmail px-5 py-[10px] text-center font-mono text-[20px] font-bold uppercase leading-[1.3] tracking-[5px] text-airmail opacity-[.85] mix-blend-multiply [transform:translate(-50%,-50%)_rotate(-14deg)]"
              aria-hidden="true"
            >
              sent
              <small className="block text-[9px] tracking-[2px]">
                via air mail
              </small>
            </div>
          )}
        </div>

        <div
          className="relative flex h-[1.5px] items-center justify-center bg-[rgba(18,59,54,.4)] md:h-auto md:w-[1.5px]"
          aria-hidden="true"
        >
          <span className="whitespace-nowrap bg-[#FBF6EA] px-[10px] font-mono text-[8px] uppercase tracking-[3px] text-muted md:rotate-180 md:px-0 md:py-[10px] md:[writing-mode:vertical-rl]">
            par avion · by air mail
          </span>
        </div>

        {/* ---------- stamp, address, send ---------- */}
        <div className="flex min-w-0 flex-col">
          <div className="relative h-[124px] shrink-0" aria-hidden="true">
            <div className="absolute left-0 top-2 flex border-[1.5px] border-navy-deep font-mono text-[8px] font-bold uppercase tracking-[1.5px]">
              <span className="bg-navy-deep px-[6px] py-[3px] text-paper">
                par avion
              </span>
              <span className="px-[6px] py-[3px] text-navy-deep">air mail</span>
            </div>

            <div className="stamp-perforation absolute right-0 top-0 h-[104px] w-[88px] rotate-[3deg] bg-paper p-1">
              <div className="relative m-[3px] h-[calc(100%-6px)] overflow-hidden bg-[linear-gradient(180deg,#FF5D8F_0%,#FF9C8A_55%,#FFC53D_100%)]">
                <span className="absolute left-[6px] top-1 font-fraunces text-[18px] font-bold leading-none text-paper">
                  55
                </span>
                <HibiscusFlower
                  uid="pc-stamp"
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 8,
                    width: 60,
                    height: 60,
                  }}
                />
                <span className="absolute inset-x-0 bottom-1 text-center font-mono text-[7px] font-bold tracking-[1.5px] text-ink">
                  AIR MAIL
                </span>
              </div>
            </div>

            <svg
              className="pointer-events-none absolute right-[46px] top-[22px] h-[86px] w-[190px] text-ink opacity-50 mix-blend-multiply"
              viewBox="0 0 190 86"
            >
              <g fill="none" stroke="currentColor" strokeWidth="2">
                {[22, 34, 46, 58].map((y) => (
                  <path
                    key={y}
                    d={`M0 ${y} q12 -6 24 0 t24 0 t24 0 t24 0 t14 0`}
                  />
                ))}
                <circle cx="148" cy="42" r="36" />
                <circle cx="148" cy="42" r="30" strokeWidth="1" />
              </g>
              <text
                x="148"
                y="39"
                textAnchor="middle"
                fontSize="9"
                fontFamily="Space Mono, monospace"
                fill="currentColor"
                letterSpacing="1"
              >
                TANVI · D
              </text>
              <text
                x="148"
                y="53"
                textAnchor="middle"
                fontSize="11"
                fontFamily="Space Mono, monospace"
                fontWeight="700"
                fill="currentColor"
              >
                2026
              </text>
            </svg>
          </div>

          <div className="flex flex-col md:mt-auto">
            <div className={LINE}>
              <span className={LABEL}>to</span>
              <span className="font-fraunces text-[18px] font-semibold">
                Tanvi Deshpande
              </span>
            </div>
            <label className={LINE}>
              <span className={LABEL}>from</span>
              <input
                name="name"
                className={INPUT}
                autoComplete="name"
                placeholder="your name"
                value={name}
                onChange={edit(setName)}
              />
            </label>
            <label className={LINE}>
              <span className={LABEL}>email</span>
              <input
                name="email"
                type="email"
                className={INPUT}
                required
                autoComplete="email"
                placeholder="so I can write back"
                value={email}
                onChange={edit(setEmail)}
              />
            </label>
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />
          </div>

          <div className="mt-[18px] flex flex-col-reverse items-end justify-between gap-4 md:flex-row md:items-center">
            <p
              className={`self-stretch font-mono text-[10px] leading-[1.5] tracking-[.5px] md:self-auto ${status === "error" ? "text-[#C7362C]" : "text-muted"}`}
              role="status"
              aria-live="polite"
            >
              {note}
            </p>
            <button
              className="inline-flex shrink-0 rotate-[-2deg] items-center gap-2 rounded-[999px] border-2 border-airmail px-[18px] py-[10px] font-mono text-[12px] font-bold uppercase tracking-[3px] text-airmail [transition:background_.2s,color_.2s,transform_.2s] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold enabled:hover:rotate-0 enabled:hover:bg-airmail enabled:hover:text-paper disabled:cursor-progress disabled:opacity-60"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                "sending"
              ) : status === "sent" ? (
                "sent ✓"
              ) : (
                <>
                  send <Plane size={14} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
