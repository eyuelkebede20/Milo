import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("milo_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Handle Auth Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized: Clear local data and redirect to login
      localStorage.removeItem("milo_token");
      localStorage.removeItem("milo_user");
      window.location.href = "/login";
    }
    if (error.response?.status === 403) {
      // Forbidden: Role mismatch
      console.error("Insufficient permissions for this action.");
    }
    return Promise.reject(error);
  },
);

export default api;
