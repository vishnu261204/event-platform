import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const eventAPI = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  getCategories: () => api.get('/events/categories'),
  getFeatured: () => api.get('/events/featured'),
};

export const bookingAPI = {
  getAll: (params) => api.get('/bookings', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  cancel: (id) => api.put(`/bookings/${id}/cancel`),
  getMyBookings: (params) => api.get('/bookings/mine', { params }),
  getEventBookings: (eventId, params) => api.get(`/bookings/event/${eventId}`, { params }),
  checkIn: (bookingId) => api.put(`/bookings/${bookingId}/checkin`),
};

export const ticketAPI = {
  getMyTickets: (params) => api.get('/tickets', { params }),
  getById: (id) => api.get(`/tickets/${id}`),
  validateQR: (qrCode) => api.post('/tickets/validate', { qrCode }),
};

export const userAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

export const dashboardAPI = {
  getAdminStats: () => api.get('/dashboard/admin'),
  getOrganizerStats: () => api.get('/dashboard/organizer'),
  getAttendeeStats: () => api.get('/dashboard/attendee'),
};

export default api;
