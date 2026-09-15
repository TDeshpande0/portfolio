import { usePointerVelocity } from "../../hooks/usePointerVelocity";
import LuggageTag from "./LuggageTag";

export default function SkillTags({ tags }) {
  const pointer = usePointerVelocity();

  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-8">
      {tags.map((t) => (
        <LuggageTag key={t.code} {...t} pointer={pointer} />
      ))}
    </div>
  );
}
