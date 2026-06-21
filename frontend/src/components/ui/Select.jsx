import { forwardRef } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const Select = forwardRef(({ value, onValueChange, options, placeholder = 'Select...', label, error, className }, ref) => {
  const id = label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined;
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5">
          {label}
        </label>
      )}
      <RadixSelect.Root value={value} onValueChange={onValueChange}>
        <RadixSelect.Trigger
          ref={ref}
          className={cn(
            'flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2.5 text-sm text-left',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'dark:bg-secondary-800 dark:text-secondary-100',
            error
              ? 'border-danger-500'
              : 'border-secondary-300 dark:border-secondary-600',
            !value && 'text-secondary-400',
            className
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <ChevronDown className="h-4 w-4 text-secondary-400" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="z-50 overflow-hidden rounded-lg border border-secondary-200 bg-white shadow-xl dark:bg-secondary-800 dark:border-secondary-700">
            <RadixSelect.ScrollUpButton className="flex items-center justify-center h-6 bg-white dark:bg-secondary-800 text-secondary-400">
              <ChevronDown className="h-4 w-4 rotate-180" />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className="p-1">
              {options?.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    'relative flex cursor-default select-none items-center rounded-md px-8 py-2 text-sm outline-none',
                    'text-secondary-900 dark:text-secondary-100',
                    'data-[highlighted]:bg-primary-50 data-[highlighted]:text-primary-900 dark:data-[highlighted]:bg-primary-900/20 dark:data-[highlighted]:text-primary-300',
                    'data-[state=checked]:text-primary-600 dark:data-[state=checked]:text-primary-400'
                  )}
                >
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="absolute left-2">
                    <Check className="h-4 w-4" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className="flex items-center justify-center h-6 bg-white dark:bg-secondary-800 text-secondary-400">
              <ChevronDown className="h-4 w-4" />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      {error && <p className="mt-1.5 text-sm text-danger-500">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
