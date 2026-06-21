import { Container, Title, Text, Button, Card, Badge, Group, Stack, Grid, SimpleGrid, Paper, ThemeIcon, Center, Box, TextInput } from '@mantine/core';
import { IconTicket, IconCalendar, IconMapPin, IconSearch, IconArrowRight, IconStar, IconUsers, IconTrendingUp, IconShield, IconMusic, IconBallFootball, IconPalette, IconToolsKitchen2, IconDeviceLaptop, IconBriefcase, IconCheck } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

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

const featuredEvents = [
  { id: 1, title: 'Neon Nights Music Festival', date: '2026-08-15', location: 'Madison Square Garden, NY', price: '$89', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', badge: 'Music' },
  { id: 2, title: 'TechForward Summit 2026', date: '2026-09-20', location: 'Moscone Center, SF', price: '$249', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', badge: 'Tech' },
  { id: 3, title: 'Global Food Expo', date: '2026-10-05', location: 'McCormick Place, CHI', price: '$45', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', badge: 'Food' },
];

const categories = [
  { icon: IconMusic, label: 'Music', count: '1,240 events', color: 'violet' },
  { icon: IconBallFootball, label: 'Sports', count: '860 events', color: 'blue' },
  { icon: IconPalette, label: 'Arts', count: '720 events', color: 'pink' },
  { icon: IconToolsKitchen2, label: 'Food', count: '540 events', color: 'teal' },
  { icon: IconDeviceLaptop, label: 'Tech', count: '980 events', color: 'cyan' },
  { icon: IconBriefcase, label: 'Business', count: '670 events', color: 'orange' },
];

const steps = [
  { number: '01', title: 'Create an Event', desc: 'Set up your event page in minutes with our powerful dashboard and customization tools.' },
  { number: '02', title: 'Promote & Sell', desc: 'Reach millions of attendees with built-in marketing tools and social sharing.' },
  { number: '03', title: 'Host & Analyze', desc: 'Manage check-ins, track engagement, and review post-event analytics.' },
];

const stats = [
  { icon: IconCalendar, value: '50,000+', label: 'Events Hosted', color: 'blue' },
  { icon: IconTicket, value: '12M+', label: 'Tickets Sold', color: 'violet' },
  { icon: IconUsers, value: '8M+', label: 'Happy Customers', color: 'teal' },
  { icon: IconTrendingUp, value: '2,400+', label: 'Partners', color: 'pink' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Event Organizer', avatar: 'SC', text: 'EventHub transformed how we sell tickets. Our attendance grew 3x in the first month alone.', rating: 5 },
  { name: 'Marcus Rivera', role: 'Concert Promoter', avatar: 'MR', text: 'The analytics dashboard gives us insights we never had before. Absolutely game-changing platform.', rating: 5 },
  { name: 'Elena Kowalski', role: 'Conference Director', avatar: 'EK', text: 'From ticketing to check-in, everything is seamless. Our attendees love the experience.', rating: 5 },
];

export default function Home() {
  const navigate = useNavigate();

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
                <Button size="xl" radius="xl" rightSection={<IconArrowRight size={20} />} component={Link} to="/create">
                  Start Creating
                </Button>
                <Button size="xl" radius="xl" variant="outline" color="white" component={Link} to="/explore">
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
                  onKeyDown={(e) => { if (e.key === 'Enter' && e.target.value) navigate(`/explore?q=${encodeURIComponent(e.target.value)}`); }}
                />
              </Paper>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      <Container size="xl" py={100}>
        <motion.div {...fadeUp}>
          <Stack align="center" mb={50}>
            <Badge size="lg" variant="light" color="violet">Featured Events</Badge>
            <Title order={2} ta="center">Popular Events This Week</Title>
            <Text c="dimmed" size="lg" ta="center" maw={500}>Hand-picked trending events you don't want to miss</Text>
          </Stack>
        </motion.div>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {featuredEvents.map((event, i) => (
            <motion.div key={event.id} {...stagger} transition={{ ...stagger.transition, delay: i * 0.1 }}>
              <Card radius="lg" padding={0} withBorder style={{ overflow: 'hidden' }} shadow="md">
                <Box h={200} style={{ background: event.gradient, position: 'relative' }}>
                  <Badge
                    size="lg"
                    variant="filled"
                    color="white"
                    style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}
                  >
                    {dayjs(event.date).format('MMM D, YYYY')}
                  </Badge>
                  <Badge
                    size="sm"
                    variant="filled"
                    color="white"
                    style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)' }}
                  >
                    {event.badge}
                  </Badge>
                </Box>
                <Box p="lg">
                  <Title order={3} size="h4" mb="xs">{event.title}</Title>
                  <Group gap="xs" mb="xs">
                    <IconMapPin size={14} />
                    <Text size="sm" c="dimmed">{event.location}</Text>
                  </Group>
                  <Group justify="space-between" align="center" mt="md">
                    <Title order={4} c="violet">{event.price}</Title>
                    <Button radius="xl" variant="light" color="violet" component={Link} to={`/event/${event.id}`}>
                      Book Now
                    </Button>
                  </Group>
                </Box>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>

      <Box py={100} style={{ background: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))' }}>
        <Container size="xl">
          <motion.div {...fadeUp}>
            <Stack align="center" mb={50}>
              <Badge size="lg" variant="light" color="violet">Categories</Badge>
              <Title order={2} ta="center">Browse by Category</Title>
              <Text c="dimmed" size="lg" ta="center" maw={500}>Find your next experience across hundreds of categories</Text>
            </Stack>
          </motion.div>
          <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="md">
            {categories.map((cat, i) => (
              <motion.div key={cat.label} {...stagger} transition={{ ...stagger.transition, delay: i * 0.05 }}>
                <Card
                  radius="lg"
                  padding="lg"
                  withBorder
                  component={Link}
                  to={`/explore?category=${cat.label.toLowerCase()}`}
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  <Stack align="center" gap="xs">
                    <ThemeIcon variant="light" color={cat.color} size={50} radius="lg">
                      <cat.icon size={24} />
                    </ThemeIcon>
                    <Text fw={600} size="sm" ta="center">{cat.label}</Text>
                    <Text size="xs" c="dimmed">{cat.count}</Text>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

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

      <Box py={100} style={{ background: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))' }}>
        <Container size="xl">
          <motion.div {...fadeUp}>
            <Stack align="center" mb={50}>
              <Badge size="lg" variant="light" color="violet">By the Numbers</Badge>
              <Title order={2} ta="center">Trusted Worldwide</Title>
              <Text c="dimmed" size="lg" ta="center" maw={500}>EventHub powers events in over 120 countries</Text>
            </Stack>
          </motion.div>
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="lg">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} {...stagger} transition={{ ...stagger.transition, delay: i * 0.08 }}>
                <Card radius="lg" padding="xl" withBorder>
                  <Stack align="center" gap="xs">
                    <ThemeIcon variant="light" color={stat.color} size={48} radius="lg">
                      <stat.icon size={24} />
                    </ThemeIcon>
                    <Title order={2} style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>{stat.value}</Title>
                    <Text c="dimmed" size="sm">{stat.label}</Text>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Container size="xl" py={100}>
        <motion.div {...fadeUp}>
          <Stack align="center" mb={50}>
            <Badge size="lg" variant="light" color="violet">Testimonials</Badge>
            <Title order={2} ta="center">What Organizers Say</Title>
            <Text c="dimmed" size="lg" ta="center" maw={500}>Join thousands of satisfied event creators worldwide</Text>
          </Stack>
        </motion.div>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} {...stagger} transition={{ ...stagger.transition, delay: i * 0.1 }}>
              <Card radius="lg" padding="lg" withBorder>
                <Group gap="xs" mb="md">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <IconStar key={j} size={16} style={{ fill: 'var(--mantine-color-yellow-5)', color: 'var(--mantine-color-yellow-5)' }} />
                  ))}
                </Group>
                <Text mb="md" style={{ lineHeight: 1.7 }}>"{t.text}"</Text>
                <Group>
                  <Center
                    w={40}
                    h={40}
                    style={{ borderRadius: '50%', background: 'var(--mantine-color-violet-1)', color: 'var(--mantine-color-violet-8)', fontWeight: 700, fontSize: 14 }}
                  >
                    {t.avatar}
                  </Center>
                  <Box>
                    <Text fw={600} size="sm">{t.name}</Text>
                    <Text size="xs" c="dimmed">{t.role}</Text>
                  </Box>
                </Group>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
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
                Join 50,000+ organizers using EventHub to sell tickets, manage attendees, and grow their audience.
              </Text>
              <Group>
                <Button size="xl" radius="xl" color="white" c="violet" component={Link} to="/create">
                  Get Started Free
                </Button>
                <Button size="xl" radius="xl" variant="outline" color="white" component={Link} to="/explore">
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
