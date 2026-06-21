import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Paper, Title, Text, Group, Badge, Button, Tabs, Card } from '@mantine/core';
import { IconTicket, IconCalendar, IconMapPin, IconEye } from '@tabler/icons-react';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../../lib/utils';

const tickets = [
  { id: 1, eventName: 'Summer Music Festival', date: '2026-07-15', venue: 'Central Park, NY', ticketType: 'VIP', quantity: 2, total: 178, status: 'active' },
  { id: 2, eventName: 'Tech Conference 2026', date: '2026-10-12', venue: 'Convention Center, SF', ticketType: 'General', quantity: 1, total: 299, status: 'active' },
  { id: 3, eventName: 'Jazz Night', date: '2026-07-22', venue: 'Blue Note, NYC', ticketType: 'Standard', quantity: 3, total: 165, status: 'used' },
  { id: 4, eventName: 'Food & Wine Festival', date: '2026-09-05', venue: 'Pier 36, NYC', ticketType: 'VIP', quantity: 2, total: 150, status: 'used' },
  { id: 5, eventName: 'Marathon 2026', date: '2026-11-03', venue: 'Brooklyn Bridge', ticketType: 'General', quantity: 1, total: 60, status: 'cancelled' },
];

const gradients = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #11998e, #38ef7d)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #fa709a, #fee140)',
];

const qrPattern = [
  [1,1,1,1,1,1,1,0],
  [1,0,0,0,0,0,1,0],
  [1,0,1,1,1,0,1,0],
  [1,0,1,0,1,0,1,0],
  [1,0,1,1,1,0,1,0],
  [1,0,0,0,0,0,1,0],
  [1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0],
];

function QrGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 4px)', gap: 1 }}>
      {qrPattern.flat().map((filled, i) => (
        <div key={i} style={{ width: 4, height: 4, backgroundColor: filled ? '#333' : 'transparent' }} />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MyTickets() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcoming = tickets.filter((t) => t.status === 'active');
  const past = tickets.filter((t) => t.status !== 'active');
  const displayed = activeTab === 'upcoming' ? upcoming : past;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>
      <Title order={2} mb="lg">My Tickets</Title>

      <Tabs value={activeTab} onChange={setActiveTab} mb="lg">
        <Tabs.List>
          <Tabs.Tab value="upcoming" leftSection={<IconTicket size={16} />}>
            Upcoming ({upcoming.length})
          </Tabs.Tab>
          <Tabs.Tab value="past" leftSection={<IconCalendar size={16} />}>
            Past ({past.length})
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {displayed.length === 0 ? (
        <Paper p="xl" style={{ textAlign: 'center' }}>
          <IconTicket size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
          <Text size="lg" fw={500} mb={4}>
            {activeTab === 'upcoming' ? 'No upcoming tickets' : 'No past tickets'}
          </Text>
          <Text size="sm" c="dimmed">
            {activeTab === 'upcoming' ? 'Browse events and book your first ticket' : 'Your used and cancelled tickets will appear here'}
          </Text>
        </Paper>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {displayed.map((ticket, index) => (
            <motion.div key={ticket.id} variants={itemVariants}>
              <Card shadow="sm" radius="md" withBorder padding={0}>
                <Group gap={0} wrap="nowrap" align="stretch">
                  <div
                    style={{
                      width: 120,
                      minHeight: 120,
                      background: gradients[index % gradients.length],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IconTicket size={40} color="rgba(255,255,255,0.6)" />
                  </div>
                  <div style={{ flex: 1, padding: '16px 20px' }}>
                    <Group justify="space-between" align="flex-start" mb={8}>
                      <div>
                        <Text fw={600} size="md">{ticket.eventName}</Text>
                        <Group gap={4} mt={4}>
                          <IconCalendar size={14} />
                          <Text size="sm" c="dimmed">{formatDate(ticket.date)}</Text>
                        </Group>
                        <Group gap={4} mt={2}>
                          <IconMapPin size={14} />
                          <Text size="sm" c="dimmed">{ticket.venue}</Text>
                        </Group>
                      </div>
                      <Badge color={getStatusColor(ticket.status)} variant="light">
                        {getStatusLabel(ticket.status)}
                      </Badge>
                    </Group>
                    <Group gap="sm" mb={12}>
                      <Text size="sm" fw={500}>{ticket.ticketType}</Text>
                      <Text size="sm" c="dimmed">|</Text>
                      <Text size="sm" c="dimmed">Qty: {ticket.quantity}</Text>
                      <Text size="sm" c="dimmed">|</Text>
                      <Text size="sm" fw={500}>{formatCurrency(ticket.total)}</Text>
                    </Group>
                    <Group gap="md">
                      <Paper withBorder p={4} style={{ borderStyle: 'dashed' }}>
                        <QrGrid />
                      </Paper>
                      <Button
                        variant="outline"
                        size="sm"
                        leftSection={<IconEye size={14} />}
                        onClick={() => navigate(`/events/${ticket.id}`)}
                      >
                        View Event
                      </Button>
                    </Group>
                  </div>
                </Group>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
