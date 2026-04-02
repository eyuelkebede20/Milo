import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    requireEmail: false,
    allowFayda: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/events", form);
      alert("Event Created Successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("Creation failed: " + err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="card bg-base-100 border-4 border-base-content shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] rounded-none">
        <div className="card-body">
          <h2 className="card-title text-3xl font-black uppercase italic tracking-tighter mb-4">
            New <span className="text-primary">Event</span> Setup
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase">Event Title</span>
              </label>
              <input
                type="text"
                required
                className="input input-bordered border-2 border-base-content rounded-none"
                placeholder="e.g. Addis Tech Expo 2026"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold uppercase">Start Date</span>
                </label>
                <input type="datetime-local" required className="input input-bordered border-2 border-base-content rounded-none" onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold uppercase">End Date</span>
                </label>
                <input type="datetime-local" required className="input input-bordered border-2 border-base-content rounded-none" onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
              </div>
            </div>

            <div className="bg-base-200 p-4 border-2 border-base-content border-dashed space-y-3">
              <h3 className="font-black text-xs uppercase opacity-70">Access Rules</h3>
              <div className="flex items-center gap-4">
                <input type="checkbox" className="toggle toggle-primary" checked={form.allowFayda} onChange={(e) => setForm({ ...form, allowFayda: e.target.checked })} />
                <span className="font-bold">Allow Fayda ID Auto-fill</span>
              </div>
            </div>

            <button disabled={loading} className={`btn btn-primary w-full rounded-none border-2 border-base-content font-black text-lg ${loading ? "loading" : ""}`}>
              INITIALIZE EVENT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
