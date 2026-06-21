import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, CheckCircle, Clock, User, Ticket, CalendarIcon } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SearchInput from '../../components/ui/SearchInput';
import PageHeader from '../../components/ui/PageHeader';
import EmptyState from '../../components/ui/EmptyState';

const sampleBookings = [
  { id: 'BK-001', customer: 'Alice Johnson', email: 'alice@example.com', event: 'Summer Music Festival', tickets: 2, status: 'confirmed', date: '2026-06-20' },
  { id: 'BK-002', customer: 'Bob Smith', email: 'bob@example.com', event: 'Tech Conference 2026', tickets: 1, status: 'checked-in', date: '2026-06-19' },
  { id: 'BK-003', customer: 'Carol White', email: 'carol@example.com', event: 'Music Festival', tickets: 3, status: 'confirmed', date: '2026-06-18' },
];

const recentCheckIns = [
  { id: 'BK-002', customer: 'Bob Smith', time: '2 mins ago' },
  { id: 'BK-007', customer: 'Grace Kim', time: '15 mins ago' },
  { id: 'BK-009', customer: 'Henry Lee', time: '1 hour ago' },
];

const qrCells = Array.from({ length: 64 }).map(() => Math.random() > 0.5);

function statusVariant(status) {
  if (status === 'confirmed') return 'success';
  if (status === 'pending') return 'warning';
  if (status === 'cancelled') return 'danger';
  if (status === 'checked-in') return 'primary';
  return 'secondary';
}

export default function QRCheckIn() {
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleSearch = (value) => {
    setSearch(value);
    setCheckedIn(false);
    const found = sampleBookings.find(
      (b) => b.id.toLowerCase() === value.toLowerCase() || b.email.toLowerCase() === value.toLowerCase()
    );
    setSelectedBooking(found || null);
  };

  const handleCheckIn = () => {
    setCheckedIn(true);
    console.log('Checked in:', selectedBooking.id);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6 max-w-2xl mx-auto">
      <PageHeader title="QR Check-In" description="Validate tickets and check in attendees" />

      <SearchInput value={search} onChange={handleSearch} placeholder="Search by booking ID or email..." />

      {!selectedBooking ? (
        <EmptyState
          icon={QrCode}
          title="Search for a booking"
          description="Enter a booking ID or attendee email to find and check in a ticket"
        />
      ) : (
        <>
          <Card className={`p-6 transition-all duration-300 ${checkedIn ? 'ring-2 ring-success-500 bg-success-50 dark:bg-success-900/10' : ''}`}>
            {checkedIn && (
              <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-success-100 dark:bg-success-900/20 text-success-700 dark:text-success-300">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Successfully checked in!</span>
              </div>
            )}

            <div className="flex flex-col items-center mb-6">
              <div className="w-48 h-48 bg-white dark:bg-secondary-700 rounded-2xl border-2 border-secondary-200 dark:border-secondary-600 flex items-center justify-center shadow-inner mb-4">
                <div className="grid grid-cols-8 gap-1">
                  {qrCells.map((filled, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-sm ${filled ? 'bg-secondary-900 dark:bg-secondary-100' : 'bg-transparent'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-secondary-400 dark:text-secondary-500">Scan or enter code manually</p>
            </div>

            <div className="space-y-3 border-t border-secondary-100 dark:border-secondary-700 pt-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-secondary-400 flex-shrink-0" />
                <span className="text-sm text-secondary-700 dark:text-secondary-300">
                  <span className="font-medium text-secondary-900 dark:text-secondary-100">{selectedBooking.customer}</span>
                  {' '}({selectedBooking.email})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-4 w-4 text-secondary-400 flex-shrink-0" />
                <span className="text-sm text-secondary-600 dark:text-secondary-400">{selectedBooking.event}</span>
              </div>
              <div className="flex items-center gap-3">
                <Ticket className="h-4 w-4 text-secondary-400 flex-shrink-0" />
                <span className="text-sm text-secondary-600 dark:text-secondary-400">{selectedBooking.tickets} tickets</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariant(selectedBooking.status)} size="sm">{selectedBooking.status}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-secondary-400 dark:text-secondary-500">ID: {selectedBooking.id}</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckIn}
                disabled={checkedIn || selectedBooking.status === 'checked-in' || selectedBooking.status === 'cancelled'}
                icon={<CheckCircle className="h-5 w-5" />}
              >
                {checkedIn ? 'Checked In' : 'Check In'}
              </Button>
            </div>
          </Card>

          {recentCheckIns.length > 0 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary-400" />
                Recent Check-Ins
              </h2>
              <div className="space-y-3">
                {recentCheckIns.map((checkin) => (
                  <div key={checkin.id} className="flex items-center justify-between py-2 border-b border-secondary-100 dark:border-secondary-700 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-success-100 dark:bg-success-900/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-success-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">{checkin.customer}</p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400">{checkin.id}</p>
                      </div>
                    </div>
                    <span className="text-xs text-secondary-400 dark:text-secondary-500">{checkin.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </motion.div>
  );
}
