import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Title, Text, Badge, Table, ScrollArea, TextInput, Paper } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';

const bookings = [
  { id: 1, event: 'Summer Music Festival', date: '2026-07-15', tickets: 2, total: 178, status: 'confirmed', bookedOn: '2026-06-10' },
  { id: 2, event: 'Tech Conference 2026', date: '2026-10-12', tickets: 1, total: 299, status: 'confirmed', bookedOn: '2026-09-01' },
  { id: 3, event: 'Jazz Night', date: '2026-07-22', tickets: 3, total: 165, status: 'completed', bookedOn: '2026-06-15' },
  { id: 4, event: 'Food & Wine Festival', date: '2026-09-05', tickets: 2, total: 150, status: 'completed', bookedOn: '2026-08-20' },
  { id: 5, event: 'Marathon 2026', date: '2026-11-03', tickets: 1, total: 60, status: 'cancelled', bookedOn: '2026-10-01' },
  { id: 6, event: 'Startup Networking', date: '2026-11-08', tickets: 1, total: 25, status: 'confirmed', bookedOn: '2026-10-25' },
  { id: 7, event: 'AI Workshop', date: '2026-09-18', tickets: 2, total: 300, status: 'completed', bookedOn: '2026-08-05' },
];

export default function BookingHistory() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return bookings;
    const q = search.toLowerCase();
    return bookings.filter((b) => b.event.toLowerCase().includes(q));
  }, [search]);

  const rows = filtered.map((booking) => (
    <Table.Tr key={booking.id}>
      <Table.Td>
        <Text size="sm" fw={500}>{booking.event}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{formatDate(booking.date)}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{booking.tickets}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={600}>{formatCurrency(booking.total)}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(booking.status)} variant="light" size="sm">
          {getStatusLabel(booking.status)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{formatDate(booking.bookedOn)}</Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 16px' }}>
        <Title order={2} mb="lg">Booking History</Title>

        <TextInput
          placeholder="Search by event name..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          mb="lg"
          style={{ maxWidth: 360 }}
        />

        <Paper withBorder radius="md">
          <ScrollArea>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Event</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Tickets</Table.Th>
                  <Table.Th>Total</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Booked On</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows.length > 0 ? rows : (
                  <Table.Tr>
                    <Table.Td colSpan={6}>
                      <Text ta="center" py="xl" c="dimmed">
                        {search ? 'No bookings match your search' : 'No bookings yet'}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </div>
    </motion.div>
  );
}
