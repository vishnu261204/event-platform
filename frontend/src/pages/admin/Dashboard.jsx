import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CalendarCheck, Ticket, DollarSign } from 'lucide-react';
import dayjs from 'dayjs';
import Card from '../../components/ui/Card';
import StatsCard from '../../components/ui/StatsCard';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const statsData = [
  { label: 'Total Users', value: '12,845', icon: Users, trend: 12 },
  { label: 'Total Events', value: '486', icon: CalendarCheck, trend: 8 },
  { label: 'Total Bookings', value: '3,217', icon: Ticket, trend: 23 },
  { label: 'Revenue', value: '$84,290', icon: DollarSign, trend: 18 },
];

const recentBookings = [
  { id: 'Bk-1004', event: 'Tech Conference 2025', user: 'Alice Johnson', tickets: 2, total: 149.99, status: 'confirmed', date: '2025-06-20' },
  { id: 'Bk-1003', event: 'Music Festival', user: 'Bob Smith', tickets: 4, total: 320.00, status: 'checked-in', date: '2025-06-19' },
  { id: 'Bk-1002', event: 'Art Workshop', user: 'Carol White', tickets: 1, total: 45.00, status: 'pending', date: '2025-06-18' },
  { id: 'Bk-1001', event: 'Business Summit', user: 'David Brown', tickets: 3, total: 299.99, status: 'confirmed', date: '2025-06-17' },
  { id: 'Bk-1000', event: 'Yoga Retreat', user: 'Eve Davis', tickets: 1, total: 120.00, status: 'cancelled', date: '2025-06-16' },
];

const recentUsers = [
  { id: 'u1', name: 'Frank Wilson', email: 'frank@example.com', role: 'organizer', joined: '2025-06-20', avatar: 'FW' },
  { id: 'u2', name: 'Grace Lee', email: 'grace@example.com', role: 'attendee', joined: '2025-06-19', avatar: 'GL' },
  { id: 'u3', name: 'Henry Taylor', email: 'henry@example.com', role: 'attendee', joined: '2025-06-18', avatar: 'HT' },
  { id: 'u4', name: 'Ivy Martinez', email: 'ivy@example.com', role: 'organizer', joined: '2025-06-17', avatar: 'IM' },
  { id: 'u5', name: 'Jack Anderson', email: 'jack@example.com', role: 'admin', joined: '2025-06-16', avatar: 'JA' },
];

const recentEvents = [
  { id: 'e1', title: 'Tech Conference 2025', category: 'Technology', date: '2025-07-15', status: 'published', ticketsSold: 120 },
  { id: 'e2', title: 'Music Festival', category: 'Music', date: '2025-08-01', status: 'published', ticketsSold: 340 },
  { id: 'e3', title: 'Art Workshop', category: 'Arts', date: '2025-06-25', status: 'draft', ticketsSold: 0 },
  { id: 'e4', title: 'Business Summit', category: 'Business', date: '2025-09-10', status: 'published', ticketsSold: 85 },
  { id: 'e5', title: 'Yoga Retreat', category: 'Wellness', date: '2025-07-20', status: 'cancelled', ticketsSold: 15 },
];

const bookingColumns = [
  { key: 'id', label: 'Booking ID' },
  { key: 'event', label: 'Event' },
  { key: 'user', label: 'User' },
  { key: 'tickets', label: 'Tickets' },
  { key: 'total', label: 'Total', render: (v) => `$${v.toFixed(2)}` },
  { key: 'status', label: 'Status', render: (v) => {
    const map = { confirmed: 'success', pending: 'warning', cancelled: 'danger', 'checked-in': 'primary' };
    return <Badge variant={map[v] || 'secondary'} size="sm">{v}</Badge>;
  }},
  { key: 'date', label: 'Date', render: (v) => dayjs(v).format('MMM D, YYYY') },
];

const roleBadge = (role) => {
  const map = { admin: 'danger', organizer: 'warning', attendee: 'primary' };
  return <Badge variant={map[role] || 'secondary'} size="sm">{role}</Badge>;
};

export default function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader title="Admin Dashboard" description="Overview of your platform" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat, i) => (
          <StatsCard key={i} icon={stat.icon} label={stat.label} value={stat.value} trend={stat.trend} />
        ))}
      </div>

      <Card padding="none">
        <div className="p-6 pb-0">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Recent Bookings</h2>
        </div>
        <Table columns={bookingColumns} data={recentBookings} emptyMessage="No bookings yet" />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Recent Users</h2>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b border-secondary-100 dark:border-secondary-700 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">{user.name}</p>
                    <p className="text-xs text-secondary-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {roleBadge(user.role)}
                  <span className="text-xs text-secondary-400">{dayjs(user.joined).format('MMM D')}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-secondary-100 dark:border-secondary-700">
            <Button variant="outline" size="sm" className="w-full">View All Users</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Recent Events</h2>
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between py-2 border-b border-secondary-100 dark:border-secondary-700 last:border-0">
                <div>
                  <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">{event.title}</p>
                  <p className="text-xs text-secondary-500">{event.category} &middot; {dayjs(event.date).format('MMM D, YYYY')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-secondary-500">{event.ticketsSold} sold</span>
                  <Badge variant={event.status === 'published' ? 'success' : event.status === 'draft' ? 'warning' : 'danger'} size="sm">{event.status}</Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-secondary-100 dark:border-secondary-700">
            <Button variant="outline" size="sm" className="w-full">View All Events</Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
