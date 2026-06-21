import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Group, Text, Button, ActionIcon, Avatar, Menu, Tooltip, Drawer, Stack,
  useMantineColorScheme, useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconSun, IconMoon, IconUser, IconTicket, IconLogout,
  IconLayoutDashboard, IconCalendarEvent, IconMenu2, IconBook,
} from '@tabler/icons-react';
import { logout } from '../../features/auth/authSlice';

const publicLinks = [
  { label: 'Events', to: '/' },
];

const attendeeLinks = [
  { label: 'My Bookings', to: '/my-bookings', icon: IconBook },
];

export default function HeaderNav({ burger }) {
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mobileNav, { open: openMobileNav, close: closeMobileNav }] = useDisclosure(false);

  const isAttendee = isAuthenticated && user?.role === 'attendee';
  const isOrgAdmin = isAuthenticated && (user?.role === 'admin' || user?.role === 'organizer');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    closeMobileNav();
  };

  return (
    <>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap">
        <Group wrap="nowrap">
          {burger || (isMobile && (
            <ActionIcon variant="subtle" onClick={openMobileNav} size="lg">
              <IconMenu2 size={20} />
            </ActionIcon>
          ))}
          <Group gap="xs" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} wrap="nowrap">
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <IconTicket size={18} color="white" />
            </div>
            <Text fw={700} size="lg">EventHub</Text>
          </Group>
        </Group>

        {!isMobile && (
          <Group gap={4} ml="md">
            {publicLinks.map((link) => {
              const active = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  variant={active ? 'light' : 'subtle'}
                  color={active ? 'indigo' : 'gray'}
                  size="sm"
                >
                  {link.label}
                </Button>
              );
            })}
            {isAttendee && attendeeLinks.map((link) => {
              const active = location.pathname.startsWith(link.to);
              return (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  variant={active ? 'light' : 'subtle'}
                  color={active ? 'indigo' : 'gray'}
                  size="sm"
                  leftSection={<link.icon size={16} />}
                >
                  {link.label}
                </Button>
              );
            })}
          </Group>
        )}

      <Group wrap="nowrap">
        <ActionIcon variant="subtle" onClick={toggleColorScheme} size="lg">
          {computedColorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
        </ActionIcon>

        {isAuthenticated ? (
          <>
            <Tooltip label="Log out">
              <ActionIcon variant="subtle" color="red" size="lg" onClick={handleLogout}>
                <IconLogout size={20} />
              </ActionIcon>
            </Tooltip>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle" px={6}>
                  <Group gap="xs" wrap="nowrap">
                    <Avatar color="indigo" radius="xl" size="sm">
                      {user?.name?.[0] || '?'}
                    </Avatar>
                    {!isMobile && <Text size="sm" maw={120} truncate>{user?.name}</Text>}
                  </Group>
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                {user?.role === 'admin' || user?.role === 'organizer' ? (
                  <Menu.Item leftSection={<IconLayoutDashboard size={16} />} onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </Menu.Item>
                ) : (
                  <Menu.Item leftSection={<IconBook size={16} />} onClick={() => navigate('/my-bookings')}>
                    My Bookings
                  </Menu.Item>
                )}
                <Menu.Item leftSection={<IconUser size={16} />} onClick={() => navigate('/profile')}>
                  Profile
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconLogout size={16} />} color="red" onClick={handleLogout}>
                  Log out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        ) : (
          <Group wrap="nowrap">
            <Button variant="subtle" onClick={() => navigate('/login')}>Log in</Button>
            <Button onClick={() => navigate('/register')}>Sign up</Button>
          </Group>
        )}
      </Group>
      </Group>

      <Drawer
        opened={mobileNav}
        onClose={closeMobileNav}
        title={
          <Group gap="xs">
            <IconTicket size={20} color="#6366f1" />
            <Text fw={700}>EventHub</Text>
          </Group>
        }
        padding="md"
        size="260"
      >
        <Stack gap={4}>
          {publicLinks.map((link) => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              variant="subtle"
              fullWidth
              justify="flex-start"
              onClick={closeMobileNav}
              leftSection={<IconCalendarEvent size={18} />}
            >
              {link.label}
            </Button>
          ))}
          {isAttendee && attendeeLinks.map((link) => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              variant="subtle"
              fullWidth
              justify="flex-start"
              onClick={closeMobileNav}
              leftSection={<link.icon size={18} />}
            >
              {link.label}
            </Button>
          ))}
          {isAuthenticated && (
            <>
              {isOrgAdmin && (
                <Button
                  component={Link}
                  to="/dashboard"
                  variant="subtle"
                  fullWidth
                  justify="flex-start"
                  onClick={closeMobileNav}
                  leftSection={<IconLayoutDashboard size={18} />}
                >
                  Dashboard
                </Button>
              )}
              <Button
                component={Link}
                to="/profile"
                variant="subtle"
                fullWidth
                justify="flex-start"
                onClick={closeMobileNav}
                leftSection={<IconUser size={18} />}
              >
                Profile
              </Button>
              <Button
                variant="subtle"
                color="red"
                fullWidth
                justify="flex-start"
                onClick={handleLogout}
                leftSection={<IconLogout size={18} />}
              >
                Log out
              </Button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Button component={Link} to="/login" variant="subtle" fullWidth justify="flex-start" onClick={closeMobileNav}>
                Log in
              </Button>
              <Button component={Link} to="/register" fullWidth onClick={closeMobileNav}>
                Sign up
              </Button>
            </>
          )}
        </Stack>
      </Drawer>
    </>
  );
}
