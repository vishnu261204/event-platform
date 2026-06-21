import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Paper, Title, Text, Group, SimpleGrid, Card, Badge, Table, ScrollArea, ThemeIcon, Skeleton, Stack } from '@mantine/core';
import { IconCalendarEvent, IconTicket } from '@tabler/icons-react';
import { formatDate, getStatusColor, getStatusLabel } from '../../lib/utils';
import { eventAPI, bookingAPI } from '../../services/api';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const eventsRes = await eventAPI.getMyEvents();
        const myEvents = eventsRes.data.data.events || [];
        setEvents(myEvents);

        const allBookings = [];
        for (const evt of myEvents) {
          try {
            const bkRes = await bookingAPI.getEventBookings(evt._id);
            const evtBookings = bkRes.data.data.bookings || [];
            allBookings.push(...evtBookings);
          } catch {}
        }
        setBookings(allBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch {} finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Skeleton height={36} width={350} radius="md" mb="lg" />
        <SimpleGrid cols={{ base: 1, sm: 2 }} mb="xl" maw={500}>
          {[1, 2].map((i) => (
            <Card key={i} padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <Skeleton height={14} width={100} radius="sm" />
                <Skeleton height={40} width={40} radius="md" />
              </Group>
              <Skeleton height={28} width={60} radius="sm" />
            </Card>
          ))}
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
          {[1, 2].map((i) => (
            <Card key={i} padding="lg" radius="md" withBorder>
              <Skeleton height={22} width={150} radius="sm" mb="md" />
              <Stack gap="xs">
                {[1, 2, 3, 4].map((j) => <Skeleton key={j} height={36} radius="sm" />)}
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </motion.div>
    );
  }

  const stats = [
    { label: 'Total Events', value: String(events.length), icon: IconCalendarEvent, color: 'blue' },
    { label: 'Total Bookings', value: String(bookings.length), icon: IconTicket, color: 'violet' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Title order={2} mb="lg">Organizer Dashboard</Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mb="xl" maw={500}>
        {stats.map((s) => (
          <Card key={s.label} padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{s.label}</Text>
              <ThemeIcon variant="light" color={s.color} size="lg" radius="md">
                <s.icon size={20} />
              </ThemeIcon>
            </Group>
            <Text fw={700} size="xl">{s.value}</Text>
          </Card>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">Your Events</Title>
          {events.length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">No events yet. Create your first event!</Text>
          ) : (
            <ScrollArea>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Sold</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {events.map((e) => (
                    <Table.Tr key={e._id}>
                      <Table.Td>
                        <Text size="sm" fw={500}>{e.title}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">{formatDate(e.date)}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color={getStatusColor(e.status)} variant="light" size="sm">{getStatusLabel(e.status)}</Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{((e.totalSeats || 0) - (e.availableSeats || 0))} / {e.totalSeats}</Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          )}
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">Recent Bookings</Title>
          {bookings.length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">No bookings yet</Text>
          ) : (
            <ScrollArea>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Customer</Table.Th>
                    <Table.Th>Event</Table.Th>
                    <Table.Th>Status</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {bookings.slice(0, 10).map((b) => (
                    <Table.Tr key={b._id}>
                      <Table.Td>
                        <Text size="sm" fw={500}>{b.userId?.name || 'N/A'}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{b.eventId?.title || 'N/A'}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color={getStatusColor(b.bookingStatus)} variant="light" size="sm">
                          {getStatusLabel(b.bookingStatus)}
                        </Badge>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          )}
        </Card>
      </SimpleGrid>
    </motion.div>
  );
}
