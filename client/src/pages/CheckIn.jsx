import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../api/axiosInstance";

export default function CheckIn() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(handleScan, (err) => {
      // Ignore constant scanning noise/errors
    });

    return () => scanner.clear();
  }, []);

  const handleScan = async (decodedText) => {
    // Expected format: milo://event/{eventId}/guest/{guestId}
    const regex = /milo:\/\/event\/(.+)\/guest\/(.+)/;
    const match = decodedText.match(regex);

    if (!match) {
      setError("Invalid QR Code Format");
      return;
    }

    const [_, scannedEventId, guestId] = match;

    if (scannedEventId !== eventId) {
      setError("This guest belongs to a different event.");
      return;
    }

    processCheckIn(guestId);
  };

  const processCheckIn = async (guestId) => {
    setLoading(true);
    setError(null);
    try {
      // Endpoint matches the one defined in our backend routes
      const { data } = await api.post(`/admin/checkin/${eventId}/${guestId}`);
      setScanResult(data);

      // Feedback sound (Optional)
      const audio = new Audio("/success-beep.mp3");
      audio.play().catch(() => {});
    } catch (err) {
      setError(err.response?.data?.error || "Check-in failed");
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setError(null);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center bg-base-100 p-4 border-4 border-base-content shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div>
          <h1 className="text-2xl font-black uppercase italic tracking-tighter">Scanner Mode</h1>
          <p className="text-xs font-mono opacity-60">EVENT_ID: {eventId.slice(-6).toUpperCase()}</p>
        </div>
        <button onClick={() => navigate("/dashboard")} className="btn btn-sm btn-ghost border-2 border-base-content rounded-none font-black">
          EXIT
        </button>
      </header>

      {/* Camera View */}
      {!scanResult && !error && (
        <div className="relative border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-black overflow-hidden">
          <div id="reader"></div>
          {loading && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-sm">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          )}
        </div>
      )}

      {/* Success View */}
      {scanResult && (
        <div className="bg-success text-success-content p-6 border-4 border-base-content shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div className="w-24 h-24 border-4 border-base-content bg-base-100 overflow-hidden">
                <img src={scanResult.photo} alt="Guest" className="object-cover" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase leading-none">{scanResult.name}</h2>
              <p className="badge badge-outline border-2 border-success-content mt-2 font-bold uppercase">ENTRY GRANTED</p>
            </div>
          </div>
          <p className="font-mono text-sm mb-4 italic">Checked in at: {new Date(scanResult.checkInTime).toLocaleTimeString()}</p>
          <button onClick={resetScanner} className="btn btn-block bg-success-content text-success rounded-none border-2 border-base-content font-black text-xl">
            SCAN NEXT
          </button>
        </div>
      )}

      {/* Error View */}
      {error && (
        <div className="bg-error text-error-content p-6 border-4 border-base-content shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in shake duration-300">
          <h2 className="text-3xl font-black uppercase mb-2">ACCESS DENIED</h2>
          <p className="font-bold mb-6">{error}</p>
          <button onClick={resetScanner} className="btn btn-block bg-error-content text-error rounded-none border-2 border-base-content font-black text-xl">
            TRY AGAIN
          </button>
        </div>
      )}

      <div className="text-center">
        <p className="text-xs font-mono opacity-50 uppercase tracking-widest italic">Scanning Active • Milo Protocol v1.0</p>
      </div>
    </div>
  );
}
