const RATING_COLORS = { yes: "#2FA968", mid: "#FFC53D", no: "#FF5A4E" };
const LEGEND = [
  ["yes", "strong"],
  ["mid", "partial"],
  ["no", "weak"],
];

const CELL =
  "border-b border-[rgba(15,59,53,.07)] px-[14px] py-3 text-center first:text-left";
const DOT = "inline-block h-[9px] w-[9px] rounded-full";

// columns: header labels. rows: [criterion, ...ratings] where each rating is "yes" | "mid" | "no".
export default function ComparisonTable({ columns, rows }) {
  return (
    <>
      <table className="w-full border-collapse overflow-hidden rounded-[10px] bg-paper shadow-[0_14px_28px_-22px_rgba(0,0,0,.3)]">
        <thead>
          <tr>
            {columns.map((h) => (
              <th
                className={`${CELL} bg-kraft-deep font-mono text-[10px] uppercase tracking-[1px] text-navy-deep`}
                key={h}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([criterion, ...ratings]) => (
            <tr key={criterion}>
              <td className={`${CELL} text-[13px]`}>{criterion}</td>
              {ratings.map((rating, i) => (
                <td className={`${CELL} text-[13px]`} key={i}>
                  <span
                    className={DOT}
                    style={{ background: RATING_COLORS[rating] }}
                    title={rating}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[10px] flex gap-4 font-mono text-[10px] text-muted">
        {LEGEND.map(([rating, label]) => (
          <span className="flex items-center gap-[6px]" key={rating}>
            <i className={DOT} style={{ background: RATING_COLORS[rating] }} />
            {label}
          </span>
        ))}
      </div>
    </>
  );
}
