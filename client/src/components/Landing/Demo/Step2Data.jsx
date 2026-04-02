import { User, Upload } from "lucide-react";

export default function Step2Data({ demoData, setDemoData, inputMode, setInputMode, handleQRImageUpload, handleDecode, loadDummyFayda, error, setStep }) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <User className="text-primary" />
        <h3 className="font-bold text-xl">Guest Identity</h3>
      </div>

      <div className="flex gap-2 p-1 bg-base-300 rounded-2xl">
        <button
          className={`flex-1 btn btn-sm rounded-xl font-bold ${inputMode === "manual" ? "btn-primary text-white shadow-sm" : "btn-ghost"}`}
          onClick={() => {
            setInputMode("manual");
            setDemoData({ ...demoData, avatar: null, faydaString: "" });
          }}
        >
          Manual Input
        </button>
        <button className={`flex-1 btn btn-sm rounded-xl font-bold ${inputMode === "fayda" ? "btn-primary text-white shadow-sm" : "btn-ghost"}`} onClick={() => setInputMode("fayda")}>
          Fayda QR
        </button>
      </div>

      {inputMode === "manual" ? (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full rounded-2xl focus:border-primary bg-base-100"
            value={demoData.name}
            onChange={(e) => setDemoData({ ...demoData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role (e.g. Speaker, VIP)"
            className="input input-bordered w-full rounded-2xl focus:border-primary bg-base-100"
            value={demoData.role}
            onChange={(e) => setDemoData({ ...demoData, role: e.target.value })}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {demoData.avatar ? (
            <div className="bg-base-100 p-4 rounded-2xl border border-base-content/10 flex items-center gap-4">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full border-2 border-primary">
                  <img src={demoData.avatar} alt="Extracted" />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold opacity-50 uppercase">Extracted Identity</p>
                <p className="font-bold text-lg leading-none">{demoData.name}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm opacity-70">Scan or upload Fayda QR to extract profile data.</p>

              <div className="flex items-center gap-2 mb-2">
                <label className="btn btn-outline btn-sm rounded-full border-base-content/20 flex-1 cursor-pointer">
                  <Upload size={14} className="mr-1" /> Upload QR Image
                  <input type="file" accept="image/*" onChange={handleQRImageUpload} className="hidden" />
                </label>
                <button onClick={loadDummyFayda} className="btn btn-outline btn-sm rounded-full border-base-content/20 flex-1">
                  Load Test ID
                </button>
              </div>

              <textarea
                className="textarea textarea-bordered w-full rounded-2xl focus:border-primary bg-base-100 font-mono text-xs"
                placeholder="Or paste QR Scanner Output String here..."
                value={demoData.faydaString}
                onChange={(e) => {
                  setDemoData({ ...demoData, faydaString: e.target.value });
                  handleDecode(e.target.value);
                }}
              />
            </div>
          )}

          <input
            type="text"
            placeholder="Role (e.g. Speaker, VIP)"
            className="input input-bordered w-full rounded-2xl focus:border-primary bg-base-100"
            value={demoData.role}
            onChange={(e) => setDemoData({ ...demoData, role: e.target.value })}
          />
        </div>
      )}

      {error && <p className="text-error font-bold text-sm">{error}</p>}

      <div className="flex gap-3 pt-2 border-t border-base-content/10 mt-6">
        <button onClick={() => setStep(1)} className="btn btn-ghost rounded-full font-bold border border-base-content/10">
          Back
        </button>
        <button onClick={() => setStep(3)} disabled={!demoData.name || !demoData.role} className="btn btn-primary flex-1 rounded-full font-bold text-white">
          Next Step
        </button>
      </div>
    </div>
  );
}
