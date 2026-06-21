import { Drawer as VaulDrawer } from 'vaul';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Drawer({ open, onOpenChange, title, description, children, className }) {
  return (
    <VaulDrawer.Root open={open} onOpenChange={onOpenChange}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
        <VaulDrawer.Content
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl bg-white px-6 pb-8 pt-6',
            'dark:bg-secondary-800',
            'max-h-[85vh]',
            className
          )}
        >
          <div className="mx-auto mb-6 h-1.5 w-12 flex-shrink-0 rounded-full bg-secondary-300 dark:bg-secondary-600" />
          <div className="flex items-center justify-between mb-4">
            <div>
              {title && <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">{title}</h2>}
              {description && <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">{description}</p>}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-lg p-1.5 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-700 dark:hover:text-secondary-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {children}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
