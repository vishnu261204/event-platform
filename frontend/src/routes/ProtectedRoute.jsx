import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    const redirectMap = {
      admin: '/admin/dashboard',
      organizer: '/organizer/dashboard',
      attendee: '/',
    };
    return <Navigate to={redirectMap[user?.role] || '/'} replace />;
  }

  return children;
}

export function AdminRoute({ children }) {
  return <ProtectedRoute roles={['admin']}>{children}</ProtectedRoute>;
}

export function OrganizerRoute({ children }) {
  return <ProtectedRoute roles={['organizer', 'admin']}>{children}</ProtectedRoute>;
}

export function AttendeeRoute({ children }) {
  return <ProtectedRoute roles={['attendee']}>{children}</ProtectedRoute>;
}
