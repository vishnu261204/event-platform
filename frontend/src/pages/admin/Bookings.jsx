import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, Paper, Title, Text, Group, Table, ScrollArea, Badge, TextInput, Skeleton, Modal, Stack, Button, ActionIcon, Tooltip, Divider } from '@mantine/core';
import { IconSearch, IconEye } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';
import { adminAPI } from '../../services/api';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewBooking, setViewBooking] = useState(null);

  useEffect(() => {
    setLoading(true);
    adminAPI.getBookings()
      .then((res) => setBookings(res.data.data.bookings || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return b._id?.toLowerCase().includes(q) || b.eventId?.title?.toLowerCase().includes(q) || b.userId?.name?.toLowerCase().includes(q);
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Group justify="space-between" mb="lg" wrap="wrap">
        <Title order={2}>Manage Bookings</Title>
        <TextInput
          placeholder="Search bookings..."
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
          <>
            <Box visibleFrom="sm">
              <ScrollArea>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Booking ID</Table.Th>
                      <Table.Th>Event</Table.Th>
                      <Table.Th>User</Table.Th>
                      <Table.Th>Tickets</Table.Th>
                      <Table.Th>Total Price</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Date</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {filtered.length === 0 ? (
                      <Table.Tr><Table.Td colSpan={8}><Text ta="center" c="dimmed" py="xl">No bookings found</Text></Table.Td></Table.Tr>
                    ) : filtered.map((booking) => (
                      <Table.Tr key={booking._id}>
                        <Table.Td>
                          <Text size="sm" ff="mono">{booking.bookingId || booking._id.slice(-8).toUpperCase()}</Text>
                        </Table.Td>
                        <Table.Td>{booking.eventId?.title || 'N/A'}</Table.Td>
                        <Table.Td>{booking.userId?.name || 'N/A'}</Table.Td>
                        <Table.Td>{booking.quantity}</Table.Td>
                        <Table.Td>
                          <Text size="sm" fw={500}>{formatCurrency(booking.totalAmount || (booking.eventId?.price || 0) * booking.quantity)}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge color={getStatusColor(booking.bookingStatus)} size="sm">
                            {getStatusLabel(booking.bookingStatus)}
                          </Badge>
                        </Table.Td>
                        <Table.Td>{formatDate(booking.createdAt)}</Table.Td>
                        <Table.Td>
                          <Tooltip label="View details">
                            <ActionIcon variant="subtle" color="blue" onClick={() => setViewBooking(booking)}>
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
              {filtered.length === 0 ? (
                <Text ta="center" c="dimmed" py="xl">No bookings found</Text>
              ) : (
                <Stack gap="sm">
                  {filtered.map((booking) => (
                    <Card key={booking._id} withBorder padding="sm" radius="md">
                      <Group justify="space-between" mb={4}>
                        <Text size="xs" ff="mono" fw={600}>{booking.bookingId || booking._id.slice(-8).toUpperCase()}</Text>
                        <Badge color={getStatusColor(booking.bookingStatus)} size="sm">
                          {getStatusLabel(booking.bookingStatus)}
                        </Badge>
                      </Group>
                      <Text size="sm" fw={500} lineClamp={1}>{booking.eventId?.title || 'N/A'}</Text>
                      <Group gap="xs" mt={2}>
                        <Text size="xs" c="dimmed">by</Text>
                        <Text size="xs" fw={500}>{booking.userId?.name || 'N/A'}</Text>
                      </Group>
                      <Divider my="sm" />
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">{booking.quantity} ticket(s)</Text>
                        <Text size="sm" fw={600}>{formatCurrency(booking.totalAmount || (booking.eventId?.price || 0) * booking.quantity)}</Text>
                      </Group>
                      <Group justify="space-between" mt={4}>
                        <Text size="xs" c="dimmed">{formatDate(booking.createdAt)}</Text>
                        <Button size="xs" variant="light" leftSection={<IconEye size={14} />} onClick={() => setViewBooking(booking)}>
                          View
                        </Button>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              )}
            </Box>
          </>
        )}
      </Paper>

      <Modal opened={!!viewBooking} onClose={() => setViewBooking(null)} title="Booking Details" centered size="lg">
        {viewBooking && (
          <Stack gap="sm">
            <Group><Text fw={500} w={140}>Booking ID:</Text><Text ff="mono">{viewBooking.bookingId || viewBooking._id.slice(-8).toUpperCase()}</Text></Group>
            <Group><Text fw={500} w={140}>Event Name:</Text><Text>{viewBooking.eventId?.title || 'N/A'}</Text></Group>
            <Group><Text fw={500} w={140}>Attendee Name:</Text><Text>{viewBooking.userId?.name || 'N/A'}</Text></Group>
            <Group><Text fw={500} w={140}>Email:</Text><Text>{viewBooking.userId?.email || 'N/A'}</Text></Group>
            <Group><Text fw={500} w={140}>Quantity:</Text><Text>{viewBooking.quantity}</Text></Group>
            <Group><Text fw={500} w={140}>Price Per Ticket:</Text><Text>{formatCurrency(viewBooking.eventId?.price || 0)}</Text></Group>
            <Group><Text fw={500} w={140}>Total Amount:</Text><Text fw={700}>{formatCurrency(viewBooking.totalAmount || (viewBooking.eventId?.price || 0) * viewBooking.quantity)}</Text></Group>
            <Group><Text fw={500} w={140}>Booking Date:</Text><Text>{formatDate(viewBooking.createdAt)}</Text></Group>
            <Group><Text fw={500} w={140}>Status:</Text><Badge color={getStatusColor(viewBooking.bookingStatus)}>{getStatusLabel(viewBooking.bookingStatus)}</Badge></Group>
            <Button fullWidth mt="md" variant="default" onClick={() => setViewBooking(null)}>Close</Button>
          </Stack>
        )}
      </Modal>
    </motion.div>
  );
}
