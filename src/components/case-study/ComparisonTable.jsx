import "./case-study.css";

const RATING_COLORS = { yes: "#2FA968", mid: "#FFC53D", no: "#FF5A4E" };

// columns: header labels. rows: [criterion, ...ratings] where each rating is "yes" | "mid" | "no".
export default function ComparisonTable({ columns, rows }) {
  return (
    <>
      <table className="comp">
        <thead>
          <tr>
            {columns.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([criterion, ...ratings]) => (
            <tr key={criterion}>
              <td>{criterion}</td>
              {ratings.map((rating, i) => (
                <td key={i}>
                  <span
                    className="dotm"
                    style={{ background: RATING_COLORS[rating] }}
                    title={rating}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="legend">
        <span>
          <i className="dotm" style={{ background: RATING_COLORS.yes }} />
          strong
        </span>
        <span>
          <i className="dotm" style={{ background: RATING_COLORS.mid }} />
          partial
        </span>
        <span>
          <i className="dotm" style={{ background: RATING_COLORS.no }} />
          weak
        </span>
      </div>
    </>
  );
}
