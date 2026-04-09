import { QRCodeSVG } from "qrcode.react";

const BadgeContent = ({ data, isPlaceholder = false }) => {
  const getBadgeAnchorClasses = () => {
    switch (data.position) {
      case "top-left":
        return "top-3 left-3 max-w-[240px]";
      case "top-right":
        return "top-3 right-3 max-w-[240px]";
      case "bottom-left":
        return "bottom-3 left-3 max-w-[180px]";
      case "bottom-right":
        return "bottom-3 right-[60px] max-w-[180px]";
      case "center":
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px]";
      default:
        return "top-3 left-3 max-w-[240px]";
    }
  };

  return (
    <div className={`w-full h-full relative bg-white ${isPlaceholder ? "opacity-40" : ""}`}>
      {/* BACKGROUND IMAGE FIX: Added 'block' and 'object-fit' specifically for printer engines */}
      {data.bgImage && <img src={data.bgImage} className="absolute inset-0 w-full h-full object-cover block z-0" style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }} />}

      <div className={`absolute z-20 ${getBadgeAnchorClasses()}`}>
        <div className={`flex gap-2 items-center w-full ${data.avatarPosition === "right" ? "flex-row-reverse" : "flex-row"}`}>
          {data.showAvatar && data.avatar && (
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white bg-white shrink-0 shadow-sm z-30">
              <img src={data.avatar} className="w-full h-full object-cover block" />
            </div>
          )}

          {/* Conditional Name Rendering */}
          {data.role && (
            <div className="bg-white/95 px-2 py-1 rounded-lg border border-gray-100 flex-1 min-w-0 shadow-sm z-30">
              {<h2 className="text-[14px] font-extrabold text-black leading-tight truncate">{data.name || "GUEST NAME"}</h2>}
              <p className="text-[10px] font-bold text-gray-700 uppercase tracking-tight truncate">{data.role || "ATTENDEE"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-3 right-3 z-50">
        <div className="bg-white p-1 rounded-lg border border-gray-100 shadow-sm">
          <QRCodeSVG value={`milo://${data.name || "void"}`} size={36} />
        </div>
      </div>
    </div>
  );
};

export default function FinalPreview({ demoData, setIsPreviewMode, handlePrint }) {
  const placeholderData = { ...demoData, name: "SAMPLE NAME", role: "EVENT STAFF", avatar: null };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="print:hidden mb-8 border border-gray-200 bg-white overflow-hidden w-[340px] h-[189px] rounded-2xl shadow-2xl">
        <BadgeContent data={demoData} />
      </div>

      <div className="flex gap-4 mb-10 print:hidden">
        <button onClick={() => setIsPreviewMode(false)} className="btn btn-ghost rounded-full px-8">
          Back
        </button>
        <button onClick={handlePrint} className="btn btn-primary rounded-full px-8 text-white shadow-lg">
          Print Sheet
        </button>
      </div>

      {/* PRINT GRID: Visible only during window.print() */}
      <div className="hidden print:grid print:grid-cols-2 print:gap-[10mm] print:w-[190mm] print:mx-auto">
        <div className="w-[90mm] h-[50mm] border border-gray-100 rounded-2xl overflow-hidden relative">
          <BadgeContent data={demoData} />
        </div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-[90mm] h-[50mm] border border-gray-100 rounded-2xl overflow-hidden relative">
            <BadgeContent data={placeholderData} isPlaceholder={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
