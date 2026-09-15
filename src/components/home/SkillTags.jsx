import { usePointerVelocity } from "../../hooks/usePointerVelocity";
import LuggageTag from "./LuggageTag";
import "./SkillTags.css";

export default function SkillTags({ tags }) {
  const pointer = usePointerVelocity();

  return (
    <div className="tags">
      {tags.map((t) => (
        <LuggageTag key={t.code} {...t} pointer={pointer} />
      ))}
    </div>
  );
}
