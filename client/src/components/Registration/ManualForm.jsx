import { useState } from "react";
import api from "../../api/axiosInstance";

export default function ManualForm({ eventSlug }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    photo: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("type", "manual");
    data.append("eventSlug", eventSlug);
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("photo", formData.photo);

    try {
      await api.post("/guests/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration submitted! Wait for admin approval.");
      // Reset form or redirect
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">Full Name *</span>
        </label>
        <input
          type="text"
          required
          className="input input-bordered w-full focus:border-primary"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Phone</span>
          </label>
          <input type="tel" className="input input-bordered w-full" placeholder="+251..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Email</span>
          </label>
          <input type="email" className="input input-bordered w-full" placeholder="optional@mail.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold">Photo ID *</span>
        </label>
        <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-base-300 rounded-lg">
          {preview ? (
            <img src={preview} className="w-32 h-32 object-cover rounded-md shadow-md" alt="Preview" />
          ) : (
            <div className="w-32 h-32 bg-base-200 flex items-center justify-center rounded-md">
              <span className="text-xs opacity-50 text-center">No image selected</span>
            </div>
          )}
          <input type="file" required accept="image/*" className="file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={handleFileChange} />
        </div>
      </div>

      <button type="submit" disabled={loading} className={`btn btn-primary w-full mt-4 ${loading ? "loading" : ""}`}>
        {loading ? "Submitting..." : "Register for Event"}
      </button>
    </form>
  );
}
