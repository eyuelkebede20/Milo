import api from "../api/axiosInstance";

export const approveGuest = async (guestId) => {
  const response = await api.patch(`/admin/approve/${guestId}`);
  return response.data;
};

export const fetchDashboardStats = async (eventId) => {
  const response = await api.get(`/admin/stats/${eventId}`);
  return response.data;
};
