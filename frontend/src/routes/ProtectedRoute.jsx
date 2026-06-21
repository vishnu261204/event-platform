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
      attendee: '/my-tickets',
    };
    return <Navigate to={redirectMap[user?.role] || '/'} replace />;
  }

  return children;
}
