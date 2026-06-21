import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppShell, NavLink as MNavLink, Stack, Text } from '@mantine/core';
import {
  IconLayoutDashboard, IconUsers, IconCalendarCheck, IconTicket,
  IconCalendar, IconPlus,
} from '@tabler/icons-react';

const configs = {
  admin: {
    label: 'Admin Panel',
    links: [
      { label: 'Dashboard', to: '/admin/dashboard', icon: IconLayoutDashboard },
      { label: 'Users', to: '/admin/users', icon: IconUsers },
      { label: 'Events', to: '/admin/events', icon: IconCalendarCheck },
      { label: 'Bookings', to: '/admin/bookings', icon: IconTicket },
    ],
  },
  organizer: {
    label: 'Organizer',
    links: [
      { label: 'Dashboard', to: '/organizer/dashboard', icon: IconLayoutDashboard },
      { label: 'My Events', to: '/organizer/events', icon: IconCalendar },
      { label: 'Create Event', to: '/organizer/events/create', icon: IconPlus },
    ],
  },
};

export default function SidebarNav({ onNavigate }) {
  const { user } = useSelector((s) => s.auth);
  const location = useLocation();
  const config = configs[user?.role];

  if (!config) return null;

  return (
    <>
      <AppShell.Section>
        <Text size="xs" tt="uppercase" c="dimmed" fw={600} px="md" pt="md" pb="xs">
          {config.label}
        </Text>
      </AppShell.Section>
      <AppShell.Section grow component={Stack} gap={2} px="sm" py="xs">
        {config.links.map((link) => {
          const path = location.pathname;
          const childPath = path.startsWith(link.to + '/') ? path.slice(link.to.length + 1) : '';
          const isActive = path === link.to || (childPath && childPath !== 'create' && childPath !== 'create/');
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
              onClick={onNavigate}
            />
          );
        })}
      </AppShell.Section>
    </>
  );
}
