// Colours and tilts cycle every four notes, like a wall of affinity-mapping stickies.
const NOTES = [
  "rotate-[-2deg] bg-[#FFE8A3]",
  "rotate-[1.5deg] bg-[#B7E8D6]",
  "rotate-[-1deg] bg-[#FFD1C7]",
  "rotate-[2deg] bg-[#D7DAF5]",
];

export default function StickyNotes({ notes }) {
  return (
    <div className="mt-[22px] flex flex-wrap gap-[14px]">
      {notes.map((note, i) => (
        <div
          key={note}
          className={`min-h-[90px] w-[130px] rounded-[3px] px-[14px] py-3 text-[12px] leading-[1.5] shadow-[2px_4px_8px_-3px_rgba(0,0,0,.19)] ${NOTES[i % NOTES.length]}`}
        >
          {note}
        </div>
      ))}
    </div>
  );
}
