import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../../components/ui/PageHeader';
import SearchInput from '../../components/ui/SearchInput';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Tabs from '../../components/ui/Tabs';
import Card from '../../components/ui/Card';

const bookingsData = [
  { id: 'BK-001', customer: 'Alice Johnson', tickets: 2, total: 120, status: 'confirmed', date: '2026-06-20', event: 'Music Festival' },
  { id: 'BK-002', customer: 'Bob Smith', tickets: 1, total: 75, status: 'checked-in', date: '2026-06-19', event: 'Tech Conference' },
  { id: 'BK-003', customer: 'Carol White', tickets: 3, total: 180, status: 'pending', date: '2026-06-18', event: 'Music Festival' },
  { id: 'BK-004', customer: 'David Lee', tickets: 2, total: 150, status: 'confirmed', date: '2026-06-17', event: 'Art Workshop' },
  { id: 'BK-005', customer: 'Eve Brown', tickets: 1, total: 50, status: 'cancelled', date: '2026-06-16', event: 'Tech Conference' },
  { id: 'BK-006', customer: 'Frank Wilson', tickets: 4, total: 340, status: 'confirmed', date: '2026-06-15', event: 'Music Festival' },
  { id: 'BK-007', customer: 'Grace Kim', tickets: 2, total: 100, status: 'checked-in', date: '2026-06-14', event: 'Business Networking' },
];

const events = ['All Events', 'Music Festival', 'Tech Conference', 'Art Workshop', 'Business Networking'];

function statusVariant(status) {
  if (status === 'confirmed') return 'success';
  if (status === 'pending') return 'warning';
  if (status === 'cancelled') return 'danger';
  if (status === 'checked-in') return 'primary';
  return 'secondary';
}

export default function EventBookings() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Events');

  const filtered = bookingsData.filter((b) => {
    const matchSearch = b.id.toLowerCase().includes(search.toLowerCase()) || b.customer.toLowerCase().includes(search.toLowerCase());
    if (activeTab !== 'All Events') return matchSearch && b.event === activeTab;
    return matchSearch;
  });

  const columns = [
    { key: 'id', label: 'Booking ID', render: (val) => <span className="font-mono text-xs text-secondary-600 dark:text-secondary-400">{val}</span> },
    { key: 'customer', label: 'Customer', render: (val) => <span className="font-medium text-secondary-900 dark:text-secondary-100">{val}</span> },
    { key: 'tickets', label: 'Tickets', sortable: true },
    { key: 'total', label: 'Total', render: (val) => <span className="font-medium text-secondary-900 dark:text-secondary-100">${val}</span>, sortable: true },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={statusVariant(val)} size="sm">{val}</Badge> },
    { key: 'date', label: 'Date', render: (val) => <span className="text-secondary-500 dark:text-secondary-400">{new Date(val).toLocaleDateString()}</span>, sortable: true },
  ];

  const tabs = events.map((event) => ({
    value: event,
    label: event,
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Event Bookings" description="View and manage all bookings across your events" />

      <Card padding="none">
        <div className="p-6 pb-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} tabs={tabs} />
          <div className="mt-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by booking ID or customer name..." />
          </div>
        </div>

        <div className="p-6">
          <Table columns={columns} data={filtered} emptyMessage="No bookings match your search" />
        </div>
      </Card>
    </motion.div>
  );
}
