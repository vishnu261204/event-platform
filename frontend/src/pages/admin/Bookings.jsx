import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import SearchInput from '../../components/ui/SearchInput';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const sampleBookings = [
  { id: 'Bk-1004', event: 'Tech Conference 2025', user: 'Alice Johnson', tickets: 2, total: 149.99, status: 'confirmed', date: '2025-06-20' },
  { id: 'Bk-1003', event: 'Summer Music Festival', user: 'Bob Smith', tickets: 4, total: 320.00, status: 'checked-in', date: '2025-06-19' },
  { id: 'Bk-1002', event: 'Modern Art Workshop', user: 'Carol White', tickets: 1, total: 45.00, status: 'pending', date: '2025-06-18' },
  { id: 'Bk-1001', event: 'Global Business Summit', user: 'David Brown', tickets: 3, total: 299.99, status: 'confirmed', date: '2025-06-17' },
  { id: 'Bk-1000', event: 'Wellness Yoga Retreat', user: 'Eve Davis', tickets: 1, total: 120.00, status: 'cancelled', date: '2025-06-16' },
  { id: 'Bk-999', event: 'Startup Pitch Night', user: 'Frank Wilson', tickets: 2, total: 80.00, status: 'pending', date: '2025-06-15' },
  { id: 'Bk-998', event: 'Photography Masterclass', user: 'Grace Lee', tickets: 1, total: 65.00, status: 'confirmed', date: '2025-06-14' },
  { id: 'Bk-997', event: 'AI & Machine Learning Expo', user: 'Henry Taylor', tickets: 3, total: 210.00, status: 'checked-in', date: '2025-06-13' },
  { id: 'Bk-996', event: 'Jazz Night Under Stars', user: 'Ivy Martinez', tickets: 2, total: 110.00, status: 'confirmed', date: '2025-06-12' },
  { id: 'Bk-995', event: 'Outdoor Adventure Camp', user: 'Jack Anderson', tickets: 5, total: 375.00, status: 'cancelled', date: '2025-06-11' },
];

const statusVariant = (status) => {
  if (status === 'confirmed') return 'success';
  if (status === 'pending') return 'warning';
  if (status === 'cancelled') return 'danger';
  if (status === 'checked-in') return 'primary';
  return 'secondary';
};

const columns = [
  { key: 'id', label: 'Booking ID' },
  { key: 'event', label: 'Event' },
  { key: 'user', label: 'User' },
  { key: 'tickets', label: 'Tickets' },
  { key: 'total', label: 'Total', render: (v) => `$${v.toFixed(2)}` },
  { key: 'status', label: 'Status', render: (v) => <Badge variant={statusVariant(v)} size="sm">{v}</Badge> },
  { key: 'date', label: 'Date', render: (v) => dayjs(v).format('MMM D, YYYY') },
  { key: 'actions', label: 'Actions', sortable: false, render: () => <Button variant="ghost" size="xs">View</Button> },
];

export default function AdminBookings() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return sampleBookings;
    const q = search.toLowerCase();
    return sampleBookings.filter(
      (b) => b.id.toLowerCase().includes(q) || b.event.toLowerCase().includes(q) || b.user.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader title="Manage Bookings" description="View and manage all booking records" />

      <Card padding="none">
        <div className="p-6 pb-0">
          <SearchInput value={search} onChange={setSearch} placeholder="Search bookings by ID, event, or user..." className="max-w-sm" />
        </div>
        <Table columns={columns} data={filtered} emptyMessage="No bookings match your search" />
      </Card>
    </motion.div>
  );
}
