import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Textarea = forwardRef(({ className, label, error, ...props }, ref) => {
  const id = props.id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={cn(
          'block w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-secondary-900 placeholder-secondary-400 transition-all duration-200 resize-y min-h-[100px]',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'dark:bg-secondary-800 dark:text-secondary-100 dark:border-secondary-600 dark:placeholder-secondary-500',
          error
            ? 'border-danger-500 focus:ring-danger-500 focus:border-danger-500'
            : 'border-secondary-300 dark:border-secondary-600',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-danger-500">{error}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
