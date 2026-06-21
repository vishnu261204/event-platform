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
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

export const eventAPI = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  getMyEvents: () => api.get('/events/my-events'),
  getCategories: () => api.get('/events'),
  getFeatured: () => api.get('/events'),
};

export const bookingAPI = {
  create: (data) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings/my-bookings'),
  getEventBookings: (eventId) => api.get(`/bookings/event/${eventId}`),
  cancel: (id) => api.put(`/bookings/${id}/cancel`),
};

export const ticketAPI = {
  getMyTickets: () => api.get('/tickets/my-tickets'),
  getById: (id) => api.get(`/tickets/${id}`),
};

export const adminAPI = {
  getUsers: (params) => api.get('/admin/users', { params }),
  getEvents: (params) => api.get('/admin/events', { params }),
  getBookings: (params) => api.get('/admin/bookings', { params }),
  getDashboard: () => api.get('/admin/dashboard'),
};

export const checkinAPI = {
  scan: (data) => api.post('/checkin/scan', data),
  getTicketByCode: (code) => api.get(`/checkin/ticket/${code}`),
};

export default api;
