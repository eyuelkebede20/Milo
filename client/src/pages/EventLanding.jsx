import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import FaydaScanner from "../components/Registration/FaydaScanner";
import ManualForm from "../components/Registration/ManualForm";

export default function EventLanding() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [method, setMethod] = useState("fayda");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/public/${slug}`);
        setEvent(data);
        if (!data.settings?.allowFayda) {
          setMethod("manual");
        }
      } catch (err) {
        setError("Event not found or is no longer active.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [slug]);

  if (loading) return <div className="p-10 font-black animate-pulse text-center uppercase text-2xl">Initializing Portal...</div>;

  if (error)
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-error text-error-content border-4 border-base-content shadow-neo dark:shadow-neo-dark">
        <h2 className="text-3xl font-black uppercase">Access Denied</h2>
        <p className="font-bold">{error}</p>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto p-4 md:p-8">
      <div className="bg-base-100 border-4 border-base-content shadow-neo dark:shadow-neo-dark rounded-none p-6 md:p-8">
        <header className="mb-8 border-b-4 border-base-content pb-4">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary mb-1">Guest Registration</p>
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">{event.title}</h1>
          <div className="text-sm font-bold opacity-70 flex flex-col gap-1">
            <span>📍 {event.location || "TBA"}</span>
            <span>🕒 {new Date(event.startDate).toLocaleString()}</span>
          </div>
        </header>

        {event.settings?.allowFayda && (
          <div className="flex gap-2 mb-6">
            <button
              className={`flex-1 btn rounded-none border-2 border-base-content font-black ${method === "fayda" ? "btn-primary shadow-neo dark:shadow-neo-dark" : "btn-ghost"}`}
              onClick={() => setMethod("fayda")}
            >
              FAYDA ID
            </button>
            <button
              className={`flex-1 btn rounded-none border-2 border-base-content font-black ${method === "manual" ? "btn-primary shadow-neo dark:shadow-neo-dark" : "btn-ghost"}`}
              onClick={() => setMethod("manual")}
            >
              MANUAL
            </button>
          </div>
        )}

        <div className="mt-4">{method === "fayda" ? <FaydaScanner eventSlug={slug} /> : <ManualForm eventSlug={slug} />}</div>
      </div>
    </div>
  );
}
