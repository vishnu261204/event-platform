import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, Title, Text, Badge, Table, Group, ScrollArea, TextInput, Paper, Skeleton, Stack, Divider, Tabs, Modal, Button, ActionIcon, Tooltip } from '@mantine/core';
import { IconSearch, IconTicket, IconEye } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';
import { eventAPI, bookingAPI } from '../../services/api';

export default function EventBookings() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Events');
  const [viewBooking, setViewBooking] = useState(null);

  useEffect(() => {
    setLoading(true);
    eventAPI.getMyEvents()
      .then(async (res) => {
        const myEvents = res.data.data.events || [];
        setEvents(myEvents);
        const allBookings = [];
        for (const evt of myEvents) {
          try {
            const bkRes = await bookingAPI.getEventBookings(evt._id);
            const evtBookings = (bkRes.data.data.bookings || []).map((b) => ({ ...b, eventTitle: evt.title }));
            allBookings.push(...evtBookings);
          } catch {}
        }
        setBookings(allBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    const match = (
      b._id?.toLowerCase().includes(q) ||
      b.bookingId?.toLowerCase().includes(q) ||
      b.userId?.name?.toLowerCase().includes(q) ||
      b.userId?.email?.toLowerCase().includes(q)
    );
    if (activeTab !== 'All Events') return match && b.eventTitle === activeTab;
    return match;
  });

  const eventNames = ['All Events', ...events.map((e) => e.title)];

  const rows = filtered.map((b) => (
    <Table.Tr key={b._id}>
      <Table.Td><Text size="sm" ff="mono">{b.bookingId || b._id.slice(-8).toUpperCase()}</Text></Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{b.userId?.name || 'N/A'}</Text>
        <Text size="xs" c="dimmed">{b.userId?.email || 'N/A'}</Text>
      </Table.Td>
      <Table.Td><Text size="sm">{b.quantity}</Text></Table.Td>
      <Table.Td><Text size="sm" fw={500}>{formatCurrency(b.totalAmount || (b.eventId?.price || 0) * b.quantity)}</Text></Table.Td>
      <Table.Td><Badge color={getStatusColor(b.bookingStatus)} variant="light" size="sm">{getStatusLabel(b.bookingStatus)}</Badge></Table.Td>
      <Table.Td><Text size="sm" c="dimmed">{formatDate(b.createdAt)}</Text></Table.Td>
      <Table.Td>
        <Tooltip label="View member & booking details">
          <ActionIcon variant="subtle" color="blue" onClick={() => setViewBooking(b)}>
            <IconEye size={18} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Title order={2} mb="lg">Event Bookings & Member Details</Title>

      <Paper withBorder radius="md">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Stack gap="md" p="md" pb={0}>
            <ScrollArea type="never">
              <Tabs.List>
                {eventNames.map((e) => (
                  <Tabs.Tab key={e} value={e}>{e}</Tabs.Tab>
                ))}
              </Tabs.List>
            </ScrollArea>
            <TextInput
              placeholder="Search by booking ID, member name, or email..."
              leftSection={<IconSearch size={16} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              w={{ base: '100%', sm: 380 }}
            />
          </Stack>
        </Tabs>

        {loading ? (
          <Stack gap="xs" p="md">
            {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} height={48} radius="sm" />)}
          </Stack>
        ) : rows.length === 0 ? (
          <Stack align="center" py="xl">
            <IconTicket size={48} color="var(--mantine-color-gray-4)" />
            <Text c="dimmed">No bookings found</Text>
          </Stack>
        ) : (
          <>
            <Box visibleFrom="sm">
              <ScrollArea>
                <Table striped highlightOnHover p="md">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Booking ID</Table.Th>
                      <Table.Th>Member / Customer</Table.Th>
                      <Table.Th>Tickets</Table.Th>
                      <Table.Th>Total</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Date</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </ScrollArea>
            </Box>
            <Box hiddenFrom="sm">
              <Stack gap="sm" p="md">
                {filtered.map((b) => (
                  <Card key={b._id} withBorder padding="sm" radius="md">
                    <Group justify="space-between" mb={4}>
                      <Text size="xs" ff="mono" fw={600}>{b.bookingId || b._id.slice(-8).toUpperCase()}</Text>
                      <Badge color={getStatusColor(b.bookingStatus)} variant="light" size="sm">{getStatusLabel(b.bookingStatus)}</Badge>
                    </Group>
                    <Text size="sm" fw={600}>{b.userId?.name || 'N/A'}</Text>
                    <Text size="xs" c="dimmed" mb={4}>{b.userId?.email || 'N/A'}</Text>
                    <Divider my="sm" />
                    <Group justify="space-between">
                      <Text size="xs" c="dimmed">{b.quantity} ticket(s)</Text>
                      <Text size="sm" fw={600}>{formatCurrency(b.totalAmount || (b.eventId?.price || 0) * b.quantity)}</Text>
                    </Group>
                    <Group justify="space-between" mt={4}>
                      <Text size="xs" c="dimmed">{formatDate(b.createdAt)}</Text>
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
      </Paper>

      <Modal opened={!!viewBooking} onClose={() => setViewBooking(null)} title="Booking Member Details" centered size="lg">
        {viewBooking && (
          <Stack gap="sm">
            <Group><Text fw={500} w={150}>Booking ID:</Text><Text ff="mono" fw={600}>{viewBooking.bookingId || viewBooking._id.slice(-8).toUpperCase()}</Text></Group>
            <Group><Text fw={500} w={150}>Event Name:</Text><Text fw={600}>{viewBooking.eventTitle || viewBooking.eventId?.title || 'N/A'}</Text></Group>
            <Divider my="xs" />
            <Group><Text fw={500} w={150}>Member Name:</Text><Text>{viewBooking.userId?.name || 'N/A'}</Text></Group>
            <Group><Text fw={500} w={150}>Member Email:</Text><Text>{viewBooking.userId?.email || 'N/A'}</Text></Group>
            <Divider my="xs" />
            <Group><Text fw={500} w={150}>Ticket Quantity:</Text><Text>{viewBooking.quantity} ticket(s)</Text></Group>
            <Group><Text fw={500} w={150}>Price Per Ticket:</Text><Text>{formatCurrency(viewBooking.eventId?.price || 0)}</Text></Group>
            <Group><Text fw={500} w={150}>Total Amount:</Text><Text fw={700} c="blue" size="lg">{formatCurrency(viewBooking.totalAmount || (viewBooking.eventId?.price || 0) * viewBooking.quantity)}</Text></Group>
            <Group><Text fw={500} w={150}>Booking Date:</Text><Text>{formatDate(viewBooking.createdAt)}</Text></Group>
            <Group><Text fw={500} w={150}>Status:</Text><Badge color={getStatusColor(viewBooking.bookingStatus)}>{getStatusLabel(viewBooking.bookingStatus)}</Badge></Group>
            <Button fullWidth mt="md" variant="default" onClick={() => setViewBooking(null)}>Close</Button>
          </Stack>
        )}
      </Modal>
    </motion.div>
  );
}
