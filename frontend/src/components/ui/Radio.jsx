import { forwardRef } from 'react';
import * as RadioGroupRadix from '@radix-ui/react-radio-group';
import { cn } from '../../lib/utils';

const Radio = forwardRef(({ value, label, className }, ref) => {
  return (
    <div className="flex items-center gap-2.5">
      <RadioGroupRadix.Item
        ref={ref}
        value={value}
        id={`radio-${value}`}
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded-full border border-secondary-300 bg-white transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
          'dark:bg-secondary-800 dark:border-secondary-600 dark:focus:ring-offset-secondary-900',
          'data-[state=checked]:border-primary-600',
          className
        )}
      >
        <RadioGroupRadix.Indicator className="flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-primary-600" />
        </RadioGroupRadix.Indicator>
      </RadioGroupRadix.Item>
      {label && (
        <label htmlFor={`radio-${value}`} className="text-sm text-secondary-700 dark:text-secondary-300 cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

function RadioGroup({ value, onValueChange, children, className }) {
  return (
    <RadioGroupRadix.Root value={value} onValueChange={onValueChange} className={cn('flex flex-col gap-3', className)}>
      {children}
    </RadioGroupRadix.Root>
  );
}

Radio.Group = RadioGroup;
export default Radio;
