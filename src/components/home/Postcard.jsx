import { useState } from "react";
import { Plane } from "lucide-react";
import HibiscusFlower from "../illustrations/HibiscusFlower";
import { CONTACT_EMAIL } from "../../data/site";
import "./Postcard.css";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

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
    <form className="postcard" onSubmit={send}>
      <div className="pc-head" aria-hidden="true">
        POST CARD
      </div>
      <div className="pc-grid">
        <div className="pc-left">
          <label className="pc-k" htmlFor="pc-msg">
            correspondence
          </label>
          <textarea
            id="pc-msg"
            name="message"
            className="pc-msg"
            required
            maxLength={3000}
            placeholder="Wish you were here…"
            value={message}
            onChange={edit(setMessage)}
          />
          {status === "sent" && (
            <div className="pc-sent" aria-hidden="true">
              sent<small>via air mail</small>
            </div>
          )}
        </div>

        <div className="pc-divider" aria-hidden="true">
          <span>par avion · by air mail</span>
        </div>

        <div className="pc-right">
          <div className="pc-stamps" aria-hidden="true">
            <div className="pc-parvion">
              <span>par avion</span>
              <span>air mail</span>
            </div>
            <div className="pc-stamp">
              <div className="pc-stamp-inner">
                <span className="val">55</span>
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
                <span className="air">AIR MAIL</span>
              </div>
            </div>
            <svg className="pc-postmark" viewBox="0 0 190 86">
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

          <div className="pc-address">
            <div className="pc-line">
              <span className="pc-k">to</span>
              <span className="pc-to">Tanvi Deshpande</span>
            </div>
            <label className="pc-line">
              <span className="pc-k">from</span>
              <input
                name="name"
                autoComplete="name"
                placeholder="your name"
                value={name}
                onChange={edit(setName)}
              />
            </label>
            <label className="pc-line">
              <span className="pc-k">email</span>
              <input
                name="email"
                type="email"
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
              style={{ display: "none" }}
            />
          </div>

          <div className="pc-foot">
            <p
              className={`pc-note${status === "error" ? " err" : ""}`}
              role="status"
              aria-live="polite"
            >
              {note}
            </p>
            <button
              className="pc-send"
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
