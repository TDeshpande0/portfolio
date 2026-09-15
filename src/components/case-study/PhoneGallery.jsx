// A wrapping row of phone-framed screenshots. `shots` are { src, width, height, alt, caption }.
// `followsRow` tightens the gap above when it continues a previous row of phones.
export default function PhoneGallery({ shots, followsRow = false }) {
  return (
    <div
      className={`mb-[10px] flex flex-wrap justify-center gap-x-4 gap-y-5 md:justify-start md:gap-x-[22px] md:gap-y-[26px] ${followsRow ? "mt-[6px]" : "mt-[22px]"}`}
    >
      {shots.map((shot) => (
        <div key={shot.src} className="w-[150px] md:w-[186px]">
          <div className="relative rounded-[26px] bg-[#141C2B] p-[7px] shadow-[0_14px_28px_-16px_rgba(0,0,0,.5)] before:absolute before:left-1/2 before:top-[13px] before:z-[2] before:h-[5px] before:w-[52px] before:-translate-x-1/2 before:rounded-[3px] before:bg-white/[.35] before:content-['']">
            <img
              className="block h-auto w-full rounded-[20px]"
              src={shot.src}
              width={shot.width}
              height={shot.height}
              alt={shot.alt}
              loading="lazy"
            />
          </div>
          <p className="mt-[9px] text-center font-mono text-[9px] leading-[1.45] tracking-[.8px] text-muted">
            {shot.caption}
          </p>
        </div>
      ))}
    </div>
  );
}
