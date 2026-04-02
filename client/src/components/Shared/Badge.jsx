const Badge = ({ guest, eventName }) => (
  <div className="w-[10cm] h-[7cm] border-2 border-black p-4 flex flex-col justify-between bg-white text-black mb-4 mr-4 inline-block align-top">
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-xl font-black uppercase leading-tight">{eventName}</h1>
        <p className="text-sm border-b-2 border-black pb-1">GUEST PASS</p>
      </div>
      <img src={guest.photoUrl} className="w-20 h-20 grayscale border border-black object-cover" />
    </div>

    <div className="mt-2">
      <h2 className="text-2xl font-bold">{guest.name}</h2>
      <p className="text-xs">{guest.role || "Attendee"}</p>
    </div>

    <div className="flex justify-between items-end">
      <img src={guest.qrCodeUrl} className="w-20 h-20" alt="QR" />
      <div className="text-[8px] uppercase font-mono">ID: {guest._id}</div>
    </div>
  </div>
);
export default Badge;
// CSS for Print:
// @media print {
//   body * { visibility: hidden; }
//   .print-container, .print-container * { visibility: visible; }
//   .print-container { position: absolute; left: 0; top: 0; }
// }
