import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute, { AdminRoute, OrganizerRoute, AttendeeRoute } from './ProtectedRoute';

import Events from '../pages/Events';
import EventDetails from '../pages/EventDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminEvents from '../pages/admin/Events';
import AdminBookings from '../pages/admin/Bookings';

import OrgDashboard from '../pages/organizer/Dashboard';
import OrgEvents from '../pages/organizer/MyEvents';
import CreateEvent from '../pages/organizer/CreateEvent';
import EditEvent from '../pages/organizer/EditEvent';

import BookingHistory from '../pages/attendee/BookingHistory';
import Profile from '../pages/attendee/Profile';

export default function AppRoutes() {
  const { user } = useSelector((state) => state.auth);

  const DashboardRedirect = () => {
    if (!user) return <Navigate to="/login" />;
    const routes = { admin: '/admin/dashboard', organizer: '/organizer/dashboard', attendee: '/' };
    return <Navigate to={routes[user.role] || '/'} />;
  };

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Events />} />
        <Route path="/events" element={<Navigate to="/" replace />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="/my-bookings" element={<AttendeeRoute><BookingHistory /></AttendeeRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>

      <Route element={<AdminRoute><DashboardLayout /></AdminRoute>}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
      </Route>

      <Route element={<OrganizerRoute><DashboardLayout /></OrganizerRoute>}>
        <Route path="/organizer/dashboard" element={<OrgDashboard />} />
        <Route path="/organizer/events" element={<OrgEvents />} />
        <Route path="/organizer/events/create" element={<CreateEvent />} />
        <Route path="/organizer/events/:id/edit" element={<EditEvent />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
