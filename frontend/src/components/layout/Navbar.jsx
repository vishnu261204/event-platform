import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Bell, LogOut, User, Ticket, LayoutDashboard } from 'lucide-react';
import { logout } from '../../features/auth/authSlice';
import { useTheme } from '../../hooks/useTheme';
import { useIsMobile } from '../../hooks/useMediaQuery';
import Avatar from '../ui/Avatar';
import DropdownMenu from '../ui/DropdownMenu';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-secondary-200/50 bg-white/80 backdrop-blur-xl dark:bg-secondary-900/80 dark:border-secondary-700/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-violet-600">
                <Ticket className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-secondary-900 dark:text-secondary-100">
                EventHub
              </span>
            </Link>
            {!isMobile && (
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-secondary-500 transition-colors hover:bg-secondary-100 dark:hover:bg-secondary-800"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {!isMobile && (
                  <button className="rounded-lg p-2 text-secondary-500 transition-colors hover:bg-secondary-100 dark:hover:bg-secondary-800 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-500" />
                  </button>
                )}
                <DropdownMenu
                  trigger={
                    <button className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-secondary-100 dark:hover:bg-secondary-800">
                      <Avatar name={user?.name} size="sm" />
                      {!isMobile && (
                        <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                          {user?.name}
                        </span>
                      )}
                    </button>
                  }
                >
                  <DropdownMenu.Label>Account</DropdownMenu.Label>
                  <DropdownMenu.Item onClick={() => navigate('/dashboard')} icon={<LayoutDashboard className="h-4 w-4" />}>
                    Dashboard
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => navigate('/profile')} icon={<User className="h-4 w-4" />}>
                    Profile
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item onClick={handleLogout} icon={<LogOut className="h-4 w-4" />}>
                    Log out
                  </DropdownMenu.Item>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Sign up
                </Button>
              </div>
            )}

            {isMobile && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="rounded-lg p-2 text-secondary-500 transition-colors hover:bg-secondary-100 dark:hover:bg-secondary-800"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-secondary-200 dark:border-secondary-700"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800"
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800">
                    Dashboard
                  </Link>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-danger-500 transition-colors hover:bg-danger-50">
                    Log out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
