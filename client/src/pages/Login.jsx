import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [creds, setCreds] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login", creds);

      // Store auth data
      localStorage.setItem("milo_token", data.token);
      localStorage.setItem("milo_user", JSON.stringify(data.user));

      // Route based on role
      if (data.user.role === "Scanner") {
        navigate(`/checkin/${data.user.assignedEventId}`);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-base-100 border-4 border-base-content shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Staff <span className="text-primary">Login</span>
          </h1>
          <p className="text-sm font-bold opacity-70">AUTHORIZED PERSONNEL ONLY</p>
        </header>

        {error && (
          <div className="alert alert-error rounded-none border-2 border-base-content mb-6 font-bold py-2">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-black uppercase">Email Address</span>
            </label>
            <input
              type="email"
              required
              className="input input-bordered border-2 border-base-content rounded-none focus:outline-primary"
              placeholder="admin@milo.com"
              value={creds.email}
              onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-black uppercase">Password</span>
            </label>
            <input
              type="password"
              required
              className="input input-bordered border-2 border-base-content rounded-none focus:outline-primary"
              placeholder="••••••••"
              value={creds.password}
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary w-full rounded-none border-2 border-base-content shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase font-black text-lg ${loading ? "loading" : ""}`}
          >
            {loading ? "Authenticating..." : "Enter System"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-base-content border-dashed text-center">
          <p className="text-xs font-mono uppercase opacity-50">Milo v1.0.0 // Event Control Protocol</p>
        </div>
      </div>
    </div>
  );
}
