import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-violet-50 dark:from-secondary-900 dark:via-secondary-900 dark:to-primary-950 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-white/20 bg-white/70 p-8 shadow-xl backdrop-blur-xl dark:bg-secondary-800/70 dark:border-secondary-700/30">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 shadow-lg">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-6.5-3H3m0 0l3 3m-3-3l3-3m7.5-3H21m0 0l-3-3m3 3l-3 3" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-secondary-500 dark:text-secondary-400">{subtitle}</p>
            )}
          </div>
          {children || <Outlet />}
        </div>
      </motion.div>
    </div>
  );
}
