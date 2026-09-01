import { useState, useEffect } from 'react'
import { Container, Title, Text, Card, Badge, Button, SimpleGrid, Group, Stack, TextInput, Skeleton, Image, ScrollArea } from '@mantine/core'
import { formatCurrency, getImageUrl } from '../lib/utils'
import { IconSearch, IconCalendar, IconMapPin, IconX, IconTicket } from '@tabler/icons-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import { eventAPI } from '../services/api'

const categories = ['All', 'Music', 'Sports', 'Arts', 'Food', 'Technology', 'Business']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Events() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (search) params.search = search
    if (activeCategory !== 'All') params.category = activeCategory
    eventAPI.getAll(params)
      .then((res) => setEvents(res.data.data.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [search, activeCategory])

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start" wrap="wrap">
          <div>
            <Title order={1}>Discover Events</Title>
            <Text c="dimmed">Find and book the best events in your city</Text>
          </div>
          <TextInput
            placeholder="Search events..."
            leftSection={<IconSearch size={16} />}
            rightSection={search ? <IconX size={16} style={{ cursor: 'pointer' }} onClick={() => setSearch('')} /> : null}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            w={{ base: '100%', sm: 300 }}
          />
        </Group>

        <ScrollArea type="never">
          <Group gap="xs" wrap="nowrap">
            {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'filled' : 'outline'}
              size="sm"
              radius="xl"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </Group>
      </ScrollArea>

        {loading ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {[1, 2, 3].map((i) => (
              <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
                <Skeleton height={192} radius="md" mb="md" />
                <Skeleton height={22} width={80} radius="sm" mb="sm" />
                <Skeleton height={24} width="80%" radius="sm" mb="xs" />
                <Skeleton height={16} width="60%" radius="sm" mb="md" />
                <Group justify="space-between">
                  <Skeleton height={28} width={80} radius="sm" />
                  <Skeleton height={36} width={120} radius="sm" />
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        ) : events.length > 0 ? (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {events.map((event) => (
                <motion.div key={event._id} variants={itemVariants}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Card.Section style={{ position: 'relative', height: 192, overflow: 'hidden' }}>
                      {event.banner ? (
                        <Image src={getImageUrl(event.banner)} height={192} fit="cover" alt={event.title} />
                      ) : (
                        <div style={{ height: 192, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconCalendar size={48} color="rgba(255,255,255,0.6)" />
                        </div>
                      )}
                      <Badge
                        style={{ position: 'absolute', top: 12, left: 12 }}
                        size="lg"
                        radius="sm"
                      >
                        {dayjs(event.date).isValid() ? dayjs(event.date).format('MMM D') : event.date}
                      </Badge>
                    </Card.Section>

                    <Badge variant="light" color="blue" size="sm" mt="md" style={{ alignSelf: 'flex-start' }}>
                      {event.category}
                    </Badge>

                    <Title order={3} mt="xs">{event.title}</Title>

                    <Group gap="xs" mt="xs">
                      <IconMapPin size={14} />
                      <Text size="sm" c="dimmed">{event.venue || event.location}</Text>
                    </Group>

                    <Group justify="space-between" mt="auto" pt="md">
                      <Text fw={700} size="xl" c="blue">{formatCurrency(event.price)}</Text>
                      <Button onClick={() => navigate(`/events/${event._id}`)}>
                        View Details
                      </Button>
                    </Group>
                  </Card>
                </motion.div>
              ))}
            </SimpleGrid>
          </motion.div>
        ) : (
          <Stack align="center" py="xl">
            <IconTicket size={48} color="var(--mantine-color-gray-4)" />
            <Title order={3}>No events found</Title>
            <Text c="dimmed">Try adjusting your search or filter.</Text>
          </Stack>
        )}
      </Stack>
    </Container>
  )
}
