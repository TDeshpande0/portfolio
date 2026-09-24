import { Dialog, DialogPanel } from "@headlessui/react";

// Full-screen view of a diagram or image; scrolls when the content is larger than the screen.
export default function Lightbox({ open, onClose, label, children }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-[9998]">
      <div className="fixed inset-0 bg-navy-deep/[.96]" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <DialogPanel
          aria-label={label}
          className="relative max-h-[92vh] max-w-[96vw] overflow-auto rounded-[12px] bg-paper p-4"
        >
          <button
            type="button"
            onClick={onClose}
            className="sticky left-full top-0 z-[4] float-right rounded-[6px] bg-airmail px-3 py-[6px] font-mono text-[12px] text-white"
          >
            CLOSE ×
          </button>
          <div className="min-w-[1200px] [&>*]:h-auto [&>*]:w-full">
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
