import { useState } from 'react'
import { Container, Title, Text, Card, Badge, Button, Grid, SimpleGrid, Group, Stack, Divider, Breadcrumbs, Anchor, ActionIcon } from '@mantine/core'
import { IconCalendar, IconMapPin, IconClock, IconUsers, IconHeart, IconShare, IconMinus, IconPlus } from '@tabler/icons-react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'

const events = [
  { id: 1, title: 'Summer Music Festival', category: 'Music', date: '2026-07-15', time: '4:00 PM', location: 'Central Park, NY', price: 89, image: '', status: 'available', organizer: 'Live Nation', description: 'Annual summer music festival featuring top artists from around the world. Enjoy live performances, food stalls, and a vibrant atmosphere across multiple stages. This is the biggest music event of the summer season.' },
  { id: 2, title: 'Basketball Championship', category: 'Sports', date: '2026-08-20', time: '7:00 PM', location: 'Madison Square Garden', price: 120, image: '', status: 'available', organizer: 'NBA Events', description: 'Watch the championship finals live at the iconic Madison Square Garden. Experience the thrill of professional basketball at its finest.' },
  { id: 3, title: 'Modern Art Exhibition', category: 'Arts', date: '2026-06-10', time: '10:00 AM', location: 'MoMA, NYC', price: 45, image: '', status: 'available', organizer: 'Art Foundation', description: 'Contemporary art from emerging artists around the world. A must-see exhibition for art enthusiasts and collectors.' },
  { id: 4, title: 'Food & Wine Festival', category: 'Food', date: '2026-09-05', time: '12:00 PM', location: 'Pier 36, NYC', price: 75, image: '', status: 'available', organizer: 'Gourmet Events', description: 'Taste cuisines from top chefs paired with fine wines from renowned vineyards around the globe.' },
  { id: 5, title: 'Tech Conference 2026', category: 'Tech', date: '2026-10-12', time: '9:00 AM', location: 'Convention Center, SF', price: 299, image: '', status: 'sold-out', organizer: 'Tech Innovators', description: 'Latest in AI, cloud, and cybersecurity with keynotes from industry leaders and hands-on workshops.' },
  { id: 6, title: 'Startup Networking', category: 'Business', date: '2026-11-08', time: '6:00 PM', location: 'WeWork, NYC', price: 25, image: '', status: 'available', organizer: 'Entrepreneur Hub', description: 'Connect with founders and investors over drinks and networking activities.' },
  { id: 7, title: 'Jazz Night', category: 'Music', date: '2026-07-22', time: '8:00 PM', location: 'Blue Note, NYC', price: 55, image: '', status: 'available', organizer: 'Jazz Club', description: 'An evening of smooth jazz performances by world-class musicians.' },
  { id: 8, title: 'Marathon 2026', category: 'Sports', date: '2026-11-03', time: '6:00 AM', location: 'Brooklyn Bridge', price: 60, image: '', status: 'available', organizer: 'Run NYC', description: 'Annual marathon through iconic NYC streets with thousands of participants.' },
  { id: 9, title: 'Photography Workshop', category: 'Arts', date: '2026-06-25', time: '2:00 PM', location: 'Chelsea Gallery', price: 35, image: '', status: 'sold-out', organizer: 'Lens Masters', description: 'Learn techniques from professional photographers in this hands-on workshop.' },
  { id: 10, title: 'Street Food Fair', category: 'Food', date: '2026-08-12', time: '11:00 AM', location: 'Smorgasburg, Brooklyn', price: 15, image: '', status: 'available', organizer: 'Food Trucks NYC', description: 'Diverse street food from around the globe in one vibrant location.' },
  { id: 11, title: 'AI Workshop', category: 'Tech', date: '2026-09-18', time: '10:00 AM', location: 'Google HQ, NYC', price: 150, image: '', status: 'available', organizer: 'Google AI', description: 'Hands-on workshop on machine learning and AI fundamentals.' },
  { id: 12, title: 'Investment Summit', category: 'Business', date: '2026-10-05', time: '8:00 AM', location: 'Wall Street', price: 500, image: '', status: 'available', organizer: 'Finance Group', description: 'Top investors share market insights and strategies for 2026.' },
]

const items = [
  { title: 'Home', href: '/' },
  { title: 'Events', href: '/events' },
  { title: 'Event Details', href: '#' },
]

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tickets, setTickets] = useState(1)
  const [favorited, setFavorited] = useState(false)

  const event = events.find((e) => e.id === Number(id))
  const related = events.filter((e) => e.category === event?.category && e.id !== event?.id).slice(0, 3)

  if (!event) {
    return (
      <Container size="xl" py="xl">
        <Stack align="center" py="xl">
          <Title order={2}>Event Not Found</Title>
          <Button onClick={() => navigate('/events')}>Back to Events</Button>
        </Stack>
      </Container>
    )
  }

  const subtotal = event.price * tickets
  const fees = subtotal * 0.05
  const total = subtotal + fees

  return (
    <Container size="xl" py="lg">
      <Breadcrumbs mb="lg">
        {items.map((item, index) => (
          index < items.length - 1
            ? <Anchor component={Link} to={item.href} key={item.title}>{item.title}</Anchor>
            : <Text key={item.title}>{event.title}</Text>
        ))}
      </Breadcrumbs>

      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Stack gap="lg">
              <Card padding={0} radius="md" withBorder style={{ overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: 320, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconCalendar size={64} color="rgba(255,255,255,0.4)" />
                  <Group gap="xs" style={{ position: 'absolute', top: 16, right: 16 }}>
                    <ActionIcon
                      variant={favorited ? 'filled' : 'default'}
                      color={favorited ? 'red' : 'gray'}
                      size="lg"
                      radius="xl"
                      onClick={() => setFavorited(!favorited)}
                    >
                      <IconHeart size={20} />
                    </ActionIcon>
                    <ActionIcon variant="default" size="lg" radius="xl">
                      <IconShare size={20} />
                    </ActionIcon>
                  </Group>
                  <Badge
                    color={event.status === 'sold-out' ? 'red' : 'green'}
                    size="lg"
                    style={{ position: 'absolute', top: 16, left: 16 }}
                  >
                    {event.status === 'sold-out' ? 'Sold Out' : 'Available'}
                  </Badge>
                </div>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <div>
                    <Badge variant="light" color="blue" size="sm" mb="xs">{event.category}</Badge>
                    <Title order={1}>{event.title}</Title>
                  </div>
                </Group>

                <Group gap="xs" mb="md">
                  <Text size="sm" c="dimmed">By</Text>
                  <Text size="sm" fw={600}>{event.organizer}</Text>
                </Group>

                <Grid gutter="md" mb="lg">
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Card withBorder padding="sm" radius="md" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                      <IconCalendar size={24} color="var(--mantine-color-blue-6)" />
                      <div>
                        <Text size="xs" c="dimmed" tt="uppercase">Date</Text>
                        <Text fw={600} size="sm">{dayjs(event.date).format('dddd, MMMM D, YYYY')}</Text>
                      </div>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Card withBorder padding="sm" radius="md" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                      <IconClock size={24} color="var(--mantine-color-blue-6)" />
                      <div>
                        <Text size="xs" c="dimmed" tt="uppercase">Time</Text>
                        <Text fw={600} size="sm">{event.time}</Text>
                      </div>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Card withBorder padding="sm" radius="md" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                      <IconMapPin size={24} color="var(--mantine-color-blue-6)" />
                      <div>
                        <Text size="xs" c="dimmed" tt="uppercase">Location</Text>
                        <Text fw={600} size="sm">{event.location}</Text>
                      </div>
                    </Card>
                  </Grid.Col>
                </Grid>

                <Divider mb="md" />

                <Title order={2} size="h3" mb="xs">About This Event</Title>
                <Text>{event.description}</Text>
              </Card>
            </Stack>
          </motion.div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ position: 'sticky', top: 80 }}>
            <Stack gap="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="xs">Tickets</Title>
                <Text size="xxxl" fw={700} c="blue" mb="md">
                  ${event.price}
                  <Text span size="sm" c="dimmed" fw={400}> / person</Text>
                </Text>

                <Group justify="space-between" mb="md">
                  <Text fw={600}>Quantity</Text>
                  <Group gap="xs">
                    <ActionIcon
                      variant="outline"
                      size="md"
                      onClick={() => setTickets(Math.max(1, tickets - 1))}
                      disabled={event.status === 'sold-out'}
                    >
                      <IconMinus size={16} />
                    </ActionIcon>
                    <Text fw={700} size="lg" w={32} ta="center">{tickets}</Text>
                    <ActionIcon
                      variant="outline"
                      size="md"
                      onClick={() => setTickets(tickets + 1)}
                      disabled={event.status === 'sold-out'}
                    >
                      <IconPlus size={16} />
                    </ActionIcon>
                  </Group>
                </Group>

                <Divider my="sm" />

                <Group justify="space-between" mb="xs">
                  <Text size="sm" c="dimmed">Subtotal</Text>
                  <Text fw={600}>${subtotal.toFixed(2)}</Text>
                </Group>
                <Group justify="space-between" mb="xs">
                  <Text size="sm" c="dimmed">Fees</Text>
                  <Text fw={600}>${fees.toFixed(2)}</Text>
                </Group>

                <Divider my="sm" />

                <Group justify="space-between" mb="lg">
                  <Text fw={700} size="lg">Total</Text>
                  <Text fw={700} size="lg" c="blue">${total.toFixed(2)}</Text>
                </Group>

                <Button fullWidth size="lg" disabled={event.status === 'sold-out'}>
                  {event.status === 'sold-out' ? 'Sold Out' : `Book Now — $${total.toFixed(2)}`}
                </Button>
              </Card>

              <Card withBorder padding="md" radius="md" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <IconUsers size={24} color="var(--mantine-color-blue-6)" />
                <div>
                  <Text size="xs" c="dimmed" tt="uppercase">Event Capacity</Text>
                  <Text fw={600}>{event.status === 'sold-out' ? 'Full' : 'Spots Available'}</Text>
                </div>
              </Card>
            </Stack>
          </motion.div>
        </Grid.Col>
      </Grid>

      {related.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Title order={2} mt="xl" mb="md">Related Events</Title>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {related.map((rel) => (
              <Card
                key={rel.id}
                shadow="sm"
                radius="md"
                withBorder
                component={Link}
                to={`/events/${rel.id}`}
                style={{ cursor: 'pointer', textDecoration: 'none' }}
              >
                <Card.Section style={{ height: 160, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconCalendar size={40} color="rgba(255,255,255,0.6)" />
                </Card.Section>
                <Group gap="xs" mt="md">
                  <Badge variant="light" color="blue" size="sm">{rel.category}</Badge>
                </Group>
                <Text fw={600} mt="xs">{rel.title}</Text>
                <Group gap="xs" mt="xs">
                  <IconCalendar size={14} />
                  <Text size="sm" c="dimmed">{dayjs(rel.date).format('MMM D, YYYY')}</Text>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </motion.div>
      )}
    </Container>
  )
}
