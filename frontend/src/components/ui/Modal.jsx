import { forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Modal = forwardRef(({ open, onOpenChange, title, description, children, className, showClose = true }, ref) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content
          ref={ref}
          className={cn(
            'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6 shadow-2xl',
            'dark:bg-secondary-800 dark:border dark:border-secondary-700',
            'w-full max-w-lg max-h-[85vh] overflow-y-auto',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            className
          )}
        >
          {showClose && (
            <Dialog.Close className="absolute right-4 top-4 rounded-lg p-1 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-700 dark:hover:text-secondary-300 transition-colors">
              <X className="h-4 w-4" />
            </Dialog.Close>
          )}
          {title && (
            <Dialog.Title className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
              {title}
            </Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="mt-1.5 text-sm text-secondary-500 dark:text-secondary-400">
              {description}
            </Dialog.Description>
          )}
          <div className={cn({ 'mt-6': title || description })}>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

Modal.displayName = 'Modal';
export default Modal;
