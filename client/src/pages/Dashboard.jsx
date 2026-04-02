import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function Dashboard() {
  const [data, setData] = useState({ stats: null, guests: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Get the event ID from user profile in localStorage
      const user = JSON.parse(localStorage.getItem("milo_user"));
      const eventId = user?.assignedEventId;

      if (!eventId) throw new Error("No event assigned");

      const [statsRes, guestsRes] = await Promise.all([api.get(`/admin/stats/${eventId}`), api.get(`/admin/guests/${eventId}`)]);

      setData({ stats: statsRes.data, guests: guestsRes.data });
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (guestId) => {
    await api.patch(`/admin/approve/${guestId}`);
    fetchData(); // Refresh list
  };

  if (loading) return <div className="p-10 font-black animate-pulse">LOADING_DATA...</div>;

  const { stats, guests } = data;

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-100 border-4 border-base-content shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="stat-title font-black uppercase text-xs">Total Registered</div>
          <div className="stat-value text-primary italic">{stats?.total || 0}</div>
        </div>
        <div className="stat bg-base-100 border-4 border-base-content shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="stat-title font-black uppercase text-xs">Pending Review</div>
          <div className="stat-value text-warning italic">{stats?.pending || 0}</div>
        </div>
        <div className="stat bg-base-100 border-4 border-base-content shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="stat-title font-black uppercase text-xs">Inside Venue</div>
          <div className="stat-value text-success italic">{stats?.checkedIn || 0}</div>
        </div>
      </div>

      {/* Guest Table */}
      <div className="border-4 border-base-content overflow-hidden">
        <table className="table w-full bg-base-100">
          <thead className="bg-base-content text-base-100 uppercase font-black">
            <tr>
              <th className="rounded-none">Guest</th>
              <th>Status</th>
              <th className="text-right rounded-none">Action</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest._id} className="border-b-2 border-base-content/10">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 border-2 border-base-content rounded-none grayscale">
                        <img src={guest.photoUrl} alt="Photo" />
                      </div>
                    </div>
                    <div>
                      <div className="font-black uppercase text-sm">{guest.name}</div>
                      <div className="text-xs opacity-60 font-mono">{guest.phone || "NO_PHONE"}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge rounded-none font-bold border-2 border-base-content ${guest.status === "pending" ? "badge-warning" : "badge-success"}`}>{guest.status.toUpperCase()}</span>
                </td>
                <td className="text-right">
                  {guest.status === "pending" && (
                    <button onClick={() => handleApprove(guest._id)} className="btn btn-sm btn-primary rounded-none border-2 border-base-content font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      APPROVE
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
