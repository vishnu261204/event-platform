import { motion } from 'framer-motion';
import { Paper, Title, Text, Group, SimpleGrid, Card, Badge, Table, ScrollArea, ThemeIcon } from '@mantine/core';
import { IconCurrencyDollar, IconCalendarEvent, IconTicket, IconQrcode } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';

const stats = [
  { label: 'Revenue', value: '$12,450', icon: IconCurrencyDollar, color: 'green', diff: 12 },
  { label: 'Events', value: '8', icon: IconCalendarEvent, color: 'blue', diff: 25 },
  { label: 'Tickets Sold', value: '342', icon: IconTicket, color: 'violet', diff: 8 },
  { label: 'Check-ins', value: '189', icon: IconQrcode, color: 'orange', diff: -3 },
];

const bookings = [
  { id: 'BK-001', customer: 'Alice Johnson', tickets: 2, total: 120, status: 'confirmed', date: '2026-06-20' },
  { id: 'BK-002', customer: 'Bob Smith', tickets: 1, total: 75, status: 'checked-in', date: '2026-06-19' },
  { id: 'BK-003', customer: 'Carol White', tickets: 3, total: 180, status: 'pending', date: '2026-06-18' },
  { id: 'BK-004', customer: 'David Lee', tickets: 2, total: 150, status: 'confirmed', date: '2026-06-17' },
  { id: 'BK-005', customer: 'Eve Brown', tickets: 1, total: 50, status: 'cancelled', date: '2026-06-16' },
];

const chartData = [45, 70, 55, 85, 60, 90, 75, 95, 80, 65, 50, 85, 70, 60, 90, 75, 50, 80, 65, 55, 85, 70, 90, 60, 75, 95, 80, 65, 55, 85];

export default function Dashboard() {
  const rows = bookings.map((b) => (
    <Table.Tr key={b.id}>
      <Table.Td><Text size="sm" ff="mono">{b.id}</Text></Table.Td>
      <Table.Td><Text size="sm" fw={500}>{b.customer}</Text></Table.Td>
      <Table.Td><Text size="sm">{b.tickets}</Text></Table.Td>
      <Table.Td><Text size="sm">{formatCurrency(b.total)}</Text></Table.Td>
      <Table.Td><Badge color={getStatusColor(b.status)} variant="light" size="sm">{getStatusLabel(b.status)}</Badge></Table.Td>
      <Table.Td><Text size="sm" c="dimmed">{formatDate(b.date)}</Text></Table.Td>
    </Table.Tr>
  ));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Title order={2} mb="lg">Organizer Dashboard</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="xl">
        {stats.map((s) => (
          <Card key={s.label} padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{s.label}</Text>
              <ThemeIcon variant="light" color={s.color} size="lg" radius="md">
                <s.icon size={20} />
              </ThemeIcon>
            </Group>
            <Text fw={700} size="xl">{s.value}</Text>
            <Text size="sm" c={s.diff >= 0 ? 'teal' : 'red'} mt={5}>
              {s.diff >= 0 ? '+' : ''}{s.diff}% from last month
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">Revenue Overview</Title>
          <Group gap="xs" align="flex-end" h={200}>
            {chartData.map((h, i) => (
              <Paper
                key={i}
                style={{ height: `${h}%`, flex: 1 }}
                bg="blue.4"
                radius="sm"
              />
            ))}
          </Group>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">Recent Bookings</Title>
          <ScrollArea>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Booking ID</Table.Th>
                  <Table.Th>Customer</Table.Th>
                  <Table.Th>Tickets</Table.Th>
                  <Table.Th>Total</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Date</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>
      </SimpleGrid>
    </motion.div>
  );
}
