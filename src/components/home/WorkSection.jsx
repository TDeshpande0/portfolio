import { useFlight } from "../../hooks/useFlight";
import BoardingPass from "./BoardingPass";
import "./WorkSection.css";

export default function WorkSection({ projects }) {
  const flyTo = useFlight();

  return (
    <div className="dark" id="work">
      <div className="inner">
        <h2>Every project, a route flown.</h2>
        <div className="bpasses">
          {projects.map((p) => (
            <BoardingPass
              key={p.from}
              {...p}
              onOpen={p.href ? () => flyTo(p.href) : null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
