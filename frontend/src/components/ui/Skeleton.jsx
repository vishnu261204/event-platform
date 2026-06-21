import { cn } from '../../lib/utils';

export default function Skeleton({ className, variant = 'text' }) {
  const variants = {
    text: 'h-4 w-full rounded',
    title: 'h-6 w-3/4 rounded',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-40 w-full rounded-xl',
    badge: 'h-5 w-16 rounded-full',
    button: 'h-10 w-24 rounded-lg',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-secondary-200 dark:bg-secondary-700',
        variants[variant],
        className
      )}
    />
  );
}
