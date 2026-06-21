import * as TabsRadix from '@radix-ui/react-tabs';
import { cn } from '../../lib/utils';

export default function Tabs({ value, onValueChange, tabs, children, className }) {
  return (
    <TabsRadix.Root value={value} onValueChange={onValueChange} className={cn('w-full', className)}>
      <TabsRadix.List className="flex border-b border-secondary-200 dark:border-secondary-700">
        {tabs?.map((tab) => (
          <TabsRadix.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'px-4 py-2.5 text-sm font-medium text-secondary-500 transition-colors',
              'hover:text-secondary-700 dark:hover:text-secondary-300',
              'data-[state=active]:text-primary-600 data-[state=active]:border-b-2 data-[state=active]:border-primary-600',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset',
              'dark:text-secondary-400 dark:data-[state=active]:text-primary-400 dark:data-[state=active]:border-primary-400'
            )}
          >
            {tab.label}
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>
      {tabs?.map((tab) => (
        <TabsRadix.Content key={tab.value} value={tab.value} className="pt-4 focus:outline-none">
          {tab.content}
        </TabsRadix.Content>
      ))}
      {children}
    </TabsRadix.Root>
  );
}
