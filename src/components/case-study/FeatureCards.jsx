// A row of numbered cards: items are { number, title, text, image? }.
// `image` ({ src, width, height, alt }) sits in a white panel across the top of its card.
export default function FeatureCards({ items }) {
  return (
    <div className="mb-[30px] mt-[22px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
      {items.map(({ number, title, text, image }) => (
        <div
          key={title}
          className="relative overflow-hidden rounded-[10px] border border-black/[.08] bg-paper"
        >
          {image && (
            <div className="border-b border-black/[.07] bg-white p-3">
              <img
                className="block h-auto w-full"
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                loading="lazy"
              />
            </div>
          )}
          <div className="px-[22px] py-5">
            <div className="font-mono text-[10px] tracking-[1.5px] text-gold">
              {number}
            </div>
            <h4 className="mb-2 mt-[6px] font-fraunces text-[19px] font-semibold">
              {title}
            </h4>
            <p className="text-[13.5px] text-muted">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
