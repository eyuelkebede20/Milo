import { QRCodeSVG } from "qrcode.react";

export default function FinalPreview({ demoData, setIsPreviewMode, handlePrint }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      <div className="mb-8 screen-only">
        <Badge />
      </div>

      <div className="print-a4-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <Badge key={i} />
        ))}
      </div>

      <div className="flex gap-4 no-print">
        <button onClick={() => setIsPreviewMode(false)} className="btn btn-ghost rounded-full font-bold border border-base-content/10 px-8">
          Edit Layout
        </button>
        <button onClick={handlePrint} className="btn btn-primary rounded-full font-bold text-white shadow-lg shadow-primary/30 px-8">
          Print Render
        </button>
      </div>
    </div>
  );
}
