import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/Home';
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
import OrgBookings from '../pages/organizer/EventBookings';
import QRCheckIn from '../pages/organizer/QRCheckIn';

import MyTickets from '../pages/attendee/MyTickets';
import BookingHistory from '../pages/attendee/BookingHistory';
import Profile from '../pages/attendee/Profile';

export default function AppRoutes() {
  const { user } = useSelector((state) => state.auth);

  const DashboardRedirect = () => {
    if (!user) return <Navigate to="/login" />;
    const routes = { admin: '/admin/dashboard', organizer: '/organizer/dashboard', attendee: '/my-tickets' };
    return <Navigate to={routes[user.role] || '/'} />;
  };

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
      </Route>

      <Route
        element={
          <ProtectedRoute roles={['admin']}>
            <DashboardLayout role="admin" />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
      </Route>

      <Route
        element={
          <ProtectedRoute roles={['organizer']}>
            <DashboardLayout role="organizer" />
          </ProtectedRoute>
        }
      >
        <Route path="/organizer/dashboard" element={<OrgDashboard />} />
        <Route path="/organizer/events" element={<OrgEvents />} />
        <Route path="/organizer/events/create" element={<CreateEvent />} />
        <Route path="/organizer/events/:id/edit" element={<EditEvent />} />
        <Route path="/organizer/events/:id/bookings" element={<OrgBookings />} />
        <Route path="/organizer/checkin" element={<QRCheckIn />} />
      </Route>

      <Route
        element={
          <ProtectedRoute roles={['attendee']}>
            <PublicLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/bookings" element={<BookingHistory />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
