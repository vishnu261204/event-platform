import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const sidebarConfig = {
  admin: {
    label: 'Admin Panel',
    links: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Users', href: '/admin/users', icon: 'Users' },
      { label: 'Events', href: '/admin/events', icon: 'CalendarCheck' },
      { label: 'Bookings', href: '/admin/bookings', icon: 'Ticket' },
    ],
  },
  organizer: {
    label: 'Organizer',
    links: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'My Events', href: '/organizer/events', icon: 'Calendar' },
      { label: 'Create Event', href: '/organizer/events/new', icon: 'PlusCircle' },
      { label: 'QR Check-In', href: '/organizer/checkin', icon: 'QrCode' },
    ],
  },
  attendee: {
    label: 'My Account',
    links: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'My Tickets', href: '/my-tickets', icon: 'Ticket' },
      { label: 'Booking History', href: '/bookings', icon: 'Clock' },
      { label: 'Profile', href: '/profile', icon: 'User' },
    ],
  },
};

const iconMap = {
  LayoutDashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  Users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
  CalendarCheck: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  Ticket: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
  Calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  PlusCircle: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
  QrCode: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z',
  Clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  User: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
};

function SidebarIcon({ icon }) {
  const path = iconMap[icon];
  if (!path) return null;
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default function Sidebar({ open, onClose }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const config = sidebarConfig[user?.role] || sidebarConfig.attendee;

  const isActive = (href) => {
    if (href === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-secondary-200 bg-white transition-transform duration-300 dark:bg-secondary-800 dark:border-secondary-700',
          'lg:translate-x-0 lg:static lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-secondary-200 px-6 dark:border-secondary-700">
          <div>
            <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider">{config.label}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-700 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {config.links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => onClose?.()}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive(link.href)
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                  : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-secondary-100'
              )}
            >
              <SidebarIcon icon={link.icon} />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-secondary-200 p-4 dark:border-secondary-700">
          <p className="text-xs text-secondary-400">
            EventHub v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
