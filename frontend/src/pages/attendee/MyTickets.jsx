import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, QrCode } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import EmptyState from '../../components/ui/EmptyState';
import { formatDate, formatCurrency } from '../../lib/utils';

const tickets = [
  { id: 1, eventName: 'Summer Music Festival', date: '2026-07-15', venue: 'Central Park, NY', ticketType: 'VIP', quantity: 2, total: 178, status: 'active' },
  { id: 2, eventName: 'Tech Conference 2026', date: '2026-10-12', venue: 'Convention Center, SF', ticketType: 'General', quantity: 1, total: 299, status: 'active' },
  { id: 3, eventName: 'Jazz Night', date: '2026-07-22', venue: 'Blue Note, NYC', ticketType: 'Standard', quantity: 3, total: 165, status: 'used' },
  { id: 4, eventName: 'Food & Wine Festival', date: '2026-09-05', venue: 'Pier 36, NYC', ticketType: 'VIP', quantity: 2, total: 150, status: 'used' },
  { id: 5, eventName: 'Marathon 2026', date: '2026-11-03', venue: 'Brooklyn Bridge', ticketType: 'General', quantity: 1, total: 60, status: 'cancelled' },
];

const statusVariant = {
  active: 'success',
  used: 'secondary',
  cancelled: 'danger',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const gradients = [
  'from-primary-500 to-violet-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
  'from-cyan-500 to-blue-500',
];

export default function MyTickets() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcoming = tickets.filter((t) => t.status === 'active');
  const past = tickets.filter((t) => t.status === 'used' || t.status === 'cancelled');
  const displayed = activeTab === 'upcoming' ? upcoming : past;

  const tabs = [
    { value: 'upcoming', label: `Upcoming (${upcoming.length})`, content: null },
    { value: 'past', label: `Past (${past.length})`, content: null },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <PageHeader title="My Tickets" description="View and manage your event tickets" />

      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} tabs={tabs} />
      </div>

      {displayed.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={Ticket}
            title={activeTab === 'upcoming' ? 'No upcoming tickets' : 'No past tickets'}
            description={activeTab === 'upcoming' ? 'Browse events and book your first ticket' : 'Your used and cancelled tickets will appear here'}
          />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 space-y-5"
        >
          {displayed.map((ticket, index) => (
            <motion.div key={ticket.id} variants={itemVariants}>
              <Card className="overflow-hidden !p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className={`h-40 sm:h-auto sm:w-48 shrink-0 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}>
                    <Ticket className="h-12 w-12 text-white/60" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                          {ticket.eventName}
                        </h3>
                        <div className="mt-2 space-y-1.5">
                          <div className="flex items-center gap-2 text-sm text-secondary-500 dark:text-secondary-400">
                            <Calendar className="h-4 w-4 shrink-0" />
                            {formatDate(ticket.date)}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-secondary-500 dark:text-secondary-400">
                            <MapPin className="h-4 w-4 shrink-0" />
                            {ticket.venue}
                          </div>
                        </div>
                      </div>
                      <Badge variant={statusVariant[ticket.status]} size="sm">
                        {ticket.status}
                      </Badge>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-secondary-600 dark:text-secondary-400">
                      <span className="font-medium text-secondary-900 dark:text-secondary-100">{ticket.ticketType}</span>
                      <span className="text-secondary-300 dark:text-secondary-600">|</span>
                      <span>Qty: {ticket.quantity}</span>
                      <span className="text-secondary-300 dark:text-secondary-600">|</span>
                      <span>{formatCurrency(ticket.total)}</span>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-2 rounded-lg border border-dashed border-secondary-300 dark:border-secondary-600 bg-secondary-50 dark:bg-secondary-800/50 px-3 py-2">
                        <QrCode className="h-5 w-5 text-secondary-400" />
                        <span className="text-xs text-secondary-400 dark:text-secondary-500">QR Code</span>
                      </div>
                      <Button variant="outline" size="sm">View Event</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
