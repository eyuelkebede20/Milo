import { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { decodeFaydaBase64 } from "../../utils/faydaDecoder";
import api from "../../api/axiosInstance";

export default function FaydaScanner({ eventSlug }) {
  const [step, setStep] = useState("scan"); // scan | confirm
  const [loading, setLoading] = useState(false);
  const [decodedData, setDecodedData] = useState(null);
  const [extraData, setExtraData] = useState({
    phone: "",
    emergencyContact: "",
  });

  useEffect(() => {
    if (step === "scan") {
      const scanner = new Html5QrcodeScanner("fayda-reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scanner.render(onScanSuccess, (err) => {});
      return () => scanner.clear();
    }
  }, [step]);

  const onScanSuccess = (decodedText) => {
    const data = decodeFaydaBase64(decodedText);
    if (data) {
      setDecodedData(data);
      setStep("confirm");
    } else {
      alert("Invalid Fayda QR Code");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Use html5-qr-code to scan an image file
    const html5QrCode = new Html5QrcodeScanner("fayda-reader", { fps: 10 });
    html5QrCode
      .scanFile(file, true)
      .then(onScanSuccess)
      .catch((err) => alert("Could not find QR code in image"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/guests/register", {
        type: "fayda",
        eventSlug,
        faydaBase64: decodedData.rawBase64, // Assume decoder keeps original string
        phone: extraData.phone,
        emergencyContact: extraData.emergencyContact,
      });
      alert("Registration Successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (step === "scan") {
    return (
      <div className="space-y-4">
        <div id="fayda-reader" className="border-4 border-base-content overflow-hidden rounded-none"></div>
        <div className="divider font-black">OR UPLOAD IMAGE</div>
        <input type="file" accept="image/*" onChange={handleFileUpload} className="file-input file-input-bordered border-2 border-base-content w-full rounded-none" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-300">
      <div className="bg-primary/10 p-4 border-2 border-primary border-dashed">
        <p className="text-xs font-black uppercase text-primary">Identity Verified</p>
        <h3 className="text-xl font-black">{decodedData.name}</h3>
        <p className="text-sm opacity-70">DOB: {decodedData.dob}</p>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-black uppercase">Your Phone *</span>
        </label>
        <input
          type="tel"
          required
          className="input input-bordered border-2 border-base-content rounded-none"
          placeholder="+251..."
          value={extraData.phone}
          onChange={(e) => setExtraData({ ...extraData, phone: e.target.value })}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-black uppercase">Emergency Contact *</span>
        </label>
        <input
          type="tel"
          required
          className="input input-bordered border-2 border-base-content rounded-none"
          placeholder="Name or Number"
          value={extraData.emergencyContact}
          onChange={(e) => setExtraData({ ...extraData, emergencyContact: e.target.value })}
        />
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={() => setStep("scan")} className="btn btn-ghost border-2 border-base-content rounded-none flex-1 font-black">
          RE-SCAN
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary border-2 border-base-content shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none flex-[2] font-black uppercase ${loading ? "loading" : ""}`}
        >
          Complete Registration
        </button>
      </div>
    </form>
  );
}
