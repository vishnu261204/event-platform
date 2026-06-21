import { useState } from 'react';
import { motion } from 'framer-motion';
import { Paper, Title, Text, Group, Stack, Card, Badge, Button, Tabs, Avatar, PasswordInput, TextInput, Skeleton } from '@mantine/core';
import { IconUser, IconMail, IconPhone, IconCalendar, IconLock } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, getInitials } from '../../lib/utils';
import { updateProfile, changePassword } from '../../features/auth/authSlice';
import { notifications } from '@mantine/notifications';

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('details');
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [name, setName] = useState('');

  const handleUpdateProfile = async () => {
    if (!name.trim()) return;
    try {
      await dispatch(updateProfile({ name })).unwrap();
      notifications.show({ title: 'Updated', message: 'Profile updated successfully', color: 'green' });
    } catch (err) {
      notifications.show({ title: 'Error', message: typeof err === 'string' ? err : 'Failed to update profile', color: 'red' });
    }
  };

  const handleChangePassword = async () => {
    if (password.new !== password.confirm) {
      notifications.show({ title: 'Error', message: 'Passwords do not match', color: 'red' });
      return;
    }
    try {
      await dispatch(changePassword({ currentPassword: password.current, newPassword: password.new })).unwrap();
      notifications.show({ title: 'Success', message: 'Password changed successfully', color: 'green' });
      setPassword({ current: '', new: '', confirm: '' });
    } catch (err) {
      notifications.show({ title: 'Error', message: typeof err === 'string' ? err : 'Failed to change password', color: 'red' });
    }
  };

  if (!user) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 16px' }}>
          <Skeleton height={36} width={120} radius="md" mb="lg" />
          <Paper withBorder radius="md" p="xl" mb="lg">
            <Group gap="lg" wrap="nowrap">
              <Skeleton height={60} width={60} radius="xl" />
              <Stack gap={6}>
                <Skeleton height={24} width={200} radius="sm" />
                <Skeleton height={14} width={250} radius="sm" />
                <Skeleton height={14} width={150} radius="sm" />
              </Stack>
            </Group>
          </Paper>
          <Group gap="sm" mb="md">
            <Skeleton height={36} width={140} radius="sm" />
            <Skeleton height={36} width={160} radius="sm" />
          </Group>
          <Card withBorder radius="md" padding="lg">
            <Skeleton height={28} width={180} radius="sm" mb="md" />
            <Stack gap="md">
              <Skeleton height={36} radius="sm" />
              <Skeleton height={20} width={200} radius="sm" />
              <Skeleton height={20} width={100} radius="sm" />
              <Skeleton height={36} width={140} radius="sm" />
            </Stack>
          </Card>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 16px' }}>
        <Title order={2} mb="lg">Profile</Title>

        <Paper withBorder radius="md" p="xl" mb="lg">
          <Group gap="lg" wrap="nowrap">
            <Avatar color="blue" radius="xl" size="xl">
              {getInitials(user.name)}
            </Avatar>
            <div>
              <Text size="xl" fw={700}>{user.name}</Text>
              <Group gap={6} mt={4}>
                <IconMail size={14} />
                <Text size="sm" c="dimmed">{user.email}</Text>
              </Group>
              <Group gap="sm" mt={8}>
                <Badge color="blue" variant="light">{user.role}</Badge>
                <Group gap={4}>
                  <IconCalendar size={14} />
                  <Text size="xs" c="dimmed">Member since {formatDate(user.createdAt, 'MMMM YYYY')}</Text>
                </Group>
              </Group>
            </div>
          </Group>
        </Paper>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List mb="md">
            <Tabs.Tab value="details" leftSection={<IconUser size={16} />}>Profile Details</Tabs.Tab>
            <Tabs.Tab value="settings" leftSection={<IconLock size={16} />}>Account Settings</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {activeTab === 'details' && (
          <Card withBorder radius="md" padding="lg">
            <Text fw={600} size="lg" mb="md">Personal Information</Text>
            <Stack gap="md">
              <div>
                <Text size="sm" c="dimmed" mb={2}>Full Name</Text>
                <TextInput
                  defaultValue={user.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={2}>Email</Text>
                <Group gap={6}>
                  <IconMail size={14} />
                  <Text>{user.email}</Text>
                </Group>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={2}>Role</Text>
                <Badge color="blue" variant="light">{user.role}</Badge>
              </div>
              <Button onClick={handleUpdateProfile} loading={loading} disabled={!name.trim()}>
                Save Changes
              </Button>
            </Stack>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Stack gap="md">
            <Card withBorder radius="md" padding="lg">
              <Text fw={600} size="lg" mb="md">Change Password</Text>
              <Stack gap="sm">
                <PasswordInput
                  label="Current Password"
                  placeholder="Enter current password"
                  value={password.current}
                  onChange={(e) => setPassword({ ...password, current: e.target.value })}
                />
                <PasswordInput
                  label="New Password"
                  placeholder="Enter new password"
                  value={password.new}
                  onChange={(e) => setPassword({ ...password, new: e.target.value })}
                />
                <PasswordInput
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                  value={password.confirm}
                  onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                />
                <Button mt="xs" onClick={handleChangePassword} loading={loading}>
                  Update Password
                </Button>
              </Stack>
            </Card>
          </Stack>
        )}
      </div>
    </motion.div>
  );
}
