import { QRCodeSVG } from "qrcode.react";

export default function DemoPreview({ demoData }) {
  // Same anchor logic as FinalPreview for consistency
  const getBadgeAnchorClasses = () => {
    switch (demoData.position) {
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
    let layout = demoData.avatarPosition === "right" ? "flex-row-reverse text-right" : demoData.avatarPosition === "top" ? "flex-col text-center" : "flex-row text-left";
    return `flex gap-2 items-center w-full ${layout}`;
  };

  return (
    <div className="sticky top-24 flex flex-col items-center">
      <div className="w-full max-w-sm bg-base-100 rounded-[2.5rem] p-4 shadow-2xl border border-base-content/5">
        <div className="relative aspect-[90/50] w-full bg-white rounded-2xl overflow-hidden shadow-inner border border-base-content/10">
          {/* Background Image */}
          {demoData.bgImage ? (
            <img src={demoData.bgImage} alt="Preview BG" className="absolute inset-0 w-full h-full object-cover z-0" />
          ) : (
            <div className="absolute inset-0 bg-base-200 flex items-center justify-center text-base-content/20 font-bold text-xs uppercase tracking-widest">No Background</div>
          )}

          {/* Identity Layer */}
          <div className={`absolute z-20 ${getBadgeAnchorClasses()}`}>
            <div className={getInnerLayoutClasses()}>
              {/* Profile Picture Toggle */}
              {demoData.showAvatar && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-white bg-base-300 shrink-0 shadow-sm">
                  {demoData.avatar ? (
                    <img src={demoData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                      <span className="text-[8px] font-bold">IMG</span>
                    </div>
                  )}
                </div>
              )}

              {/* Text Information Toggles */}
              {(demoData.showName || demoData.role) && (
                <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-100 flex-1 min-w-0 shadow-sm">
                  {<h2 className="text-[14px] font-extrabold text-black leading-tight truncate">{demoData.name || "GUEST NAME"}</h2>}
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight truncate">{demoData.role || "ATTENDEE"}</p>
                </div>
              )}
            </div>
          </div>

          {/* QR Code */}
          <div className="absolute bottom-3 right-3 z-50">
            <div className="bg-white p-1 rounded-lg border border-gray-100 shadow-sm">
              <QRCodeSVG value={`milo://${demoData.name || "void"}`} size={36} />
            </div>
          </div>
        </div>

        <div className="mt-4 px-4 py-2 bg-base-200/50 rounded-2xl text-[10px] font-bold text-center opacity-50 uppercase tracking-widest">Live Editor Preview</div>
      </div>
    </div>
  );
}
