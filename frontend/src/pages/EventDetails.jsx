import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, Badge, Button } from '../components/ui'
import { Calendar, MapPin, Clock, Users, Share2, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

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

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tickets, setTickets] = useState(1)
  const [favorited, setFavorited] = useState(false)

  const event = events.find((e) => e.id === Number(id))
  const related = events.filter((e) => e.category === event?.category && e.id !== event?.id).slice(0, 3)

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Event Not Found</h2>
          <Button onClick={() => navigate('/events')} className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-semibold">
            Back to Events
          </Button>
        </div>
      </div>
    )
  }

  const total = event.price * tickets

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/events" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Events</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">{event.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-[70%] space-y-6"
          >
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center overflow-hidden">
              {event.image ? (
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              ) : (
                <Calendar className="w-20 h-20 text-white/40" />
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => setFavorited(!favorited)} className={`p-2.5 rounded-full transition-all shadow-lg ${favorited ? 'bg-red-500 text-white' : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'}`}>
                  <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-lg">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <Badge className={`px-4 py-1.5 rounded-lg text-sm font-semibold shadow-lg ${event.status === 'sold-out' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                  {event.status === 'sold-out' ? 'Sold Out' : 'Available'}
                </Badge>
              </div>
            </div>

            <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                    {event.category}
                  </Badge>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                    {event.title}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">By</span>
                <span className="text-primary-600 dark:text-primary-400 font-semibold">{event.organizer}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Date</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Time</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Location</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{event.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About This Event</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{event.description}</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-[30%]"
          >
            <div className="sticky top-24 space-y-4">
              <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tickets</h3>
                <p className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 mb-6">
                  ${event.price}<span className="text-base font-normal text-gray-500 dark:text-gray-400"> / person</span>
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTickets(Math.max(1, tickets - 1))}
                      disabled={event.status === 'sold-out'}
                      className="w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold text-lg"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-lg text-gray-900 dark:text-white">{tickets}</span>
                    <button
                      onClick={() => setTickets(tickets + 1)}
                      disabled={event.status === 'sold-out'}
                      className="w-9 h-9 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Fees</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${(total * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">${(total * 1.05).toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  disabled={event.status === 'sold-out'}
                  className={`w-full py-3 rounded-xl text-base font-bold transition-all ${
                    event.status === 'sold-out'
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {event.status === 'sold-out' ? 'Sold Out' : `Book Now — $${(total * 1.05).toFixed(2)}`}
                </Button>
              </Card>

              <Card className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-secondary-100 dark:bg-secondary-900/40 text-secondary-600 dark:text-secondary-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Event Capacity</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{event.status === 'sold-out' ? 'Full' : 'Spots Available'}</p>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-14"
          >
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Related Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/events/${rel.id}`)}
                  className="cursor-pointer group"
                >
                  <Card className="overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                    <div className="h-40 bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
                      <Calendar className="w-10 h-10 text-white/60" />
                    </div>
                    <div className="p-4">
                      <Badge className="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 inline-block">
                        {rel.category}
                      </Badge>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(rel.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
