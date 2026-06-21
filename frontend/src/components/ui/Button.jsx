import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm',
  secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus:ring-secondary-500 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700',
  outline: 'border border-secondary-300 bg-transparent hover:bg-secondary-50 focus:ring-primary-500 dark:border-secondary-600 dark:hover:bg-secondary-800',
  danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500 shadow-sm',
  ghost: 'bg-transparent hover:bg-secondary-100 focus:ring-secondary-500 dark:hover:bg-secondary-800',
  link: 'bg-transparent text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline',
};

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-lg',
};

const Button = forwardRef(({ className, variant = 'primary', size = 'md', loading, disabled, children, icon, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-secondary-900',
        variants[variant],
        sizes[size],
        !disabled && !loading && variant !== 'link' && 'active:scale-[0.98]',
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon ? icon : null}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
