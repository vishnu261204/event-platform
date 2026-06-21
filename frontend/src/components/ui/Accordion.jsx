import * as AccordionRadix from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Accordion({ type = 'single', collapsible = true, defaultValue, items, className }) {
  return (
    <AccordionRadix.Root type={type} collapsible={collapsible} defaultValue={defaultValue} className={cn('space-y-2', className)}>
      {items?.map((item) => (
        <AccordionRadix.Item key={item.value} value={item.value} className="rounded-xl border border-secondary-200 bg-white dark:bg-secondary-800 dark:border-secondary-700 overflow-hidden">
          <AccordionRadix.Trigger className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-secondary-900 dark:text-secondary-100 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors [&[data-state=open]>svg]:rotate-180">
            {item.title}
            <ChevronDown className="h-4 w-4 text-secondary-400 transition-transform duration-200" />
          </AccordionRadix.Trigger>
          <AccordionRadix.Content className="px-5 pb-4 pt-0 text-sm text-secondary-600 dark:text-secondary-400 data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
            {item.content}
          </AccordionRadix.Content>
        </AccordionRadix.Item>
      ))}
    </AccordionRadix.Root>
  );
}
