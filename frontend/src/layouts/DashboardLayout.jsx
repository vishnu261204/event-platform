import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-secondary-200/50 bg-white/80 px-4 backdrop-blur-xl dark:bg-secondary-900/80 dark:border-secondary-700/50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-secondary-500 transition-colors hover:bg-secondary-100 dark:hover:bg-secondary-800 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <Navbar />
        </div>

        <main className="flex-1 p-6">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
