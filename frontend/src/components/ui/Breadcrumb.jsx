import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function Breadcrumb({ items, className }) {
  return (
    <nav className={cn('flex items-center gap-1.5 text-sm', className)}>
      <Link to="/" className="flex items-center gap-1 text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      {items?.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight className="h-4 w-4 text-secondary-300 dark:text-secondary-600" />
          {item.href ? (
            <Link to={item.href} className="text-secondary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-secondary-900 dark:text-secondary-100 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
