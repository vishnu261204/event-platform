import { useState } from 'react';
import { motion } from 'framer-motion';
import { Paper, Title, Text, Group, Stack, Card, Badge, Button, Tabs, Avatar, Switch, PasswordInput } from '@mantine/core';
import { IconUser, IconMail, IconPhone, IconCalendar, IconLock } from '@tabler/icons-react';
import { formatDate, getInitials } from '../../lib/utils';

const user = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  role: 'attendee',
  bio: 'Event enthusiast and tech lover. I enjoy attending music festivals and tech conferences around the country.',
  memberSince: '2025-03-15',
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('details');
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [notifications, setNotifications] = useState({
    emailReminders: true,
    smsUpdates: false,
    promotional: true,
  });

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
                  <Text size="xs" c="dimmed">Member since {formatDate(user.memberSince, 'MMMM YYYY')}</Text>
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
                <Text>{user.name}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={2}>Email</Text>
                <Group gap={6}>
                  <IconMail size={14} />
                  <Text>{user.email}</Text>
                </Group>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={2}>Phone</Text>
                <Group gap={6}>
                  <IconPhone size={14} />
                  <Text>{user.phone}</Text>
                </Group>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={2}>Bio</Text>
                <Text>{user.bio}</Text>
              </div>
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
                <Button mt="xs">Update Password</Button>
              </Stack>
            </Card>

            <Card withBorder radius="md" padding="lg">
              <Text fw={600} size="lg" mb="md">Notification Preferences</Text>
              <Stack gap="md">
                <Switch
                  label="Email Reminders"
                  description="Receive email reminders before events"
                  checked={notifications.emailReminders}
                  onChange={() => setNotifications({ ...notifications, emailReminders: !notifications.emailReminders })}
                />
                <Switch
                  label="SMS Updates"
                  description="Get text message updates about your bookings"
                  checked={notifications.smsUpdates}
                  onChange={() => setNotifications({ ...notifications, smsUpdates: !notifications.smsUpdates })}
                />
                <Switch
                  label="Promotional Emails"
                  description="Receive offers and event recommendations"
                  checked={notifications.promotional}
                  onChange={() => setNotifications({ ...notifications, promotional: !notifications.promotional })}
                />
              </Stack>
            </Card>
          </Stack>
        )}
      </div>
    </motion.div>
  );
}
