import { useState, useEffect } from 'react'
import { Container, Title, Text, Card, Badge, Button, Grid, SimpleGrid, Group, Stack, Divider, Breadcrumbs, Anchor, ActionIcon, Skeleton } from '@mantine/core'
import { formatCurrency, getImageUrl } from '../lib/utils'
import { IconCalendar, IconMapPin, IconClock, IconUsers, IconHeart, IconShare, IconMinus, IconPlus } from '@tabler/icons-react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import { eventAPI } from '../services/api'
import PaymentModal from '../components/booking/PaymentModal'

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [tickets, setTickets] = useState(1)
  const [favorited, setFavorited] = useState(false)
  const [paymentOpened, setPaymentOpened] = useState(false)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    eventAPI.getById(id)
      .then((res) => setEvent(res.data.data.event))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <Container size="xl" py="lg">
        <Skeleton height={20} width={200} radius="sm" mb="lg" />
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Stack gap="lg">
              <Skeleton height={320} radius="md" mb="lg" />
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Skeleton height={28} width="60%" radius="sm" mb="md" />
                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" mb="lg">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} withBorder padding="sm" radius="md">
                      <Group gap={12}>
                        <Skeleton height={24} width={24} radius="sm" />
                        <Stack gap={4}>
                          <Skeleton height={10} width={60} radius="sm" />
                          <Skeleton height={14} width={100} radius="sm" />
                        </Stack>
                      </Group>
                    </Card>
                  ))}
                </SimpleGrid>
                <Skeleton height={14} width={120} radius="sm" mb="xs" />
                <Skeleton height={200} radius="sm" />
              </Card>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Skeleton height={22} width={80} radius="sm" mb="md" />
                <Skeleton height={36} width={120} radius="sm" mb="md" />
                <Group justify="space-between" mb="md">
                  <Skeleton height={16} width={60} radius="sm" />
                  <Group gap="xs">
                    <Skeleton height={32} width={32} radius="sm" />
                    <Skeleton height={24} width={32} radius="sm" />
                    <Skeleton height={32} width={32} radius="sm" />
                  </Group>
                </Group>
                <Divider my="sm" />
                <Skeleton height={36} width="100%" radius="sm" />
              </Card>
              <Skeleton height={60} radius="md" />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    )
  }

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
  const total = subtotal
  const venue = event.venue || event.location || ''
  const location = event.location || event.venue || ''

  return (
    <Container size="xl" py="lg">
      <Breadcrumbs mb="lg">
        {[{ title: 'Events', href: '/' }, { title: event.title, href: '#' }].map((item, index) =>
          index < 1
            ? <Anchor component={Link} to={item.href} key={item.title}>{item.title}</Anchor>
            : <Text key={item.title}>{event.title}</Text>
        )}
      </Breadcrumbs>

      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Stack gap="lg">
              <Card padding={0} radius="md" withBorder style={{ overflow: 'hidden' }}>
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  {event.banner ? (
                    <img src={getImageUrl(event.banner)} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: 320, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconCalendar size={64} color="rgba(255,255,255,0.4)" />
                    </div>
                  )}
                  <Group gap="xs" style={{ position: 'absolute', top: 16, right: 16 }}>
                    <ActionIcon variant={favorited ? 'filled' : 'default'} color={favorited ? 'red' : 'gray'} size="lg" radius="xl" onClick={() => setFavorited(!favorited)}><IconHeart size={20} /></ActionIcon>
                    <ActionIcon variant="default" size="lg" radius="xl"><IconShare size={20} /></ActionIcon>
                  </Group>
                  <Badge color={event.status === 'cancelled' || event.status === 'sold_out' ? 'red' : 'green'} size="lg" style={{ position: 'absolute', top: 16, left: 16 }}>
                    {event.status === 'cancelled' ? 'Cancelled' : event.status === 'sold_out' ? 'Sold Out' : 'Available'}
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
                {event.organizerId && (
                  <Group gap="xs" mb="md"><Text size="sm" c="dimmed">By</Text><Text size="sm" fw={600}>{event.organizerId?.name || event.organizer || 'Organizer'}</Text></Group>
                )}

                <Grid gutter="md" mb="lg">
                  {[
                    { icon: IconCalendar, label: 'Date', value: dayjs(event.date).isValid() ? dayjs(event.date).format('dddd, MMMM D, YYYY') : event.date },
                    { icon: IconClock, label: 'Time', value: event.time },
                    { icon: IconMapPin, label: 'Location', value: location || venue },
                  ].map((item) => (
                    <Grid.Col key={item.label} span={{ base: 12, sm: 4 }}>
                      <Card withBorder padding="sm" radius="md" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <item.icon size={24} color="var(--mantine-color-blue-6)" />
                        <div><Text size="xs" c="dimmed" tt="uppercase">{item.label}</Text><Text fw={600} size="sm">{item.value}</Text></div>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>

                <Divider mb="md" />
                <Title order={2} size="h3" mb="xs">About This Event</Title>
                <Text>{event.description}</Text>
              </Card>
            </Stack>
          </motion.div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:sticky lg:top-20">
            <Stack gap="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="xs">Tickets</Title>
                <Text size="xxxl" fw={700} c="blue" mb="md">
                  {formatCurrency(event.price)}
                  <Text span size="sm" c="dimmed" fw={400}> / person</Text>
                </Text>

                <Group justify="space-between" mb="md">
                  <Text fw={600}>Quantity</Text>
                  <Group gap="xs">
                    <ActionIcon variant="outline" size="md" onClick={() => setTickets(Math.max(1, tickets - 1))} disabled={event.status !== 'active' && event.status !== 'available'}><IconMinus size={16} /></ActionIcon>
                    <Text fw={700} size="lg" w={32} ta="center">{tickets}</Text>
                    <ActionIcon variant="outline" size="md" onClick={() => setTickets(tickets + 1)} disabled={event.status !== 'active' && event.status !== 'available'}><IconPlus size={16} /></ActionIcon>
                  </Group>
                </Group>

                <Divider my="sm" />
                <Group justify="space-between" mb="xs"><Text size="sm" c="dimmed">Subtotal</Text><Text fw={600}>{formatCurrency(subtotal)}</Text></Group>
                <Divider my="sm" />
                <Group justify="space-between" mb="lg"><Text fw={700} size="lg">Total</Text><Text fw={700} size="lg" c="blue">{formatCurrency(total)}</Text></Group>

                {isAuthenticated ? (
                  <Button fullWidth size="lg" disabled={event.status !== 'active' && event.status !== 'available'} onClick={() => setPaymentOpened(true)}>
                    {(event.status !== 'active' && event.status !== 'available') ? 'Sold Out' : `Book Now — ${formatCurrency(total)}`}
                  </Button>
                ) : (
                  <Button fullWidth size="lg" onClick={() => navigate('/login')}>
                    Log in to Book
                  </Button>
                )}
              </Card>

              <Card withBorder padding="md" radius="md" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <IconUsers size={24} color="var(--mantine-color-blue-6)" />
                <div>
                  <Text size="xs" c="dimmed" tt="uppercase">Event Capacity</Text>
                  <Text fw={600}>{event.availableSeats !== undefined ? `${event.availableSeats} seats left` : 'Spots Available'}</Text>
                </div>
              </Card>
            </Stack>
          </motion.div>
        </Grid.Col>
      </Grid>

      <PaymentModal opened={paymentOpened} onClose={() => setPaymentOpened(false)} event={event} quantity={tickets} />
    </Container>
  )
}
