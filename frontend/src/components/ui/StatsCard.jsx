import { cn } from '../../lib/utils';

export default function StatsCard({ icon: Icon, label, value, trend, className }) {
  return (
    <div className={cn('rounded-xl border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-secondary-800 dark:border-secondary-700', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-secondary-900 dark:text-secondary-100">{value}</p>
          {trend && (
            <p className={cn(
              'mt-1 text-xs font-medium',
              trend > 0 ? 'text-success-500' : trend < 0 ? 'text-danger-500' : 'text-secondary-400'
            )}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/20">
            <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
        )}
      </div>
    </div>
  );
}
