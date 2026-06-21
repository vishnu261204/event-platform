import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
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
    pending: 'warning',
    confirmed: 'success',
    cancelled: 'danger',
    completed: 'success',
    active: 'success',
    inactive: 'danger',
    draft: 'warning',
    published: 'success',
    sold_out: 'danger',
    cancelled: 'danger',
  };
  return map[status?.toLowerCase()] || 'secondary';
}

export function getStatusLabel(status) {
  if (!status) return '';
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
