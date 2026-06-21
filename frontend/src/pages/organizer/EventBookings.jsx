import { useState } from 'react';
import { motion } from 'framer-motion';
import { Title, Text, Group, Table, Badge, TextInput, Tabs, Paper, ScrollArea } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';

const bookings = [
  { id: 'BK-001', customer: 'Alice Johnson', tickets: 2, total: 120, status: 'confirmed', date: '2026-06-20', event: 'Music Festival' },
  { id: 'BK-002', customer: 'Bob Smith', tickets: 1, total: 75, status: 'checked-in', date: '2026-06-19', event: 'Tech Conference' },
  { id: 'BK-003', customer: 'Carol White', tickets: 3, total: 180, status: 'pending', date: '2026-06-18', event: 'Music Festival' },
  { id: 'BK-004', customer: 'David Lee', tickets: 2, total: 150, status: 'confirmed', date: '2026-06-17', event: 'Art Workshop' },
  { id: 'BK-005', customer: 'Eve Brown', tickets: 1, total: 50, status: 'cancelled', date: '2026-06-16', event: 'Tech Conference' },
  { id: 'BK-006', customer: 'Frank Wilson', tickets: 4, total: 340, status: 'confirmed', date: '2026-06-15', event: 'Music Festival' },
  { id: 'BK-007', customer: 'Grace Kim', tickets: 2, total: 100, status: 'checked-in', date: '2026-06-14', event: 'Business Networking' },
];

const events = ['All Events', 'Music Festival', 'Tech Conference', 'Art Workshop', 'Business Networking'];

export default function EventBookings() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Events');

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    const match = b.id.toLowerCase().includes(q) || b.customer.toLowerCase().includes(q);
    if (activeTab !== 'All Events') return match && b.event === activeTab;
    return match;
  });

  const rows = filtered.map((b) => (
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
      <Title order={2} mb="lg">Event Bookings</Title>

      <Paper withBorder radius="md">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Group justify="space-between" p="md" pb={0}>
            <Tabs.List>
              {events.map((e) => (
                <Tabs.Tab key={e} value={e}>{e}</Tabs.Tab>
              ))}
            </Tabs.List>
            <TextInput
              placeholder="Search by booking ID or customer..."
              leftSection={<IconSearch size={16} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Group>
        </Tabs>

        <ScrollArea>
          <Table striped highlightOnHover p="md">
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
      </Paper>
    </motion.div>
  );
}
