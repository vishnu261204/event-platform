import * as PopoverRadix from '@radix-ui/react-popover';
import { cn } from '../../lib/utils';

export default function Popover({ trigger, children, align = 'center', side = 'bottom', className }) {
  return (
    <PopoverRadix.Root>
      <PopoverRadix.Trigger asChild>{trigger}</PopoverRadix.Trigger>
      <PopoverRadix.Portal>
        <PopoverRadix.Content
          align={align}
          side={side}
          sideOffset={4}
          className={cn(
            'z-50 rounded-xl border border-secondary-200 bg-white p-4 shadow-xl',
            'dark:bg-secondary-800 dark:border-secondary-700',
            'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            className
          )}
        >
          {children}
          <PopoverRadix.Arrow className="fill-white dark:fill-secondary-800" />
        </PopoverRadix.Content>
      </PopoverRadix.Portal>
    </PopoverRadix.Root>
  );
}
