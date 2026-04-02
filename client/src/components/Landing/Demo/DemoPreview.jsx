import { QRCodeSVG } from "qrcode.react";

export default function DemoPreview({ demoData, printRef }) {
  const getBadgeAnchorClasses = () => {
    switch (demoData.position) {
      case "top-left":
        return "top-4 left-4 max-w-[280px]";
      case "top-right":
        return "top-4 right-4 max-w-[280px]";
      case "bottom-left":
        return "bottom-4 left-4 max-w-[200px]"; // Restricts width to leave room for QR
      case "bottom-right":
        return "bottom-4 right-[80px] max-w-[200px]"; // Pushes left of the QR
      case "center":
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px]";
      default:
        return "top-4 left-4 max-w-[280px]";
    }
  };

  const getInnerLayoutClasses = () => {
    let layout = demoData.avatarPosition === "right" ? "flex-row-reverse text-right" : demoData.avatarPosition === "top" ? "flex-col text-center" : "flex-row text-left";

    let justify = "justify-start";
    if (demoData.position.includes("right")) justify = "justify-end";
    if (demoData.position === "center") justify = "justify-center";

    return `flex gap-3 items-center w-full ${layout} ${justify}`;
  };

  return (
    <div className="flex justify-center items-center bg-base-200 p-8 rounded-[2rem] border border-base-content/10 min-h-[400px]">
      <div ref={printRef} className="print-target">
        <div className="relative border-2 border-black bg-white overflow-hidden w-[340px] h-[189px] print-badge rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105">
          {demoData.bgImage && <img src={demoData.bgImage} alt="bg" className="absolute inset-0 w-full h-full object-cover z-0" />}

          <div className={`absolute z-20 pointer-events-none ${getBadgeAnchorClasses()}`}>
            <div className={getInnerLayoutClasses()}>
              {demoData.avatar && (
                <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-md bg-base-200 shrink-0">
                  <img src={demoData.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm border border-gray-100 flex-1 overflow-hidden min-w-0">
                <h2 className="text-lg font-bold text-black leading-tight tracking-tight truncate">{demoData.name || "Guest Name"}</h2>
                <p className="text-sm font-bold text-primary mt-0.5 uppercase tracking-wider truncate">{demoData.role || "Role"}</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-50">
            <div className="bg-white p-1.5 rounded-xl shadow-sm border border-black">
              <QRCodeSVG value={`milo://demo/${demoData.name || "empty"}`} size={48} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
