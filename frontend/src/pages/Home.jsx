import { useState, useEffect } from 'react';
import { Container, Title, Text, Button, Card, Badge, Group, Stack, SimpleGrid, Box, TextInput, Skeleton, Paper, Grid, Center } from '@mantine/core';
import { IconTicket, IconCalendar, IconMapPin, IconSearch, IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { eventAPI } from '../services/api';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const stagger = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { staggerChildren: 0.1, duration: 0.6, ease: 'easeOut' },
};

const steps = [
  { number: '01', title: 'Create an Event', desc: 'Set up your event page in minutes with our powerful dashboard and customization tools.' },
  { number: '02', title: 'Promote & Sell', desc: 'Reach millions of attendees with built-in marketing tools and social sharing.' },
  { number: '03', title: 'Host & Analyze', desc: 'Manage check-ins, track engagement, and review post-event analytics.' },
];

const gradients = [
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
];

export default function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventAPI.getAll({ limit: 6 })
      .then((res) => setEvents(res.data.data.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Box
        style={{
          background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 40%, #a855f7 70%, #6366f1 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <Container size="xl" py={100}>
          <motion.div {...fadeUp}>
            <Stack align="center" gap="xl">
              <Badge variant="filled" size="lg" radius="xl" color="white" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                Trusted by 50,000+ event organizers worldwide
              </Badge>
              <Title
                order={1}
                ta="center"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  background: 'linear-gradient(to right, #fff, #c4b5fd, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  maxWidth: 800,
                }}
              >
                The Ultimate Platform for Events & Ticketing
              </Title>
              <Text size="xl" ta="center" c="white" opacity={0.85} maw={600}>
                Discover, create, and sell tickets for unforgettable experiences. From intimate workshops to massive festivals — EventHub powers it all.
              </Text>
              <Group>
                <Button size="xl" radius="xl" rightSection={<IconArrowRight size={20} />} component={Link} to="/register">
                  Start Creating
                </Button>
                <Button size="xl" radius="xl" variant="outline" color="white" component={Link} to="/events">
                  Explore Events
                </Button>
              </Group>
              <Paper
                p={4}
                radius="xl"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', width: '100%', maxWidth: 560 }}
              >
                <TextInput
                  placeholder="Search events by name, city, or category..."
                  size="lg"
                  radius="xl"
                  variant="unstyled"
                  leftSection={<IconSearch size={20} />}
                  styles={{ input: { background: 'transparent', color: 'white', '&::placeholder': { color: 'rgba(255,255,255,0.6)' } } }}
                  onKeyDown={(e) => { if (e.key === 'Enter' && e.target.value) navigate(`/events?q=${encodeURIComponent(e.target.value)}`); }}
                />
              </Paper>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      <Container size="xl" py={100}>
        <motion.div {...fadeUp}>
          <Stack align="center" mb={50}>
            <Badge size="lg" variant="light" color="violet">Latest Events</Badge>
            <Title order={2} ta="center">Upcoming Events</Title>
            <Text c="dimmed" size="lg" ta="center" maw={500}>Discover trending events hand-picked for you</Text>
          </Stack>
        </motion.div>
        {loading ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {[1, 2, 3].map((i) => (
              <Card key={i} radius="lg" padding={0} withBorder shadow="md">
                <Skeleton height={200} radius={0} />
                <Box p="lg">
                  <Skeleton height={22} width="80%" radius="sm" mb="xs" />
                  <Skeleton height={14} width="60%" radius="sm" mb="md" />
                  <Group justify="space-between">
                    <Skeleton height={28} width={80} radius="sm" />
                    <Skeleton height={36} width={100} radius="sm" />
                  </Group>
                </Box>
              </Card>
            ))}
          </SimpleGrid>
        ) : events.length === 0 ? (
          <Stack align="center" py="xl">
            <IconTicket size={48} color="var(--mantine-color-gray-4)" />
            <Text c="dimmed" size="lg">No events available yet</Text>
            <Button component={Link} to="/create" variant="light">Create the first event</Button>
          </Stack>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {events.map((event, i) => (
              <motion.div key={event._id} {...stagger} transition={{ ...stagger.transition, delay: i * 0.1 }}>
                <Card radius="lg" padding={0} withBorder style={{ overflow: 'hidden' }} shadow="md">
                  <Box h={200} style={{ background: gradients[i % gradients.length], position: 'relative' }}>
                    <Badge
                      size="lg"
                      variant="filled"
                      color="white"
                      style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}
                    >
                      {dayjs(event.date).isValid() ? dayjs(event.date).format('MMM D, YYYY') : event.date}
                    </Badge>
                    <Badge
                      size="sm"
                      variant="filled"
                      color="white"
                      style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)' }}
                    >
                      {event.category}
                    </Badge>
                  </Box>
                  <Box p="lg">
                    <Title order={3} size="h4" mb="xs">{event.title}</Title>
                    <Group gap="xs" mb="xs">
                      <IconMapPin size={14} />
                      <Text size="sm" c="dimmed">{event.venue || event.location}</Text>
                    </Group>
                    <Group justify="space-between" align="center" mt="md">
                      <Title order={4} c="violet">₹{event.price}</Title>
                      <Button radius="xl" variant="light" color="violet" component={Link} to={`/events/${event._id}`}>
                        Book Now
                      </Button>
                    </Group>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        )}
      </Container>

      <Container size="xl" py={100}>
        <motion.div {...fadeUp}>
          <Stack align="center" mb={50}>
            <Badge size="lg" variant="light" color="violet">How It Works</Badge>
            <Title order={2} ta="center">Start in Three Simple Steps</Title>
            <Text c="dimmed" size="lg" ta="center" maw={500}>Get your event up and running faster than ever</Text>
          </Stack>
        </motion.div>
        <Grid>
          {steps.map((step, i) => (
            <Grid.Col key={step.number} span={{ base: 12, md: 4 }}>
              <motion.div {...stagger} transition={{ ...stagger.transition, delay: i * 0.15 }}>
                <Stack align="center" gap="md">
                  <Center
                    w={72}
                    h={72}
                    style={{
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--mantine-color-violet-6), var(--mantine-color-indigo-6))',
                      boxShadow: '0 8px 24px rgba(124,58,237,0.3)',
                    }}
                  >
                    <Title order={2} c="white">{step.number}</Title>
                  </Center>
                  <Title order={4} ta="center">{step.title}</Title>
                  <Text ta="center" c="dimmed" maw={280}>{step.desc}</Text>
                </Stack>
              </motion.div>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      <Box
        py={80}
        style={{
          background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #6366f1 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Container size="xl">
          <motion.div {...fadeUp}>
            <Stack align="center" gap="lg">
              <Title order={2} ta="center" c="white" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                Ready to Create Your Next Big Event?
              </Title>
              <Text size="lg" ta="center" c="white" opacity={0.85} maw={550}>
                Join thousands of organizers using EventHub to sell tickets, manage attendees, and grow their audience.
              </Text>
              <Group>
                <Button size="xl" radius="xl" color="white" c="violet" component={Link} to="/register">
                  Get Started Free
                </Button>
                <Button size="xl" radius="xl" variant="outline" color="white" component={Link} to="/events">
                  Browse Events
                </Button>
              </Group>
            </Stack>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
