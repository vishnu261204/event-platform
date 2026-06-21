import { cn } from '../../lib/utils';

export default function Card({ className, hover, padding = 'md', children, ...props }) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-xl border bg-white shadow-sm transition-all duration-200',
        'dark:bg-secondary-800 dark:border-secondary-700',
        hover && 'card-hover cursor-pointer',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
