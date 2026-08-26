import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Paper, Title, Text, Group, SimpleGrid, Card, Badge, Table, ScrollArea, ThemeIcon, Skeleton, Stack, Divider, Select, Modal, Button, ActionIcon, Tooltip } from '@mantine/core';
import { IconCalendarEvent, IconTicket, IconEye } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';
import { eventAPI, bookingAPI } from '../../services/api';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [bookingsByEvent, setBookingsByEvent] = useState({});
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [viewBooking, setViewBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const eventsRes = await eventAPI.getMyEvents();
        const myEvents = eventsRes.data.data.events || [];
        setEvents(myEvents);

        const map = {};
        for (const evt of myEvents) {
          try {
            const bkRes = await bookingAPI.getEventBookings(evt._id);
            map[evt._id] = (bkRes.data.data.bookings || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          } catch {
            map[evt._id] = [];
          }
        }
        setBookingsByEvent(map);
        if (myEvents.length > 0) setSelectedEventId(myEvents[0]._id);
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

  const totalBookings = Object.values(bookingsByEvent).reduce((sum, list) => sum + list.length, 0);

  const stats = [
    { label: 'Total Events', value: String(events.length), icon: IconCalendarEvent, color: 'blue' },
    { label: 'Total Bookings', value: String(totalBookings), icon: IconTicket, color: 'violet' },
  ];

  const selectedBookings = selectedEventId ? (bookingsByEvent[selectedEventId] || []) : [];
  const selectedEvent = events.find((e) => e._id === selectedEventId) || events[0];

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
            <>
              <Box visibleFrom="sm">
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
              </Box>
              <Box hiddenFrom="sm">
                <Stack gap="sm">
                  {events.map((e) => (
                    <Card key={e._id} withBorder padding="sm" radius="md">
                      <Group justify="space-between" mb={4}>
                        <Text size="sm" fw={600} lineClamp={1}>{e.title}</Text>
                        <Badge color={getStatusColor(e.status)} variant="light" size="sm">{getStatusLabel(e.status)}</Badge>
                      </Group>
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">{formatDate(e.date)}</Text>
                        <Text size="xs">Sold: {((e.totalSeats || 0) - (e.availableSeats || 0))} / {e.totalSeats}</Text>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </Box>
            </>
          )}
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md" wrap="wrap">
            <Title order={4}>Event Bookings</Title>
            <Select
              placeholder="Select event"
              value={selectedEventId}
              onChange={setSelectedEventId}
              data={events.map((e) => ({ value: e._id, label: e.title }))}
              w={260}
              searchable
              clearable={false}
              size="xs"
            />
          </Group>
          {!selectedEventId ? (
            <Text c="dimmed" ta="center" py="xl">No events yet. Create your first event!</Text>
          ) : selectedBookings.length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">No bookings yet for "{selectedEvent?.title}"</Text>
          ) : (
            <>
              <Text size="xs" c="dimmed" mb="sm">
                {selectedBookings.length} booking(s) for "{selectedEvent?.title}"
              </Text>
              <Box visibleFrom="sm">
                <ScrollArea>
                  <Table striped highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Customer</Table.Th>
                        <Table.Th>Tickets</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Actions</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {selectedBookings.slice(0, 10).map((b) => (
                        <Table.Tr key={b._id}>
                          <Table.Td>
                            <Text size="sm" fw={500}>{b.userId?.name || 'N/A'}</Text>
                            <Text size="xs" c="dimmed">{b.userId?.email || 'N/A'}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm">{b.quantity}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge color={getStatusColor(b.bookingStatus)} variant="light" size="sm">
                              {getStatusLabel(b.bookingStatus)}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Tooltip label="View attendee & booking details">
                              <ActionIcon variant="subtle" color="blue" onClick={() => setViewBooking(b)}>
                                <IconEye size={18} />
                              </ActionIcon>
                            </Tooltip>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              </Box>
              <Box hiddenFrom="sm">
                <Stack gap="sm">
                  {selectedBookings.slice(0, 10).map((b) => (
                    <Card key={b._id} withBorder padding="sm" radius="md">
                      <Group justify="space-between" mb={4}>
                        <Text size="sm" fw={500} lineClamp={1}>{b.userId?.name || 'N/A'}</Text>
                        <Badge color={getStatusColor(b.bookingStatus)} variant="light" size="sm">
                          {getStatusLabel(b.bookingStatus)}
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed">{b.userId?.email || 'N/A'}</Text>
                      <Group justify="space-between" mt={4}>
                        <Text size="xs" c="dimmed">{b.quantity} ticket(s)</Text>
                        <Button size="xs" variant="light" leftSection={<IconEye size={14} />} onClick={() => setViewBooking(b)}>
                          View Details
                        </Button>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </Box>
            </>
          )}
        </Card>
      </SimpleGrid>

      <Modal opened={!!viewBooking} onClose={() => setViewBooking(null)} title="Attendee & Booking Details" centered size="lg">
        {viewBooking && (
          <Stack gap="sm">
            <Group><Text fw={500} w={150}>Booking ID:</Text><Text ff="mono" fw={600}>{viewBooking.bookingId || viewBooking._id.slice(-8).toUpperCase()}</Text></Group>
            <Group><Text fw={500} w={150}>Event Name:</Text><Text fw={600}>{selectedEvent?.title || viewBooking.eventId?.title || 'N/A'}</Text></Group>
            <Divider my="xs" />
            <Group><Text fw={500} w={150}>Attendee Name:</Text><Text>{viewBooking.userId?.name || 'N/A'}</Text></Group>
            <Group><Text fw={500} w={150}>Attendee Email:</Text><Text>{viewBooking.userId?.email || 'N/A'}</Text></Group>
            <Divider my="xs" />
            <Group><Text fw={500} w={150}>Ticket Quantity:</Text><Text>{viewBooking.quantity} ticket(s)</Text></Group>
            <Group><Text fw={500} w={150}>Price Per Ticket:</Text><Text>{formatCurrency(selectedEvent?.price || viewBooking.eventId?.price || 0)}</Text></Group>
            <Group><Text fw={500} w={150}>Total Amount:</Text><Text fw={700} c="blue" size="lg">{formatCurrency(viewBooking.totalAmount || (selectedEvent?.price || 0) * viewBooking.quantity)}</Text></Group>
            <Group><Text fw={500} w={150}>Booking Date:</Text><Text>{formatDate(viewBooking.createdAt)}</Text></Group>
            <Group><Text fw={500} w={150}>Status:</Text><Badge color={getStatusColor(viewBooking.bookingStatus)}>{getStatusLabel(viewBooking.bookingStatus)}</Badge></Group>
            <Button fullWidth mt="md" variant="default" onClick={() => setViewBooking(null)}>Close</Button>
          </Stack>
        )}
      </Modal>
    </motion.div>
  );
}
