import { motion } from 'framer-motion';
import { Paper, Title, Text, Group, SimpleGrid, Card, Table, ScrollArea, Badge } from '@mantine/core';
import { IconUsers, IconCalendarCheck, IconTicket, IconCurrencyDollar } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';

const stats = [
  { label: 'Total Users', value: '24,582', icon: IconUsers, color: 'blue' },
  { label: 'Total Events', value: '1,349', icon: IconCalendarCheck, color: 'violet' },
  { label: 'Total Bookings', value: '12,847', icon: IconTicket, color: 'teal' },
  { label: 'Revenue', value: '$189,430', icon: IconCurrencyDollar, color: 'green' },
];

const recentUsers = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Organizer', status: 'active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Admin', status: 'active' },
  { name: 'David Brown', email: 'david@example.com', role: 'User', status: 'inactive' },
  { name: 'Eve Davis', email: 'eve@example.com', role: 'User', status: 'active' },
];

const recentEvents = [
  { title: 'Tech Conference 2025', date: '2025-06-15', status: 'published' },
  { title: 'Music Festival', date: '2025-07-20', status: 'published' },
  { title: 'Art Workshop', date: '2025-05-10', status: 'completed' },
  { title: 'Business Summit', date: '2025-08-05', status: 'draft' },
  { title: 'Charity Gala', date: '2025-09-12', status: 'published' },
];

const recentBookings = [
  { event: 'Tech Conference', user: 'Alice Johnson', status: 'confirmed', total: 299 },
  { event: 'Music Festival', user: 'Bob Smith', status: 'confirmed', total: 149 },
  { event: 'Art Workshop', user: 'Carol White', status: 'completed', total: 79 },
  { event: 'Business Summit', user: 'David Brown', status: 'pending', total: 499 },
  { event: 'Charity Gala', user: 'Eve Davis', status: 'cancelled', total: 199 },
];

export default function Dashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Title order={2} mb="lg">Admin Dashboard</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="xl">
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

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
        <Paper p="md" radius="md" withBorder>
          <Title order={4} mb="sm">Recent Users</Title>
          <ScrollArea h={260}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentUsers.map((user) => (
                  <Table.Tr key={user.email}>
                    <Table.Td>{user.name}</Table.Td>
                    <Table.Td>{user.email}</Table.Td>
                    <Table.Td>{user.role}</Table.Td>
                    <Table.Td>
                      <Badge color={getStatusColor(user.status)} size="sm">
                        {getStatusLabel(user.status)}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Title order={4} mb="sm">Recent Events</Title>
          <ScrollArea h={260}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentEvents.map((event) => (
                  <Table.Tr key={event.title}>
                    <Table.Td>{event.title}</Table.Td>
                    <Table.Td>{formatDate(event.date)}</Table.Td>
                    <Table.Td>
                      <Badge color={getStatusColor(event.status)} size="sm">
                        {getStatusLabel(event.status)}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Title order={4} mb="sm">Recent Bookings</Title>
          <ScrollArea h={260}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Event</Table.Th>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Total</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentBookings.map((booking) => (
                  <Table.Tr key={booking.event + booking.user}>
                    <Table.Td>{booking.event}</Table.Td>
                    <Table.Td>{booking.user}</Table.Td>
                    <Table.Td>
                      <Badge color={getStatusColor(booking.status)} size="sm">
                        {getStatusLabel(booking.status)}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{formatCurrency(booking.total)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </SimpleGrid>
    </motion.div>
  );
}
