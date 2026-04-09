import { QRCodeSVG } from "qrcode.react";

const BadgeContent = ({ data }) => {
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

  const getInnerLayoutClasses = () => {
    let layout = data.avatarPosition === "right" ? "flex-row-reverse text-right" : data.avatarPosition === "top" ? "flex-col text-center" : "flex-row text-left";
    return `flex gap-2 items-center w-full ${layout}`;
  };

  return (
    <div className="w-full h-full relative">
      {data.bgImage && <img src={data.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />}

      <div className={`absolute z-20 ${getBadgeAnchorClasses()}`}>
        <div className={getInnerLayoutClasses()}>
          {data.showAvatar && data.avatar && (
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white bg-white shrink-0 shadow-sm">
              <img src={data.avatar} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="bg-white/95 px-2 py-1 rounded-lg border border-gray-100 flex-1 min-w-0 shadow-sm">
            <h2 className="text-[14px] font-extrabold text-black leading-tight truncate">{data.name || "GUEST NAME"}</h2>
            <p className="text-[10px] font-bold text-gray-700 uppercase tracking-tight truncate">{data.role || "ATTENDEE"}</p>
          </div>
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
  // Mock data for placeholders
  const placeholderData = {
    ...demoData,
    name: "SAMPLE NAME",
    role: "EVENT STAFF",
    avatar: null, // placeholders usually don't have unique images in this mock
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* SCREEN UI */}
      <div className="mb-8 relative border border-gray-200 bg-white overflow-hidden w-[340px] h-[189px] rounded-2xl shadow-2xl">
        <BadgeContent data={demoData} />
      </div>

      <div className="flex gap-4 mb-10 no-print">
        <button onClick={() => setIsPreviewMode(false)} className="btn btn-ghost rounded-full px-8 border-base-content/20">
          Edit Layout
        </button>
        <button onClick={handlePrint} className="btn btn-primary rounded-full px-8 text-white shadow-lg">
          Generate A4 Sheet
        </button>
      </div>

      {/* HIDDEN PRINT CONTAINER */}
      <div id="a4-print-container" className="hidden">
        {/* 1 Real Card */}
        <div className="badge-unit">
          <BadgeContent data={demoData} />
        </div>
        {/* 7 Placeholders */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="badge-unit opacity-40">
            <BadgeContent data={placeholderData} />
          </div>
        ))}
      </div>
    </div>
  );
}
