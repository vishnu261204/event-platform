import { useState, useMemo } from 'react'
import { Container, Title, Text, Card, Badge, Button, SimpleGrid, Group, Stack, TextInput } from '@mantine/core'
import { IconSearch, IconCalendar, IconMapPin, IconX } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'

const categories = ['All', 'Music', 'Sports', 'Arts', 'Food', 'Tech', 'Business']

const events = [
  { id: 1, title: 'Summer Music Festival', category: 'Music', date: '2026-07-15', time: '4:00 PM', location: 'Central Park, NY', price: 89, image: '', status: 'available', organizer: 'Live Nation', description: 'Annual summer music festival featuring top artists from around the world.' },
  { id: 2, title: 'Basketball Championship', category: 'Sports', date: '2026-08-20', time: '7:00 PM', location: 'Madison Square Garden', price: 120, image: '', status: 'available', organizer: 'NBA Events', description: 'Watch the championship finals live.' },
  { id: 3, title: 'Modern Art Exhibition', category: 'Arts', date: '2026-06-10', time: '10:00 AM', location: 'MoMA, NYC', price: 45, image: '', status: 'available', organizer: 'Art Foundation', description: 'Contemporary art from emerging artists.' },
  { id: 4, title: 'Food & Wine Festival', category: 'Food', date: '2026-09-05', time: '12:00 PM', location: 'Pier 36, NYC', price: 75, image: '', status: 'available', organizer: 'Gourmet Events', description: 'Taste cuisines from top chefs paired with fine wines.' },
  { id: 5, title: 'Tech Conference 2026', category: 'Tech', date: '2026-10-12', time: '9:00 AM', location: 'Convention Center, SF', price: 299, image: '', status: 'sold-out', organizer: 'Tech Innovators', description: 'Latest in AI, cloud, and cybersecurity.' },
  { id: 6, title: 'Startup Networking', category: 'Business', date: '2026-11-08', time: '6:00 PM', location: 'WeWork, NYC', price: 25, image: '', status: 'available', organizer: 'Entrepreneur Hub', description: 'Connect with founders and investors.' },
  { id: 7, title: 'Jazz Night', category: 'Music', date: '2026-07-22', time: '8:00 PM', location: 'Blue Note, NYC', price: 55, image: '', status: 'available', organizer: 'Jazz Club', description: 'An evening of smooth jazz performances.' },
  { id: 8, title: 'Marathon 2026', category: 'Sports', date: '2026-11-03', time: '6:00 AM', location: 'Brooklyn Bridge', price: 60, image: '', status: 'available', organizer: 'Run NYC', description: 'Annual marathon through iconic NYC streets.' },
  { id: 9, title: 'Photography Workshop', category: 'Arts', date: '2026-06-25', time: '2:00 PM', location: 'Chelsea Gallery', price: 35, image: '', status: 'sold-out', organizer: 'Lens Masters', description: 'Learn techniques from professional photographers.' },
  { id: 10, title: 'Street Food Fair', category: 'Food', date: '2026-08-12', time: '11:00 AM', location: 'Smorgasburg, Brooklyn', price: 15, image: '', status: 'available', organizer: 'Food Trucks NYC', description: 'Diverse street food from around the globe.' },
  { id: 11, title: 'AI Workshop', category: 'Tech', date: '2026-09-18', time: '10:00 AM', location: 'Google HQ, NYC', price: 150, image: '', status: 'available', organizer: 'Google AI', description: 'Hands-on workshop on machine learning.' },
  { id: 12, title: 'Investment Summit', category: 'Business', date: '2026-10-05', time: '8:00 AM', location: 'Wall Street', price: 500, image: '', status: 'available', organizer: 'Finance Group', description: 'Top investors share market insights.' },
]

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
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase())
      const matchCategory = activeCategory === 'All' || e.category === activeCategory
      return matchSearch && matchCategory
    })
  }, [search, activeCategory])

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start">
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

        <Group gap="xs">
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

        {filtered.length > 0 ? (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {filtered.map((event) => (
                <motion.div key={event.id} variants={itemVariants}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Card.Section style={{ position: 'relative', height: 192, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconCalendar size={48} color="rgba(255,255,255,0.6)" />
                      <Badge
                        style={{ position: 'absolute', top: 12, left: 12 }}
                        size="lg"
                        radius="sm"
                      >
                        {dayjs(event.date).format('MMM D')}
                      </Badge>
                    </Card.Section>

                    <Badge variant="light" color="blue" size="sm" mt="md" style={{ alignSelf: 'flex-start' }}>
                      {event.category}
                    </Badge>

                    <Title order={3} mt="xs">{event.title}</Title>

                    <Group gap="xs" mt="xs">
                      <IconMapPin size={14} />
                      <Text size="sm" c="dimmed">{event.location}</Text>
                    </Group>

                    <Group justify="space-between" mt="auto" pt="md">
                      <Text fw={700} size="xl" c="blue">${event.price}</Text>
                      <Button onClick={() => navigate(`/events/${event.id}`)}>
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
            <Title order={3}>No events found</Title>
            <Text c="dimmed">Try adjusting your search or filter.</Text>
          </Stack>
        )}
      </Stack>
    </Container>
  )
}
