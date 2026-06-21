import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, Ticket, QrCode, TrendingUp } from 'lucide-react';
import Card from '../../components/ui/Card';
import StatsCard from '../../components/ui/StatsCard';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';

const statsData = [
  { label: 'Revenue', value: '$12,450', icon: DollarSign, trend: 12 },
  { label: 'Events', value: '8', icon: Calendar, trend: 25 },
  { label: 'Tickets Sold', value: '342', icon: Ticket, trend: 8 },
  { label: 'Check-ins', value: '189', icon: QrCode, trend: -3 },
];

const recentBookings = [
  { id: 'BK-001', customer: 'Alice Johnson', tickets: 2, total: 120, status: 'confirmed', date: '2026-06-20' },
  { id: 'BK-002', customer: 'Bob Smith', tickets: 1, total: 75, status: 'checked-in', date: '2026-06-19' },
  { id: 'BK-003', customer: 'Carol White', tickets: 3, total: 180, status: 'pending', date: '2026-06-18' },
  { id: 'BK-004', customer: 'David Lee', tickets: 2, total: 150, status: 'confirmed', date: '2026-06-17' },
  { id: 'BK-005', customer: 'Eve Brown', tickets: 1, total: 50, status: 'cancelled', date: '2026-06-16' },
];

const chartData = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 2100 },
  { month: 'Mar', revenue: 1800 },
  { month: 'Apr', revenue: 3200 },
  { month: 'May', revenue: 2800 },
  { month: 'Jun', revenue: 4500 },
];

const topEvents = [
  { name: 'Music Festival', share: 48 },
  { name: 'Tech Conference', share: 32 },
  { name: 'Art Workshop', share: 21 },
];

function statusVariant(status) {
  if (status === 'confirmed') return 'success';
  if (status === 'pending') return 'warning';
  if (status === 'cancelled') return 'danger';
  if (status === 'checked-in') return 'primary';
  return 'secondary';
}

export default function OrganizerDashboard() {
  const maxRevenue = useMemo(() => Math.max(...chartData.map((d) => d.revenue)), []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Organizer Dashboard" description="Overview of your events and performance" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatsCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} trend={stat.trend} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">Revenue Overview</h2>
            <span className="text-xs text-secondary-500 dark:text-secondary-400">Last 6 months</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {chartData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-secondary-500 dark:text-secondary-400">${d.revenue}</span>
                <div
                  className="w-full rounded-lg bg-gradient-to-t from-primary-500 to-primary-400 transition-all duration-300 hover:from-primary-600 hover:to-primary-500"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                />
                <span className="text-xs font-medium text-secondary-600 dark:text-secondary-400">{d.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-secondary-200 dark:border-secondary-700">
                  <th className="text-left py-2 pr-3 font-medium text-secondary-500 dark:text-secondary-400">Booking</th>
                  <th className="text-left py-2 pr-3 font-medium text-secondary-500 dark:text-secondary-400">Customer</th>
                  <th className="text-left py-2 pr-3 font-medium text-secondary-500 dark:text-secondary-400">Tickets</th>
                  <th className="text-left py-2 pr-3 font-medium text-secondary-500 dark:text-secondary-400">Total</th>
                  <th className="text-left py-2 pr-3 font-medium text-secondary-500 dark:text-secondary-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-secondary-100 dark:border-secondary-700/50">
                    <td className="py-2 pr-3 font-mono text-xs text-secondary-600 dark:text-secondary-400">{b.id}</td>
                    <td className="py-2 pr-3 font-medium text-secondary-900 dark:text-secondary-100">{b.customer}</td>
                    <td className="py-2 pr-3 text-secondary-600 dark:text-secondary-400">{b.tickets}</td>
                    <td className="py-2 pr-3 font-medium text-secondary-900 dark:text-secondary-100">${b.total}</td>
                    <td className="py-2 pr-3"><Badge variant={statusVariant(b.status)} size="sm">{b.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Check-in Analytics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-success-50 dark:bg-success-900/10">
              <p className="text-2xl font-bold text-success-600 dark:text-success-400">189</p>
              <p className="text-xs text-success-600 dark:text-success-400 mt-1">Checked In</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-warning-50 dark:bg-warning-900/10">
              <p className="text-2xl font-bold text-warning-600 dark:text-warning-400">42</p>
              <p className="text-xs text-warning-600 dark:text-warning-400 mt-1">Pending</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-danger-50 dark:bg-danger-900/10">
              <p className="text-2xl font-bold text-danger-600 dark:text-danger-400">15</p>
              <p className="text-xs text-danger-600 dark:text-danger-400 mt-1">No-Show</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-primary-50 dark:bg-primary-900/10">
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">246</p>
              <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Total Tickets</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Top Events</h2>
          <div className="space-y-4">
            {topEvents.map((ev, i) => (
              <div key={ev.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">{ev.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-secondary-500 dark:text-secondary-400">
                  <TrendingUp className="h-3.5 w-3.5 text-success-500" />
                  {ev.share}%
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
