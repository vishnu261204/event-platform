import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import SearchInput from '../../components/ui/SearchInput';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { formatDate, formatCurrency, getStatusColor } from '../../lib/utils';

const bookings = [
  { id: 1, event: 'Summer Music Festival', date: '2026-07-15', tickets: 2, total: 178, status: 'confirmed', bookedOn: '2026-06-10' },
  { id: 2, event: 'Tech Conference 2026', date: '2026-10-12', tickets: 1, total: 299, status: 'confirmed', bookedOn: '2026-09-01' },
  { id: 3, event: 'Jazz Night', date: '2026-07-22', tickets: 3, total: 165, status: 'completed', bookedOn: '2026-06-15' },
  { id: 4, event: 'Food & Wine Festival', date: '2026-09-05', tickets: 2, total: 150, status: 'completed', bookedOn: '2026-08-20' },
  { id: 5, event: 'Marathon 2026', date: '2026-11-03', tickets: 1, total: 60, status: 'cancelled', bookedOn: '2026-10-01' },
  { id: 6, event: 'Startup Networking', date: '2026-11-08', tickets: 1, total: 25, status: 'confirmed', bookedOn: '2026-10-25' },
  { id: 7, event: 'AI Workshop', date: '2026-09-18', tickets: 2, total: 300, status: 'completed', bookedOn: '2026-08-05' },
];

const statusColors = {
  confirmed: 'success',
  cancelled: 'danger',
  completed: 'secondary',
};

const columns = [
  { key: 'event', label: 'Event', render: (val) => <span className="font-medium text-secondary-900 dark:text-secondary-100">{val}</span> },
  { key: 'date', label: 'Date', render: (val) => (
    <span className="flex items-center gap-1.5 text-secondary-600 dark:text-secondary-400">
      <Calendar className="h-3.5 w-3.5" />{formatDate(val)}
    </span>
  )},
  { key: 'tickets', label: 'Tickets' },
  { key: 'total', label: 'Total', render: (val) => <span className="font-semibold text-secondary-900 dark:text-secondary-100">{formatCurrency(val)}</span> },
  { key: 'status', label: 'Status', render: (val) => <Badge variant={statusColors[val]} size="sm">{val}</Badge> },
  { key: 'bookedOn', label: 'Booked On', render: (val) => (
    <span className="flex items-center gap-1.5 text-secondary-600 dark:text-secondary-400">
      <Clock className="h-3.5 w-3.5" />{formatDate(val)}
    </span>
  )},
];

export default function BookingHistory() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return bookings;
    const q = search.toLowerCase();
    return bookings.filter((b) => b.event.toLowerCase().includes(q));
  }, [search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
    >
      <PageHeader title="Booking History" description="View all your past and upcoming bookings" />

      <div className="mt-8">
        <div className="mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by event name..."
            className="max-w-sm"
          />
        </div>

        <Table
          columns={columns}
          data={filtered}
          emptyMessage={search ? 'No bookings match your search' : 'No bookings yet'}
          sortable
        />
      </div>
    </motion.div>
  );
}
