import { Image as ImageIcon } from "lucide-react";

export default function Step1Background({ demoData, handleImageUpload, setStep }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <ImageIcon className="text-primary" />
        <h3 className="font-bold text-xl">Upload Background</h3>
      </div>
      <p className="text-sm opacity-70 mb-4">Select a 90x50mm landscape image for the badge base.</p>

      <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input file-input-bordered file-input-primary w-full rounded-2xl bg-base-100" />

      <button onClick={() => setStep(2)} disabled={!demoData.bgImage} className="btn btn-primary w-full rounded-full font-bold text-white mt-4">
        Next Step
      </button>
    </div>
  );
}
