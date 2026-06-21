import { forwardRef } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const Checkbox = forwardRef(({ checked, onCheckedChange, label, id, className }, ref) => {
  return (
    <div className="flex items-center gap-2.5">
      <RadixCheckbox.Root
        ref={ref}
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded border border-secondary-300 bg-white transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
          'dark:bg-secondary-800 dark:border-secondary-600 dark:focus:ring-offset-secondary-900',
          'data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600',
          className
        )}
      >
        <RadixCheckbox.Indicator>
          <Check className="h-3 w-3 text-white" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label htmlFor={id} className="text-sm text-secondary-700 dark:text-secondary-300 cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;
