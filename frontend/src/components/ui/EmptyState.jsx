import { PackageOpen } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './Button';

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  const IconComponent = Icon || PackageOpen;
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-700">
        <IconComponent className="h-8 w-8 text-secondary-400 dark:text-secondary-500" />
      </div>
      <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-secondary-500 dark:text-secondary-400 max-w-sm">{description}</p>
      )}
      {action && (
        <div className="mt-6">
          <Button onClick={action.onClick} variant="primary" size="sm">
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
