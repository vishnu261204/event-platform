import { motion } from 'framer-motion';
import { Paper, Title, Text, Group, Table, ScrollArea, Badge, TextInput } from '@mantine/core';
import { IconSearch, IconEye, IconEdit } from '@tabler/icons-react';
import { formatDate, getStatusColor, getStatusLabel } from '../../lib/utils';

const events = [
  { title: 'Tech Conference 2025', category: 'Technology', date: '2025-06-15', status: 'published', ticketsSold: 450 },
  { title: 'Summer Music Festival', category: 'Music', date: '2025-07-20', status: 'published', ticketsSold: 1200 },
  { title: 'Modern Art Workshop', category: 'Art', date: '2025-05-10', status: 'completed', ticketsSold: 85 },
  { title: 'Business Leadership Summit', category: 'Business', date: '2025-08-05', status: 'draft', ticketsSold: 0 },
  { title: 'Annual Charity Gala', category: 'Charity', date: '2025-09-12', status: 'published', ticketsSold: 320 },
  { title: 'Photography Expo', category: 'Art', date: '2025-04-18', status: 'completed', ticketsSold: 210 },
  { title: 'Startup Pitch Night', category: 'Business', date: '2025-10-01', status: 'sold_out', ticketsSold: 500 },
  { title: 'Wellness Retreat', category: 'Health', date: '2025-11-15', status: 'draft', ticketsSold: 0 },
];

export default function Events() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Manage Events</Title>
        <TextInput
          placeholder="Search events..."
          leftSection={<IconSearch size={16} />}
          w={300}
        />
      </Group>

      <Paper p="lg" radius="md" withBorder>
        <ScrollArea>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Tickets Sold</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {events.map((event) => (
                <Table.Tr key={event.title}>
                  <Table.Td>
                    <Text fw={500}>{event.title}</Text>
                  </Table.Td>
                  <Table.Td>{event.category}</Table.Td>
                  <Table.Td>{formatDate(event.date)}</Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(event.status)} size="sm">
                      {getStatusLabel(event.status)}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{event.ticketsSold.toLocaleString()}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <IconEye size={18} style={{ cursor: 'pointer', color: 'var(--mantine-color-blue-6)' }} />
                      <IconEdit size={18} style={{ cursor: 'pointer', color: 'var(--mantine-color-gray-6)' }} />
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
