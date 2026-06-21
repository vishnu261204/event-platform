import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Group, SimpleGrid, Card, Badge, Button, TextInput, Tabs, Stack } from '@mantine/core';
import { IconSearch, IconEye, IconEdit, IconTrash, IconPlus, IconCalendarEvent, IconUsers, IconCurrencyDollar } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';

const events = [
  { id: 1, title: 'Summer Music Festival', date: '2026-07-15', status: 'published', ticketsSold: 120, revenue: 7200, venue: 'Central Park', category: 'Music' },
  { id: 2, title: 'Tech Conference 2026', date: '2026-08-20', status: 'published', ticketsSold: 85, revenue: 12750, venue: 'Convention Center', category: 'Technology' },
  { id: 3, title: 'Art Workshop Series', date: '2026-09-05', status: 'draft', ticketsSold: 0, revenue: 0, venue: 'Art Gallery', category: 'Art' },
  { id: 4, title: 'Food Festival', date: '2026-10-12', status: 'draft', ticketsSold: 0, revenue: 0, venue: 'City Square', category: 'Food' },
  { id: 5, title: 'Business Networking', date: '2026-06-30', status: 'published', ticketsSold: 45, revenue: 2250, venue: 'Business Hub', category: 'Business' },
];

export default function MyEvents() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  const filtered = events.filter((e) => {
    const q = search.toLowerCase();
    const match = e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q);
    if (activeTab === 'active') return match && e.status === 'published';
    return match && e.status === 'draft';
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>My Events</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => navigate('/organizer/events/create')}>Create New Event</Button>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Group justify="space-between" mb="md">
          <Tabs.List>
            <Tabs.Tab value="active">Active ({events.filter((e) => e.status === 'published').length})</Tabs.Tab>
            <Tabs.Tab value="draft">Draft ({events.filter((e) => e.status === 'draft').length})</Tabs.Tab>
          </Tabs.List>
          <TextInput
            placeholder="Search events by name or venue..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 320 }}
          />
        </Group>

        {filtered.length === 0 ? (
          <Stack align="center" py="xl">
            <Text c="dimmed" size="lg">No events found</Text>
            <Text c="dimmed" size="sm">{search ? 'Try a different search term' : 'No events in this category yet'}</Text>
          </Stack>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {filtered.map((event) => (
              <motion.div key={event.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                <Card padding="lg" radius="md" withBorder h="100%">
                  <Group justify="space-between" mb="sm">
                    <Badge color={getStatusColor(event.status)} variant="light" size="sm">{getStatusLabel(event.status)}</Badge>
                    <Group gap={4}>
                      <Button variant="subtle" size="compact-sm" onClick={() => navigate(`/organizer/events/${event.id}`)}><IconEye size={14} /></Button>
                      <Button variant="subtle" size="compact-sm" onClick={() => navigate(`/organizer/events/${event.id}/edit`)}><IconEdit size={14} /></Button>
                      <Button variant="subtle" size="compact-sm" color="red"><IconTrash size={14} /></Button>
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
                      <Text size="sm">{event.ticketsSold} sold</Text>
                    </Group>
                    <Group gap={4}>
                      <IconCurrencyDollar size={16} />
                      <Text size="sm" fw={600}>{formatCurrency(event.revenue)}</Text>
                    </Group>
                  </Group>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        )}
      </Tabs>
    </motion.div>
  );
}
