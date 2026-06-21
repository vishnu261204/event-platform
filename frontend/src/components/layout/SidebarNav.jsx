import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavLink as MNavLink, Stack, Text } from '@mantine/core';
import {
  IconLayoutDashboard, IconUsers, IconCalendarCheck, IconTicket,
  IconCalendar, IconPlus, IconQrcode, IconClock, IconUser,
} from '@tabler/icons-react';

const configs = {
  admin: {
    label: 'Admin Panel',
    links: [
      { label: 'Dashboard', to: '/dashboard', icon: IconLayoutDashboard },
      { label: 'Users', to: '/admin/users', icon: IconUsers },
      { label: 'Events', to: '/admin/events', icon: IconCalendarCheck },
      { label: 'Bookings', to: '/admin/bookings', icon: IconTicket },
    ],
  },
  organizer: {
    label: 'Organizer',
    links: [
      { label: 'Dashboard', to: '/dashboard', icon: IconLayoutDashboard },
      { label: 'My Events', to: '/organizer/events', icon: IconCalendar },
      { label: 'Create Event', to: '/organizer/events/new', icon: IconPlus },
      { label: 'QR Check-In', to: '/organizer/checkin', icon: IconQrcode },
    ],
  },
  attendee: {
    label: 'My Account',
    links: [
      { label: 'Dashboard', to: '/dashboard', icon: IconLayoutDashboard },
      { label: 'My Tickets', to: '/my-tickets', icon: IconTicket },
      { label: 'Booking History', to: '/bookings', icon: IconClock },
      { label: 'Profile', to: '/profile', icon: IconUser },
    ],
  },
};

export default function SidebarNav() {
  const { user } = useSelector((s) => s.auth);
  const location = useLocation();
  const config = configs[user?.role] || configs.attendee;

  return (
    <>
      <AppShell.Section>
        <Text size="xs" tt="uppercase" c="dimmed" fw={600} px="md" pt="md" pb="xs">
          {config.label}
        </Text>
      </AppShell.Section>
      <AppShell.Section grow component={Stack} gap={2} px="sm" py="xs">
        {config.links.map((link) => {
          const isActive = link.to === '/dashboard'
            ? location.pathname === '/dashboard'
            : location.pathname.startsWith(link.to);
          return (
            <MNavLink
              key={link.to}
              component={Link}
              to={link.to}
              label={link.label}
              leftSection={<link.icon size={20} />}
              active={isActive}
              variant="light"
              style={{ borderRadius: 8 }}
            />
          );
        })}
      </AppShell.Section>
    </>
  );
}
