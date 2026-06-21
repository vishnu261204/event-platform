import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Group, SimpleGrid, Card, Badge, Button, TextInput, Tabs, Stack, Skeleton } from '@mantine/core';
import { IconSearch, IconEye, IconEdit, IconTrash, IconPlus, IconCalendarEvent, IconUsers, IconCurrencyRupee } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';
import { eventAPI } from '../../services/api';
import { notifications } from '@mantine/notifications';

export default function MyEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  const fetchEvents = () => {
    setLoading(true);
    eventAPI.getMyEvents()
      .then((res) => setEvents(res.data.data.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleDelete = (id) => {
    eventAPI.delete(id)
      .then(() => {
        notifications.show({ title: 'Deleted', message: 'Event cancelled successfully', color: 'green' });
        fetchEvents();
      })
      .catch(() => notifications.show({ title: 'Error', message: 'Failed to cancel event', color: 'red' }));
  };

  const filtered = events.filter((e) => {
    const q = search.toLowerCase();
    const match = e.title?.toLowerCase().includes(q) || e.venue?.toLowerCase().includes(q);
    if (activeTab === 'active') return match && e.status === 'active';
    if (activeTab === 'draft') return match && e.status === 'draft';
    if (activeTab === 'completed') return match && e.status === 'completed';
    return match;
  });

  const counts = {
    active: events.filter((e) => e.status === 'active').length,
    draft: events.filter((e) => e.status === 'draft').length,
    completed: events.filter((e) => e.status === 'completed').length,
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Group justify="space-between" mb="lg" wrap="wrap">
        <Title order={2}>My Events</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => navigate('/organizer/events/create')}>Create New Event</Button>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Stack gap="md" mb="md">
          <Group justify="space-between" wrap="wrap">
            <Tabs.List>
              <Tabs.Tab value="active">Active ({counts.active})</Tabs.Tab>
              <Tabs.Tab value="draft">Draft ({counts.draft})</Tabs.Tab>
              <Tabs.Tab value="completed">Completed ({counts.completed})</Tabs.Tab>
            </Tabs.List>
            <TextInput
              placeholder="Search events by name or venue..."
              leftSection={<IconSearch size={16} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              w={{ base: '100%', sm: 320 }}
            />
          </Group>
        </Stack>

        {loading ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {[1, 2, 3].map((i) => (
              <Card key={i} padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="sm">
                  <Skeleton height={22} width={80} radius="sm" />
                  <Skeleton height={28} width={60} radius="sm" />
                </Group>
                <Skeleton height={20} width="80%" radius="sm" mb="xs" />
                <Skeleton height={14} width="50%" radius="sm" mb="xs" />
                <Skeleton height={14} width="40%" radius="sm" mb="md" />
                <Group justify="space-between" pt="sm">
                  <Skeleton height={16} width={80} radius="sm" />
                  <Skeleton height={16} width={60} radius="sm" />
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        ) : filtered.length === 0 ? (
          <Stack align="center" py="xl">
            <Text c="dimmed" size="lg">No events found</Text>
            <Text c="dimmed" size="sm">{search ? 'Try a different search term' : 'No events in this category yet'}</Text>
          </Stack>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {filtered.map((event) => {
              const ticketsSold = (event.totalSeats || 0) - (event.availableSeats || 0);
              const revenue = ticketsSold * (event.price || 0);
              return (
                <motion.div key={event._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                  <Card padding="lg" radius="md" withBorder h="100%">
                    <Group justify="space-between" mb="sm">
                      <Badge color={getStatusColor(event.status)} variant="light" size="sm">{getStatusLabel(event.status)}</Badge>
                      <Group gap={4}>
                        <Button variant="subtle" size="compact-sm" onClick={() => navigate(`/organizer/events/${event._id}`)}><IconEye size={14} /></Button>
                        <Button variant="subtle" size="compact-sm" onClick={() => navigate(`/organizer/events/${event._id}/edit`)}><IconEdit size={14} /></Button>
                        <Button variant="subtle" size="compact-sm" color="red" onClick={() => handleDelete(event._id)}><IconTrash size={14} /></Button>
                      </Group>
                    </Group>

                    <Text fw={600} size="md" mb="xs" lineClamp={2}>{event.title}</Text>

                    <Group gap="xs" mb={4}>
                      <IconCalendarEvent size={14} />
                      <Text size="sm" c="dimmed">{formatDate(event.date)}</Text>
                    </Group>
                    <Text size="sm" c="dimmed" mb="md">{event.venue}</Text>

                    <Group justify="space-between" pt="sm" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
                      <Group gap={4}>
                        <IconUsers size={16} />
                        <Text size="sm">{ticketsSold} sold</Text>
                      </Group>
                      <Group gap={4}>
                        <IconCurrencyRupee size={16} />
                        <Text size="sm" fw={600}>{formatCurrency(revenue)}</Text>
                      </Group>
                    </Group>
                  </Card>
                </motion.div>
              );
            })}
          </SimpleGrid>
        )}
      </Tabs>
    </motion.div>
  );
}
