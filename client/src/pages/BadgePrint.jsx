import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";

export default function BadgePrint() {
  const { eventId } = useParams();
  const [guests, setGuests] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guestRes, eventRes] = await Promise.all([api.get(`/admin/guests/${eventId}?status=approved`), api.get(`/admin/events/${eventId}`)]);
        setGuests(guestRes.data);
        setEvent(eventRes.data);
      } catch (err) {
        console.error("Failed to load badges", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  if (loading) return <div className="p-10">Loading Badges...</div>;

  return (
    <div className="p-4">
      {/* Control Panel - Hidden during print */}
      <div className="flex justify-between items-center mb-8 bg-base-200 p-4 border-2 border-base-content print:hidden">
        <div>
          <h1 className="text-xl font-black uppercase">Print Queue</h1>
          <p className="text-sm opacity-70">{guests.length} Approved Guests</p>
        </div>
        <button onClick={() => window.print()} className="btn btn-primary rounded-none border-2 border-base-content shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Print All Badges (A4)
        </button>
      </div>

      {/* Print Grid */}
      <div className="print-container grid grid-cols-1 md:grid-cols-2 gap-4">
        {guests.map((guest) => (
          <div key={guest._id} className="w-[10cm] h-[7cm] border-4 border-black p-4 flex flex-col justify-between bg-white text-black break-inside-avoid mx-auto mb-4">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-black pb-2">
              <div className="max-w-[70%]">
                <h2 className="text-lg font-black uppercase leading-none truncate">{event?.title}</h2>
                <span className="text-[10px] font-mono font-bold bg-black text-white px-1">GUEST PASS</span>
              </div>
              <div className="w-16 h-16 border-2 border-black bg-base-300 overflow-hidden">
                <img src={guest.photoUrl} alt={guest.name} className="w-full h-full object-cover grayscale" />
              </div>
            </div>

            {/* Body */}
            <div className="py-2">
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-1">{guest.name}</h3>
              <p className="text-xs font-bold opacity-80 italic">{guest.phone || guest.email || "No Contact Provided"}</p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end pt-2 border-t-2 border-dashed border-black">
              <div className="w-16 h-16 bg-white p-1">
                <img src={guest.qrCodeUrl} alt="QR Code" className="w-full h-full" />
              </div>
              <div className="text-right">
                <p className="text-[8px] font-mono leading-none uppercase">System Auth ID</p>
                <p className="text-[10px] font-mono font-bold leading-none">{guest._id.slice(-8).toUpperCase()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global CSS for Printing Logic */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .navbar, .btn, .print-hidden {
            display: none !important;
          }
          .print-container {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }
          .print-container > div {
            border-color: black !important;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
