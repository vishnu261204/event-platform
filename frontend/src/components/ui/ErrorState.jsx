import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './Button';

export default function ErrorState({ title, message, onRetry, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-danger-50 dark:bg-danger-900/20">
        <AlertTriangle className="h-8 w-8 text-danger-500" />
      </div>
      <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">{title || 'Something went wrong'}</h3>
      <p className="mt-1.5 text-sm text-secondary-500 dark:text-secondary-400 max-w-sm">
        {message || 'An unexpected error occurred. Please try again later.'}
      </p>
      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry} variant="outline" size="sm" icon={<RefreshCw className="h-4 w-4" />}>
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}
