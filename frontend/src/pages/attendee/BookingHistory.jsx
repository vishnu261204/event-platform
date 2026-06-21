import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, Title, Text, Badge, Table, ScrollArea, TextInput, Paper, Skeleton, Stack, Divider } from '@mantine/core';
import { IconSearch, IconTicket } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';
import { bookingAPI } from '../../services/api';

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    bookingAPI.getMyBookings()
      .then((res) => setBookings(res.data.data.bookings || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return bookings;
    const q = search.toLowerCase();
    return bookings.filter((b) => b.eventId?.title?.toLowerCase().includes(q));
  }, [search, bookings]);

  const rows = filtered.map((booking) => (
    <Table.Tr key={booking._id}>
      <Table.Td>
        <Text size="sm" fw={500}>{booking.eventId?.title || 'N/A'}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{formatDate(booking.eventId?.date)}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{booking.quantity}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={600}>{formatCurrency((booking.eventId?.price || 0) * booking.quantity)}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(booking.bookingStatus)} variant="light" size="sm">
          {getStatusLabel(booking.bookingStatus)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{formatDate(booking.createdAt)}</Text>
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
          w={{ base: '100%', sm: 360 }}
        />

        <Paper withBorder radius="md">
          {loading ? (
            <Stack gap="xs" p="md">
              {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} height={48} radius="sm" />)}
            </Stack>
          ) : (
            <>
              <Box visibleFrom="sm">
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
                            <Stack align="center" py="xl">
                              <IconTicket size={48} color="var(--mantine-color-gray-4)" />
                              <Text ta="center" c="dimmed">
                                {search ? 'No bookings match your search' : 'No bookings yet'}
                              </Text>
                            </Stack>
                          </Table.Td>
                        </Table.Tr>
                      )}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              </Box>
              <Box hiddenFrom="sm">
                {filtered.length === 0 ? (
                  <Stack align="center" py="xl">
                    <IconTicket size={48} color="var(--mantine-color-gray-4)" />
                    <Text ta="center" c="dimmed">{search ? 'No bookings match your search' : 'No bookings yet'}</Text>
                  </Stack>
                ) : (
                  <Stack gap="sm" p="xs">
                    {filtered.map((booking) => (
                      <Card key={booking._id} withBorder padding="sm" radius="md">
                        <Text fw={600} size="sm" lineClamp={1} mb={4}>{booking.eventId?.title || 'N/A'}</Text>
                        <Group justify="space-between" mb={4}>
                          <Text size="xs" c="dimmed">{formatDate(booking.eventId?.date)}</Text>
                          <Badge color={getStatusColor(booking.bookingStatus)} variant="light" size="sm">
                            {getStatusLabel(booking.bookingStatus)}
                          </Badge>
                        </Group>
                        <Divider my="sm" />
                        <Group justify="space-between">
                          <Text size="xs" c="dimmed">{booking.quantity} ticket(s)</Text>
                          <Text size="sm" fw={600}>{formatCurrency((booking.eventId?.price || 0) * booking.quantity)}</Text>
                        </Group>
                        <Text size="xs" c="dimmed" mt={4}>Booked on {formatDate(booking.createdAt)}</Text>
                      </Card>
                    ))}
                  </Stack>
                )}
              </Box>
            </>
          )}
        </Paper>
      </div>
    </motion.div>
  );
}
