import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function EventCard({ event }) {
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formatPrice = (p) => p ? `$${p}` : 'Free';

  return (
    <Link to={`/events/${event._id || event.id}`}>
      <Card hover className="overflow-hidden p-0 group">
        <div className="relative h-48 bg-gradient-to-br from-primary-200 to-violet-200 overflow-hidden">
          {event.banner ? (
            <img src={event.banner} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {event.category && (
            <div className="absolute top-3 left-3">
              <Badge variant="primary">{event.category}</Badge>
            </div>
          )}
          <div className="absolute bottom-3 right-3">
            <Badge variant="success">{formatPrice(event.price)}</Badge>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-secondary-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-secondary-500 mb-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-secondary-500 mb-3">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.date)}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
            <span className="text-xs text-secondary-400">
              {event.availableSeats !== undefined ? `${event.availableSeats} seats left` : ''}
            </span>
            <Button size="sm">Book Now</Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
