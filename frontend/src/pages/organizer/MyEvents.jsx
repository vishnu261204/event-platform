import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit3, Eye, Trash2, CalendarIcon, MapPin, Users, DollarSign } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SearchInput from '../../components/ui/SearchInput';
import Tabs from '../../components/ui/Tabs';
import PageHeader from '../../components/ui/PageHeader';
import EmptyState from '../../components/ui/EmptyState';

const sampleEvents = [
  { id: 1, title: 'Summer Music Festival', date: '2026-07-15', status: 'published', ticketsSold: 120, revenue: 7200, venue: 'Central Park', category: 'Music' },
  { id: 2, title: 'Tech Conference 2026', date: '2026-08-20', status: 'published', ticketsSold: 85, revenue: 12750, venue: 'Convention Center', category: 'Technology' },
  { id: 3, title: 'Art Workshop Series', date: '2026-09-05', status: 'draft', ticketsSold: 0, revenue: 0, venue: 'Art Gallery', category: 'Art' },
  { id: 4, title: 'Food Festival', date: '2026-10-12', status: 'draft', ticketsSold: 0, revenue: 0, venue: 'City Square', category: 'Food' },
  { id: 5, title: 'Business Networking', date: '2026-06-30', status: 'published', ticketsSold: 45, revenue: 2250, venue: 'Business Hub', category: 'Business' },
];

function statusVariant(status) {
  if (status === 'published') return 'success';
  if (status === 'draft') return 'warning';
  if (status === 'cancelled') return 'danger';
  return 'secondary';
}

export default function MyEvents() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  const filtered = sampleEvents.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'active') return matchSearch && e.status === 'published';
    return matchSearch && e.status === 'draft';
  });

  const tabs = [
    { value: 'active', label: `Active (${sampleEvents.filter((e) => e.status === 'published').length})` },
    { value: 'draft', label: `Draft (${sampleEvents.filter((e) => e.status === 'draft').length})` },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader
        title="My Events"
        description="Manage your created events"
        action={
          <Link to="/organizer/events/create">
            <Button size="lg">Create New Event</Button>
          </Link>
        }
      />

      <Card padding="none">
        <div className="p-6 pb-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} tabs={tabs} />
          <div className="mt-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search events by name or venue..." />
          </div>
        </div>

        <div className="p-6">
          {filtered.length === 0 ? (
            <EmptyState
              title="No events found"
              description={search ? 'Try a different search term' : 'No events in this category yet'}
              action={activeTab === 'draft' ? { label: 'Create Event', onClick: () => {} } : undefined}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card hover className="p-5 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant={statusVariant(event.status)} size="sm">{event.status}</Badge>
                      <div className="flex gap-1">
                        <Link to={`/organizer/events/${event.id}`}>
                          <Button variant="ghost" size="xs" icon={<Eye className="h-3.5 w-3.5" />} />
                        </Link>
                        <Link to={`/organizer/events/${event.id}/edit`}>
                          <Button variant="ghost" size="xs" icon={<Edit3 className="h-3.5 w-3.5" />} />
                        </Link>
                        <Button variant="ghost" size="xs" icon={<Trash2 className="h-3.5 w-3.5 text-danger-500" />} />
                      </div>
                    </div>

                    <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2 line-clamp-2">{event.title}</h3>

                    <div className="space-y-1.5 mb-4 text-xs text-secondary-500 dark:text-secondary-400">
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.venue}
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-secondary-100 dark:border-secondary-700 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm text-secondary-600 dark:text-secondary-400">
                        <Users className="h-3.5 w-3.5" />
                        {event.ticketsSold} sold
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-secondary-900 dark:text-secondary-100">
                        <DollarSign className="h-3.5 w-3.5" />
                        ${event.revenue.toLocaleString()}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
