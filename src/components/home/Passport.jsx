import "./Passport.css";

export default function Passport({ fields }) {
  const corners = [
    { top: 26, left: 22, borderWidth: "2px 0 0 2px" },
    { top: 26, right: 22, borderWidth: "2px 2px 0 0" },
    { bottom: 44, left: 22, borderWidth: "0 0 2px 2px" },
    { bottom: 44, right: 22, borderWidth: "0 2px 2px 0" },
  ];
  return (
    <div className="passport">
      <span className="perf" />
      <div className="pp-head">
        <div className="country">ABOUT ME</div>
        <div className="doctype">
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <g fill="none" stroke="#FFC53D" strokeWidth="1.3">
              <path d="M13 4 C9 8,9 16,13 21" />
              <path d="M13 4 C17 8,17 16,13 21" />
              <path d="M9 6 L11 7 M8 9 L10.5 9.5 M7.5 12 L10 12.5 M8 15 L10.5 14.5 M9 18 L11 17" />
              <path d="M17 6 L15 7 M18 9 L15.5 9.5 M18.5 12 L16 12.5 M18 15 L15.5 14.5 M17 18 L15 17" />
            </g>
          </svg>
          <div className="title">PASSPORT</div>
        </div>
        <div className="docno">NO. DR—0000001</div>
      </div>

      <div className="pp-body">
        <div className="pp-data">
          <div className="kicker">type P · code DES · design</div>
          {fields.map(([k, v]) => (
            <div className="field" key={k}>
              <div className="k">{k}</div>
              <div className="v">{v}</div>
            </div>
          ))}
          <div className="sigrow">
            <div>
              <div className="sig">Tanvi Deshpande</div>
              <div className="tiny">holder’s signature</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                aria-hidden="true"
              >
                <rect width="22" height="16" rx="2" fill="#FFC53D" />
                <g fill="none" stroke="#7A5A12" strokeWidth="1">
                  <path d="M11 4 a4 4 0 0 1 0 8" />
                  <path d="M11 6 a2 2 0 0 1 0 4" />
                </g>
              </svg>
              <div className="tiny" style={{ marginTop: 0 }}>
                e‑passport
              </div>
            </div>
          </div>
        </div>

        <div className="photo-side">
          <div className="approved">
            designer
            <br />
            approved
          </div>
          {corners.map((c, i) => (
            <span className="corner" key={i} style={c} />
          ))}
          <div className="idphoto">
            {["01", "02", "03"].map((n) => (
              <div className="frame" key={n}>
                <span>{n}</span>
              </div>
            ))}
            <div className="cap">photobooth co. · official photo</div>
          </div>
        </div>

        <div className="mrz">
          P&lt;DESIGNERXX&lt;&lt;TANVI&lt;DESHPANDE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          <br />
          DR0000001DES0001019X0000000&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;02
        </div>
      </div>
    </div>
  );
}
