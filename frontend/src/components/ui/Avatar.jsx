import * as AvatarRadix from '@radix-ui/react-avatar';
import { cn, getInitials } from '../../lib/utils';

export default function Avatar({ src, name, size = 'md', className }) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  return (
    <AvatarRadix.Root
      className={cn(
        'inline-flex items-center justify-center overflow-hidden rounded-full bg-primary-100 dark:bg-primary-900/30',
        sizes[size],
        className
      )}
    >
      {src ? (
        <AvatarRadix.Image src={src} alt={name || 'Avatar'} className="h-full w-full object-cover" />
      ) : (
        <AvatarRadix.Fallback
          className={cn(
            'flex h-full w-full items-center justify-center font-medium text-primary-600 dark:text-primary-400',
            sizes[size]
          )}
        >
          {getInitials(name)}
        </AvatarRadix.Fallback>
      )}
    </AvatarRadix.Root>
  );
}
