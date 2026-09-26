// Every page's footer: the page's own line, then the copyright.
export default function SiteFooter({ children }) {
  return (
    <footer className="bg-kraft-deep p-[34px] text-center font-mono text-[11px] tracking-[1px] text-muted">
      <div>{children}</div>
      {/* Space Mono draws © small and raised, so the symbol uses Work Sans at a matching size */}
      <div className="mt-2 inline-flex items-center justify-center gap-[6px]">
        <span className="font-sans text-[15px] leading-none">©</span>
        2026 Tanvi Deshpande
      </div>
    </footer>
  );
}
