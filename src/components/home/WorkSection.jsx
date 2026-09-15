import { useFlight } from "../../hooks/useFlight";
import BoardingPass from "./BoardingPass";

export default function WorkSection({ projects }) {
  const flyTo = useFlight();

  return (
    <div className="bg-navy-deep px-5 py-[74px] md:px-10" id="work">
      <div className="mx-auto max-w-[1000px]">
        <h2 className="mb-10 max-w-[20ch] font-fraunces text-[36px] font-medium italic text-paper">
          Every project, a route flown.
        </h2>
        <div className="flex flex-col gap-6">
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
