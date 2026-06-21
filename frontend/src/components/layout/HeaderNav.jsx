import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppShell, Burger, Group, Text, Button, ActionIcon, Avatar, Menu,
  useMantineColorScheme, useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconSun, IconMoon, IconBell, IconUser, IconTicket, IconLogout,
  IconLayoutDashboard, IconCalendarEvent,
} from '@tabler/icons-react';
import { logout } from '../../features/auth/authSlice';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
];

export default function HeaderNav() {
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const logo = (
    <Group gap="xs" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <IconTicket size={18} color="white" />
      </div>
      <Text fw={700} size="lg">EventHub</Text>
    </Group>
  );

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Group>
          {isMobile && (
            <Burger opened={mobileOpened} onClick={toggleMobile} size="sm" />
          )}
          {logo}
          {!isMobile && (
            <Group ml="xl" gap={4}>
              {links.map((link) => (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  variant="subtle"
                  size="sm"
                >
                  {link.label}
                </Button>
              ))}
            </Group>
          )}
        </Group>

        <Group>
          <ActionIcon variant="subtle" onClick={toggleColorScheme} size="lg">
            {computedColorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
          </ActionIcon>

          {isAuthenticated ? (
            <Group>
              {!isMobile && (
                <ActionIcon variant="subtle" size="lg">
                  <IconBell size={20} />
                </ActionIcon>
              )}
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant="subtle" px={6}>
                    <Group gap="xs">
                      <Avatar color="indigo" radius="xl" size="sm">
                        {user?.name?.[0] || '?'}
                      </Avatar>
                      {!isMobile && <Text size="sm">{user?.name}</Text>}
                    </Group>
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item leftSection={<IconLayoutDashboard size={16} />} onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </Menu.Item>
                  <Menu.Item leftSection={<IconUser size={16} />} onClick={() => navigate('/profile')}>
                    Profile
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item leftSection={<IconLogout size={16} />} color="red" onClick={handleLogout}>
                    Log out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          ) : (
            <Group>
              <Button variant="subtle" onClick={() => navigate('/login')}>Log in</Button>
              <Button onClick={() => navigate('/register')}>Sign up</Button>
            </Group>
          )}
        </Group>
      </Group>
      {isMobile && mobileOpened && (
        <div style={{ borderTop: '1px solid var(--mantine-color-gray-2)', padding: '8px 16px' }}>
          {links.map((link) => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              variant="subtle"
              fullWidth
              onClick={toggleMobile}
              justify="flex-start"
            >
              {link.label}
            </Button>
          ))}
          {isAuthenticated && (
            <>
              <Button component={Link} to="/dashboard" variant="subtle" fullWidth justify="flex-start" onClick={toggleMobile}>
                Dashboard
              </Button>
              <Button component={Link} to="/profile" variant="subtle" fullWidth justify="flex-start" onClick={toggleMobile}>
                Profile
              </Button>
              <Button variant="subtle" color="red" fullWidth justify="flex-start" onClick={() => { handleLogout(); toggleMobile(); }}>
                Log out
              </Button>
            </>
          )}
        </div>
      )}
    </AppShell.Header>
  );
}
