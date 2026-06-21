import { useState } from 'react';
import { motion } from 'framer-motion';
import { Title, Text, Group, Stack, SimpleGrid, Paper, Card, Badge, Button, TextInput, Alert, ThemeIcon } from '@mantine/core';
import { IconSearch, IconCheck, IconX, IconQrcode, IconTicket, IconCalendar, IconUsers, IconClock } from '@tabler/icons-react';
import { formatDate, getStatusColor, getStatusLabel } from '../../lib/utils';

const bookings = [
  { id: 'BK-001', customer: 'Alice Johnson', email: 'alice@example.com', event: 'Summer Music Festival', tickets: 2, status: 'confirmed', date: '2026-06-20' },
  { id: 'BK-002', customer: 'Bob Smith', email: 'bob@example.com', event: 'Tech Conference 2026', tickets: 1, status: 'checked-in', date: '2026-06-19' },
  { id: 'BK-003', customer: 'Carol White', email: 'carol@example.com', event: 'Music Festival', tickets: 3, status: 'confirmed', date: '2026-06-18' },
];

const recent = [
  { id: 'BK-002', customer: 'Bob Smith', time: '2 mins ago' },
  { id: 'BK-007', customer: 'Grace Kim', time: '15 mins ago' },
  { id: 'BK-009', customer: 'Henry Lee', time: '1 hour ago' },
];

const qrCells = Array.from({ length: 64 }).map(() => Math.random() > 0.5);

export default function QRCheckIn() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleSearch = (val) => {
    setSearch(val);
    setCheckedIn(false);
    const found = bookings.find(
      (b) => b.id.toLowerCase() === val.toLowerCase() || b.email.toLowerCase() === val.toLowerCase()
    );
    setSelected(found || null);
  };

  const handleCheckIn = () => {
    setCheckedIn(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Title order={2} mb="lg">QR Check-In</Title>

      <TextInput
        placeholder="Search by booking ID or email..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        mb="lg"
        maw={480}
        mx="auto"
      />

      {!selected ? (
        <Stack align="center" py="xl">
          <ThemeIcon variant="light" size="xl" radius="xl">
            <IconQrcode size={24} />
          </ThemeIcon>
          <Text size="lg" fw={500} mt="md">Search for a booking</Text>
          <Text size="sm" c="dimmed">Enter a booking ID or attendee email to find and check in a ticket</Text>
        </Stack>
      ) : (
        <>
          <Card withBorder shadow="sm" padding="lg" radius="md" maw={480} mx="auto" mb="lg">
            {checkedIn && (
              <Alert icon={<IconCheck size={16} />} color="green" variant="light" mb="md">
                Successfully checked in!
              </Alert>
            )}

            <Stack align="center" mb="md">
              <Paper
                withBorder
                p="sm"
                radius="md"
                style={{ backgroundColor: 'white' }}
              >
                <SimpleGrid cols={8} spacing={3}>
                  {qrCells.map((filled, i) => (
                    <Paper
                      key={i}
                      w={14}
                      h={14}
                      radius={2}
                      bg={filled ? 'dark' : 'transparent'}
                    />
                  ))}
                </SimpleGrid>
              </Paper>
              <Text size="xs" c="dimmed">Scan or enter code manually</Text>
            </Stack>

            <Group mb={6}>
              <IconUsers size={16} />
              <Text size="sm"><Text span fw={500}>{selected.customer}</Text> ({selected.email})</Text>
            </Group>
            <Group mb={6}>
              <IconCalendar size={16} />
              <Text size="sm">{selected.event}</Text>
            </Group>
            <Group mb={6}>
              <IconTicket size={16} />
              <Text size="sm">{selected.tickets} tickets</Text>
            </Group>
            <Group mb={6}>
              <Badge color={getStatusColor(selected.status)} variant="light" size="sm">{getStatusLabel(selected.status)}</Badge>
            </Group>
            <Text size="xs" c="dimmed" ff="mono">ID: {selected.id}</Text>

            <Button
              fullWidth
              size="md"
              mt="md"
              leftSection={<IconCheck size={16} />}
              onClick={handleCheckIn}
              disabled={checkedIn || selected.status === 'checked-in' || selected.status === 'cancelled'}
            >
              {checkedIn ? 'Checked In' : 'Check In'}
            </Button>
          </Card>

          <Paper withBorder p="md" radius="md" maw={480} mx="auto">
            <Group mb="sm">
              <IconClock size={16} />
              <Text fw={500}>Recent Check-Ins</Text>
            </Group>
            {recent.map((r) => (
              <Group key={r.id} justify="space-between" py="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Group>
                  <ThemeIcon variant="light" color="green" size="sm" radius="xl">
                    <IconCheck size={12} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" fw={500}>{r.customer}</Text>
                    <Text size="xs" c="dimmed">{r.id}</Text>
                  </div>
                </Group>
                <Text size="xs" c="dimmed">{r.time}</Text>
              </Group>
            ))}
          </Paper>
        </>
      )}
    </motion.div>
  );
}
