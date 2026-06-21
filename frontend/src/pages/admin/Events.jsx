import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Paper, Title, Text, Group, Table, ScrollArea, Badge, TextInput, Skeleton, Stack, ActionIcon, Tooltip } from '@mantine/core';
import { IconSearch, IconEye, IconTrash } from '@tabler/icons-react';
import { formatDate, getStatusColor, getStatusLabel } from '../../lib/utils';
import { adminAPI, eventAPI } from '../../services/api';
import { notifications } from '@mantine/notifications';

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchEvents = () => {
    setLoading(true);
    adminAPI.getEvents()
      .then((res) => setEvents(res.data.data.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleCancel = async (id) => {
    try {
      await eventAPI.delete(id);
      notifications.show({ title: 'Cancelled', message: 'Event cancelled successfully', color: 'green' });
      fetchEvents();
    } catch {
      notifications.show({ title: 'Error', message: 'Failed to cancel event', color: 'red' });
    }
  };

  const filtered = events.filter((e) =>
    !search || e.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Group justify="space-between" mb="lg" wrap="wrap">
        <Title order={2}>Manage Events</Title>
        <TextInput
          placeholder="Search events..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          w={{ base: '100%', sm: 300 }}
        />
      </Group>

      <Paper p="lg" radius="md" withBorder>
        {loading ? (
          <Stack gap="xs" p="md">
            <Skeleton height={36} radius="sm" mb="xs" />
            {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} height={48} radius="sm" />)}
          </Stack>
        ) : (
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
                {filtered.length === 0 ? (
                  <Table.Tr><Table.Td colSpan={6}><Text ta="center" c="dimmed" py="xl">No events found</Text></Table.Td></Table.Tr>
                ) : filtered.map((event) => {
                  const ticketsSold = (event.totalSeats || 0) - (event.availableSeats || 0);
                  return (
                    <Table.Tr key={event._id}>
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
                      <Table.Td>{ticketsSold.toLocaleString()}</Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Tooltip label="View event">
                            <ActionIcon variant="subtle" color="blue" onClick={() => navigate(`/events/${event._id}`)}>
                              <IconEye size={18} />
                            </ActionIcon>
                          </Tooltip>
                          {event.status !== 'cancelled' && (
                            <Tooltip label="Cancel event">
                              <ActionIcon variant="subtle" color="red" onClick={() => handleCancel(event._id)}>
                                <IconTrash size={18} />
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        )}
      </Paper>
    </motion.div>
  );
}
