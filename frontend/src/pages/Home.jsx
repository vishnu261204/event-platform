import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Calendar, Ticket, Users, Shield, Sparkles, ArrowRight, Check, Star, TrendingUp, MapPin, Clock, Search, Music, Palette, UtensilsCrossed, Monitor, Briefcase, Trophy } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SearchInput from '../components/ui/SearchInput';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const scaleItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const featuredEvents = [
  { id: 1, title: 'Summer Music Festival 2026', date: 'Aug 15, 2026', time: '4:00 PM', location: 'Central Park, New York', price: '$49', category: 'Music', rating: 4.8, attendees: 1200 },
  { id: 2, title: 'Tech Innovators Summit', date: 'Sep 10, 2026', time: '9:00 AM', location: 'Moscone Center, San Francisco', price: '$129', category: 'Tech', rating: 4.9, attendees: 850 },
  { id: 3, title: 'International Food Expo', date: 'Oct 5, 2026', time: '11:00 AM', location: 'Expo Center, Chicago', price: '$35', category: 'Food', rating: 4.7, attendees: 2100 },
];

const categories = [
  { name: 'Music', icon: Music, gradient: 'from-pink-500 to-rose-500', description: 'Concerts & festivals' },
  { name: 'Sports', icon: Trophy, gradient: 'from-emerald-500 to-teal-500', description: 'Games & tournaments' },
  { name: 'Arts', icon: Palette, gradient: 'from-violet-500 to-purple-500', description: 'Exhibitions & theater' },
  { name: 'Food', icon: UtensilsCrossed, gradient: 'from-amber-500 to-orange-500', description: 'Tastings & expos' },
  { name: 'Tech', icon: Monitor, gradient: 'from-blue-500 to-indigo-500', description: 'Conferences & workshops' },
  { name: 'Business', icon: Briefcase, gradient: 'from-cyan-500 to-sky-500', description: 'Networking & seminars' },
];

const steps = [
  { number: '01', title: 'Browse Events', description: 'Explore hundreds of amazing events across all categories and find what excites you.', icon: Search },
  { number: '02', title: 'Book Tickets', description: 'Secure your spot instantly with our seamless booking process and multiple payment options.', icon: Ticket },
  { number: '03', title: 'Enjoy Experience', description: 'Arrive at the venue with your digital ticket and create unforgettable memories.', icon: Sparkles },
];

const stats = [
  { label: 'Events Hosted', value: 500, icon: Calendar, suffix: '+' },
  { label: 'Tickets Sold', value: 50000, icon: Ticket, suffix: '+' },
  { label: 'Happy Customers', value: 25000, icon: Users, suffix: '+' },
  { label: 'Partners', value: 200, icon: Shield, suffix: '+' },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'Event Organizer', quote: 'EventHub made managing my conference incredibly easy. The ticket tracking and attendee management features are top-notch.', rating: 5 },
  { name: 'Michael Chen', role: 'Regular Attendee', quote: 'I discover so many amazing events through EventHub. The booking process is seamless and the QR check-in is incredibly convenient.', rating: 5 },
  { name: 'Emily Rodriguez', role: 'Music Enthusiast', quote: 'From indie concerts to major festivals, EventHub has everything. The personalized recommendations are always spot on.', rating: 5 },
];

const categoryGradients = {
  Music: 'from-pink-500 to-rose-500',
  Tech: 'from-blue-500 to-indigo-500',
  Food: 'from-amber-500 to-orange-500',
};

function AnimatedCounter({ target, suffix = '+' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const duration = 2000;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-warning-500 text-warning-500' : 'fill-secondary-200 text-secondary-200 dark:fill-secondary-700 dark:text-secondary-700'}`}
        />
      ))}
    </div>
  );
}

function FloatingShape({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary-900/60" />

        <FloatingShape className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-500/10 blur-3xl" delay={0} />
        <FloatingShape className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl" delay={1} />
        <FloatingShape className="absolute top-1/3 right-20 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl" delay={2} />
        <FloatingShape className="absolute top-1/4 left-1/3 w-24 h-24 rounded-full bg-pink-500/10 blur-3xl" delay={1.5} />

        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 w-full"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 mb-6 glass rounded-full px-4 py-1.5 border border-white/10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-white/80">Your ultimate event discovery platform</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Discover & Book{' '}
              <span className="text-gradient-hero">Amazing Events</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-secondary-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              From tech conferences to music festivals — find, book, and experience the best events in your city with just a few clicks.
            </motion.p>

            <motion.form
              onSubmit={handleSearchSubmit}
              className="max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="relative flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, categories, venues..."
                  className="w-full bg-transparent pl-12 pr-4 py-4 text-white placeholder:text-secondary-400 focus:outline-none text-base"
                />
                <button
                  type="submit"
                  className="mr-2 bg-primary-600 hover:bg-primary-700 text-white p-2.5 rounded-xl transition-colors shrink-0"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </motion.form>

            <motion.div
              className="flex items-center justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/events">
                <Button size="xl" className="bg-white text-primary-700 hover:bg-secondary-100 shadow-xl shadow-primary-900/20">
                  Search Events <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="xl" variant="ghost" className="text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50">
                  Create Event
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-6 mt-12 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-2 text-secondary-400 text-sm">
                <Check className="w-4 h-4 text-success-500" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-400 text-sm">
                <Check className="w-4 h-4 text-success-500" />
                <span>Instant booking</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-400 text-sm">
                <Check className="w-4 h-4 text-success-500" />
                <span>Secure payments</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary-50 dark:from-secondary-900 to-transparent" />
      </section>

      <section className="py-20 sm:py-28 bg-secondary-50 dark:bg-secondary-900">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
            <div>
              <Badge variant="primary" className="mb-3">Featured Events</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-2">Popular Events</h2>
              <p className="text-secondary-500 dark:text-secondary-400 text-lg">Most popular events attracting crowds right now</p>
            </div>
            <Link to="/events">
              <Button variant="outline" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {featuredEvents.map((event) => (
              <motion.div key={event.id} variants={cardItem}>
                <Card padding="none" className="group overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 sm:h-52 bg-gradient-to-br from-primary-100 to-violet-100 dark:from-primary-900/40 dark:to-violet-900/40 flex items-center justify-center overflow-hidden">
                    <Calendar className="w-14 h-14 text-primary-400 dark:text-primary-600/50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <Badge
                      variant="secondary"
                      className="absolute top-3 left-3 bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm border-0"
                    >
                      {event.date}
                    </Badge>
                    <Badge
                      variant="primary"
                      className="absolute top-3 right-3 bg-primary-600/90 text-white border-0"
                    >
                      {event.price}
                    </Badge>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryGradients[event.category] || 'from-primary-500 to-violet-500'}`} />
                      <span className="text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">{event.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-secondary-500 dark:text-secondary-400 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-secondary-500 dark:text-secondary-400 mb-3">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-secondary-100 dark:border-secondary-700">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-warning-500 text-warning-500" />
                          <span className="text-sm font-medium text-secondary-900 dark:text-white">{event.rating}</span>
                        </div>
                        <span className="text-xs text-secondary-400 dark:text-secondary-500">({event.attendees})</span>
                      </div>
                      <Link to={`/events/${event.id}`}>
                        <Button size="sm" variant="outline">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 sm:py-28 bg-white dark:bg-secondary-800">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-3">Categories</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-3">
              Browse by Category
            </h2>
            <p className="text-secondary-500 dark:text-secondary-400 text-lg max-w-xl mx-auto">
              Find events that match your interests and passions
            </p>
          </div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={scaleItem}>
                <Link to={`/events?category=${cat.name.toLowerCase()}`}>
                  <Card hover className="text-center py-8 px-4 group h-full">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <cat.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">{cat.name}</h3>
                    <p className="text-xs text-secondary-400 dark:text-secondary-500">{cat.description}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 sm:py-28 bg-secondary-50 dark:bg-secondary-900">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="text-center mb-14">
            <Badge variant="primary" className="mb-3">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-3">
              Three Simple Steps
            </h2>
            <p className="text-secondary-500 dark:text-secondary-400 text-lg max-w-xl mx-auto">
              Get your tickets in minutes with our streamlined process
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {steps.map((step, idx) => (
              <motion.div key={step.number} variants={cardItem} className="text-center relative">
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px border-t-2 border-dashed border-secondary-300 dark:border-secondary-600" />
                )}
                <div className="relative inline-flex mb-6">
                  <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br from-primary-50 to-violet-50 dark:from-primary-900/30 dark:to-violet-900/30 border border-primary-100 dark:border-primary-800/50 flex items-center justify-center shadow-sm">
                    <step.icon className="w-11 h-11 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-secondary-500 dark:text-secondary-400 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 sm:py-28 bg-white dark:bg-secondary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05]" />
        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-3">Our Impact</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-3">
              EventHub by the Numbers
            </h2>
            <p className="text-secondary-500 dark:text-secondary-400 text-lg max-w-xl mx-auto">
              Growing community of event organizers and attendees
            </p>
          </div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={scaleItem}>
                <Card className="text-center py-8 px-6 h-full">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-50 to-violet-50 dark:from-primary-900/30 dark:to-violet-900/30 flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-secondary-900 dark:text-white mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 sm:py-28 bg-secondary-50 dark:bg-secondary-900">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="text-center mb-14">
            <Badge variant="primary" className="mb-3">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-3">
              What People Say
            </h2>
            <p className="text-secondary-500 dark:text-secondary-400 text-lg max-w-xl mx-auto">
              Trusted by thousands of event organizers and attendees worldwide
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {testimonials.map((t, idx) => (
              <motion.div key={t.name} variants={cardItem}>
                <Card className="h-full flex flex-col relative">
                  <div className="absolute top-4 right-4 text-primary-200 dark:text-primary-800">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-violet-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white">{t.name}</h4>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed mb-5 flex-1">
                    "{t.quote}"
                  </p>
                  <StarRating rating={t.rating} />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="relative py-24 sm:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-violet-600 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-primary-300/20 blur-3xl" />

        <motion.div
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/10"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm text-white/90">Join 50,000+ happy users</span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to Get Started?
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Join thousands of event organizers and attendees already using EventHub. Start your journey today.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/register">
              <Button size="xl" className="bg-white text-primary-700 hover:bg-secondary-100 shadow-2xl shadow-primary-900/30">
                Create Account <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/events">
              <Button size="xl" variant="ghost" className="text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50">
                Browse Events
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
