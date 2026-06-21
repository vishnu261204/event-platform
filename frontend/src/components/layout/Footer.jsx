import { Link } from 'react-router-dom';
import { Ticket, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Events', href: '/events' },
    { label: 'Create Event', href: '/register' },
    { label: 'Pricing', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-secondary-200 bg-white dark:bg-secondary-900 dark:border-secondary-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-violet-600">
                  <Ticket className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-secondary-900 dark:text-secondary-100">EventHub</span>
              </Link>
              <p className="mt-3 text-sm text-secondary-500 dark:text-secondary-400 max-w-xs">
                The premier platform for discovering, creating, and managing unforgettable events.
              </p>
              <div className="mt-4 flex items-center gap-3 text-secondary-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@eventhub.com</span>
              </div>
            </div>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100">{title}</h3>
                <ul className="mt-3 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-secondary-500 transition-colors hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-secondary-200 py-6 dark:border-secondary-800">
          <p className="text-center text-sm text-secondary-400">
            &copy; {new Date().getFullYear()} EventHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
