import { motion } from 'framer-motion';
import { Paper, Title, Text, Group, Table, ScrollArea, Badge, TextInput } from '@mantine/core';
import { IconSearch, IconEye, IconTrash } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';

const bookings = [
  { id: 'BK-001', event: 'Tech Conference 2025', user: 'Alice Johnson', tickets: 2, total: 299, status: 'confirmed', date: '2025-05-10' },
  { id: 'BK-002', event: 'Summer Music Festival', user: 'Bob Smith', tickets: 4, total: 596, status: 'confirmed', date: '2025-06-01' },
  { id: 'BK-003', event: 'Modern Art Workshop', user: 'Carol White', tickets: 1, total: 79, status: 'completed', date: '2025-04-20' },
  { id: 'BK-004', event: 'Business Leadership Summit', user: 'David Brown', tickets: 3, total: 1497, status: 'pending', date: '2025-07-15' },
  { id: 'BK-005', event: 'Annual Charity Gala', user: 'Eve Davis', tickets: 2, total: 398, status: 'cancelled', date: '2025-08-01' },
  { id: 'BK-006', event: 'Photography Expo', user: 'Frank Miller', tickets: 1, total: 49, status: 'completed', date: '2025-03-25' },
  { id: 'BK-007', event: 'Startup Pitch Night', user: 'Grace Wilson', tickets: 2, total: 200, status: 'confirmed', date: '2025-09-10' },
  { id: 'BK-008', event: 'Wellness Retreat', user: 'Henry Taylor', tickets: 1, total: 599, status: 'pending', date: '2025-10-20' },
];

export default function Bookings() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Manage Bookings</Title>
        <TextInput
          placeholder="Search bookings..."
          leftSection={<IconSearch size={16} />}
          w={300}
        />
      </Group>

      <Paper p="lg" radius="md" withBorder>
        <ScrollArea>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Booking ID</Table.Th>
                <Table.Th>Event</Table.Th>
                <Table.Th>User</Table.Th>
                <Table.Th>Tickets</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {bookings.map((booking) => (
                <Table.Tr key={booking.id}>
                  <Table.Td>
                    <Text fw={500}>{booking.id}</Text>
                  </Table.Td>
                  <Table.Td>{booking.event}</Table.Td>
                  <Table.Td>{booking.user}</Table.Td>
                  <Table.Td>{booking.tickets}</Table.Td>
                  <Table.Td>{formatCurrency(booking.total)}</Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(booking.status)} size="sm">
                      {getStatusLabel(booking.status)}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{formatDate(booking.date)}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <IconEye size={18} style={{ cursor: 'pointer', color: 'var(--mantine-color-blue-6)' }} />
                      <IconTrash size={18} style={{ cursor: 'pointer', color: 'var(--mantine-color-red-6)' }} />
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </motion.div>
  );
}
