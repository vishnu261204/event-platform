import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Paper, Title, Text, Group, SimpleGrid, Skeleton, Stack } from '@mantine/core';
import { IconUsers, IconCalendarCheck, IconTicket } from '@tabler/icons-react';
import { adminAPI } from '../../services/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getDashboard()
      .then((res) => setData(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Skeleton height={36} width={280} radius="md" mb="lg" />
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} maw={800}>
          {[1, 2, 3].map((i) => (
            <Paper key={i} p="md" radius="md" withBorder>
              <Group justify="space-between">
                <Stack gap={6}>
                  <Skeleton height={14} width={100} radius="sm" />
                  <Skeleton height={32} width={80} radius="sm" />
                </Stack>
                <Skeleton height={32} width={32} radius="md" />
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      </motion.div>
    );
  }

  const stats = data ? [
    { label: 'Total Users', value: data.totalUsers?.toLocaleString() || '0', icon: IconUsers, color: 'blue' },
    { label: 'Total Events', value: data.totalEvents?.toLocaleString() || '0', icon: IconCalendarCheck, color: 'violet' },
    { label: 'Total Bookings', value: data.totalBookings?.toLocaleString() || '0', icon: IconTicket, color: 'teal' },
  ] : [];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Title order={2} mb="lg">Admin Dashboard</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} maw={800}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Paper key={stat.label} p="md" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{stat.label}</Text>
                  <Text size="xl" fw={700}>{stat.value}</Text>
                </div>
                <Icon size={32} stroke={1.5} color={`var(--mantine-color-${stat.color}-6)`} />
              </Group>
            </Paper>
          );
        })}
      </SimpleGrid>
    </motion.div>
  );
}
