import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { SearchInput, Card, Badge, Button, Pagination, EmptyState } from '../components/ui'
import { Calendar, MapPin, Search } from 'lucide-react'
import { motion } from 'framer-motion'

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

const ITEMS_PER_PAGE = 6

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function EventCard({ event }) {
  const navigate = useNavigate()

  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="relative h-48 bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
          {event.image ? (
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <Calendar className="w-12 h-12 text-white/60" />
          )}
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg text-sm font-semibold shadow">
              {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className={`px-3 py-1 rounded-lg text-xs font-semibold shadow ${event.status === 'sold-out' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
              {event.status === 'sold-out' ? 'Sold Out' : 'Available'}
            </Badge>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col gap-3">
          <Badge className="self-start bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-3 py-0.5 rounded-full text-xs font-medium">
            {event.category}
          </Badge>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
            {event.title}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              ${event.price}
            </span>
            <Button
              onClick={() => navigate(`/events/${event.id}`)}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function Events() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase())
      const matchCategory = activeCategory === 'All' || e.category === activeCategory
      return matchSearch && matchCategory
    })
  }, [search, activeCategory])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Discover Events
          </h1>
          <div className="w-full sm:w-72">
            <SearchInput
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
              placeholder="Search events..."
              className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 pl-10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              icon={<Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentPage(1) }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-transparent shadow-md'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {paginated.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paginated.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
        ) : (
          <div className="py-20">
            <EmptyState
              title="No events found"
              description="Try adjusting your search or filter."
              className="text-gray-500 dark:text-gray-400"
            />
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="flex items-center gap-2"
            />
          </div>
        )}
      </div>
    </div>
  )
}
