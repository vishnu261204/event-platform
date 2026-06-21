import { cn } from '../../lib/utils';

export default function PageHeader({ title, description, action, className }) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4', className)}>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
