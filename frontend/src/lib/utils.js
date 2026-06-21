import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatDate(date, format = 'MMM D, YYYY') {
  if (!date) return '';
  return dayjs(date).format(format);
}

export function formatDateTime(date) {
  if (!date) return '';
  return dayjs(date).format('MMM D, YYYY h:mm A');
}

export function formatRelative(date) {
  if (!date) return '';
  return dayjs(date).fromNow();
}

export function formatCurrency(amount) {
  if (amount == null) return '';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function truncate(str, length = 50) {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status) {
  const map = {
    pending: 'orange',
    confirmed: 'green',
    cancelled: 'red',
    completed: 'green',
    active: 'green',
    inactive: 'red',
    draft: 'orange',
    published: 'green',
    sold_out: 'red',
    'checked-in': 'teal',
  };
  return map[status?.toLowerCase()] || 'gray';
}

export function getStatusLabel(status) {
  if (!status) return '';
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
