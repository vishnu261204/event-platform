import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import { cn } from '../../lib/utils';

export default function DropdownMenu({ trigger, children, align = 'end', className }) {
  return (
    <DropdownMenuRadix.Root>
      <DropdownMenuRadix.Trigger asChild>{trigger}</DropdownMenuRadix.Trigger>
      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content
          align={align}
          sideOffset={4}
          className={cn(
            'z-50 min-w-[180px] overflow-hidden rounded-xl border border-secondary-200 bg-white p-1.5 shadow-xl',
            'dark:bg-secondary-800 dark:border-secondary-700',
            'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            className
          )}
        >
          {children}
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  );
}

DropdownMenu.Item = ({ children, icon, onClick, className }) => (
  <DropdownMenuRadix.Item
    onClick={onClick}
    className={cn(
      'flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-secondary-700 outline-none transition-colors',
      'hover:bg-secondary-100 hover:text-secondary-900',
      'dark:text-secondary-300 dark:hover:bg-secondary-700 dark:hover:text-secondary-100',
      className
    )}
  >
    {icon && <span className="flex h-4 w-4 items-center">{icon}</span>}
    {children}
  </DropdownMenuRadix.Item>
);

DropdownMenu.Separator = () => (
  <DropdownMenuRadix.Separator className="my-1.5 h-px bg-secondary-200 dark:bg-secondary-700" />
);

DropdownMenu.Label = ({ children, className }) => (
  <DropdownMenuRadix.Label className={cn('px-3 py-1.5 text-xs font-medium text-secondary-400', className)}>
    {children}
  </DropdownMenuRadix.Label>
);
