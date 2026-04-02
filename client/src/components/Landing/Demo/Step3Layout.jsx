import { Type, ArrowUpLeft, ArrowUpRight, ArrowDownLeft, ArrowDownRight, AlignCenter, AlignLeft, AlignRight, AlignVerticalJustifyCenter } from "lucide-react";

export default function Step3Layout({ demoData, setDemoData, setStep, setIsPreviewMode }) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Type className="text-primary" />
        <h3 className="font-bold text-xl">Layout & Print</h3>
      </div>

      <div className="flex flex-col gap-6 bg-base-100 p-6 rounded-2xl border border-base-content/10">
        {/* Avatar Relative Placement */}
        <div className="w-full text-center">
          <p className="text-sm font-bold opacity-70 uppercase tracking-widest mb-3">Avatar Layout</p>
          <div className="flex justify-center gap-2 bg-base-200 p-2 rounded-xl">
            <button onClick={() => setDemoData({ ...demoData, avatarPosition: "left" })} className={`btn btn-sm flex-1 ${demoData.avatarPosition === "left" ? "btn-primary text-white" : "btn-ghost"}`}>
              <AlignLeft size={16} /> Left
            </button>
            <button onClick={() => setDemoData({ ...demoData, avatarPosition: "top" })} className={`btn btn-sm flex-1 ${demoData.avatarPosition === "top" ? "btn-primary text-white" : "btn-ghost"}`}>
              <AlignVerticalJustifyCenter size={16} /> Top
            </button>
            <button
              onClick={() => setDemoData({ ...demoData, avatarPosition: "right" })}
              className={`btn btn-sm flex-1 ${demoData.avatarPosition === "right" ? "btn-primary text-white" : "btn-ghost"}`}
            >
              <AlignRight size={16} /> Right
            </button>
          </div>
        </div>

        {/* Badge Corner Placement */}
        <div className="w-full text-center border-t border-base-content/10 pt-4">
          <p className="text-sm font-bold opacity-70 uppercase tracking-widest mb-3">Badge Alignment</p>
          <div className="flex flex-wrap justify-center gap-2 bg-base-200 p-2 rounded-xl w-max mx-auto">
            <button onClick={() => setDemoData({ ...demoData, position: "top-left" })} className={`btn btn-square btn-sm ${demoData.position === "top-left" ? "btn-primary text-white" : "btn-ghost"}`}>
              <ArrowUpLeft size={18} />
            </button>
            <button
              onClick={() => setDemoData({ ...demoData, position: "top-right" })}
              className={`btn btn-square btn-sm ${demoData.position === "top-right" ? "btn-primary text-white" : "btn-ghost"}`}
            >
              <ArrowUpRight size={18} />
            </button>
            <button onClick={() => setDemoData({ ...demoData, position: "center" })} className={`btn btn-square btn-sm ${demoData.position === "center" ? "btn-primary text-white" : "btn-ghost"}`}>
              <AlignCenter size={18} />
            </button>
            <button
              onClick={() => setDemoData({ ...demoData, position: "bottom-left" })}
              className={`btn btn-square btn-sm ${demoData.position === "bottom-left" ? "btn-primary text-white" : "btn-ghost"}`}
            >
              <ArrowDownLeft size={18} />
            </button>
            <button
              onClick={() => setDemoData({ ...demoData, position: "bottom-right" })}
              className={`btn btn-square btn-sm ${demoData.position === "bottom-right" ? "btn-primary text-white" : "btn-ghost"}`}
            >
              <ArrowDownRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-base-content/10">
        <button onClick={() => setStep(2)} className="btn btn-ghost rounded-full font-bold border border-base-content/10">
          Back
        </button>
        <button onClick={() => setIsPreviewMode(true)} className="btn btn-primary flex-1 rounded-full font-bold text-white shadow-lg shadow-primary/30">
          Preview ID
        </button>
      </div>
    </div>
  );
}
