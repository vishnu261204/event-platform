import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import SearchInput from '../../components/ui/SearchInput';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const sampleEvents = [
  { id: 'e1', title: 'Tech Conference 2025', category: 'Technology', date: '2025-07-15', status: 'published', ticketsSold: 120 },
  { id: 'e2', title: 'Summer Music Festival', category: 'Music', date: '2025-08-01', status: 'published', ticketsSold: 340 },
  { id: 'e3', title: 'Modern Art Workshop', category: 'Arts', date: '2025-06-25', status: 'draft', ticketsSold: 0 },
  { id: 'e4', title: 'Global Business Summit', category: 'Business', date: '2025-09-10', status: 'published', ticketsSold: 85 },
  { id: 'e5', title: 'Wellness Yoga Retreat', category: 'Wellness', date: '2025-07-20', status: 'cancelled', ticketsSold: 15 },
  { id: 'e6', title: 'Startup Pitch Night', category: 'Business', date: '2025-10-05', status: 'draft', ticketsSold: 0 },
  { id: 'e7', title: 'Photography Masterclass', category: 'Arts', date: '2025-08-15', status: 'published', ticketsSold: 42 },
  { id: 'e8', title: 'AI & Machine Learning Expo', category: 'Technology', date: '2025-11-01', status: 'published', ticketsSold: 210 },
  { id: 'e9', title: 'Outdoor Adventure Camp', category: 'Wellness', date: '2025-09-20', status: 'cancelled', ticketsSold: 28 },
  { id: 'e10', title: 'Jazz Night Under Stars', category: 'Music', date: '2025-08-28', status: 'published', ticketsSold: 175 },
];

const statusVariant = (status) => {
  if (status === 'published') return 'success';
  if (status === 'draft') return 'warning';
  if (status === 'cancelled') return 'danger';
  return 'secondary';
};

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'date', label: 'Date', render: (v) => dayjs(v).format('MMM D, YYYY') },
  { key: 'status', label: 'Status', render: (v) => <Badge variant={statusVariant(v)} size="sm">{v}</Badge> },
  { key: 'ticketsSold', label: 'Tickets Sold', render: (v) => v.toLocaleString() },
  { key: 'actions', label: 'Actions', sortable: false, render: () => <Button variant="ghost" size="xs">View</Button> },
];

export default function AdminEvents() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return sampleEvents;
    const q = search.toLowerCase();
    return sampleEvents.filter((e) => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q));
  }, [search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader title="Manage Events" description="Oversee all events on the platform" />

      <Card padding="none">
        <div className="p-6 pb-0">
          <SearchInput value={search} onChange={setSearch} placeholder="Search events by title or category..." className="max-w-sm" />
        </div>
        <Table columns={columns} data={filtered} emptyMessage="No events match your search" />
      </Card>
    </motion.div>
  );
}
