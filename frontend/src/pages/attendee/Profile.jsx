import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, Info, Lock, Bell } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import { formatDate } from '../../lib/utils';

const user = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  role: 'attendee',
  bio: 'Event enthusiast and tech lover. I enjoy attending music festivals and tech conferences around the country.',
  memberSince: '2025-03-15',
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('details');

  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [notifications, setNotifications] = useState({
    emailReminders: true,
    smsUpdates: false,
    promotional: true,
  });

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const detailsTab = (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Personal Information</h2>
        <div className="space-y-5">
          <div>
            <span className="block text-sm font-medium text-secondary-500 dark:text-secondary-400 mb-1">Full Name</span>
            <p className="text-secondary-900 dark:text-secondary-100">{user.name}</p>
          </div>
          <div>
            <span className="block text-sm font-medium text-secondary-500 dark:text-secondary-400 mb-1">Email</span>
            <p className="flex items-center gap-2 text-secondary-900 dark:text-secondary-100">
              <Mail className="h-4 w-4 text-secondary-400" />{user.email}
            </p>
          </div>
          <div>
            <span className="block text-sm font-medium text-secondary-500 dark:text-secondary-400 mb-1">Phone</span>
            <p className="flex items-center gap-2 text-secondary-900 dark:text-secondary-100">
              <Phone className="h-4 w-4 text-secondary-400" />{user.phone}
            </p>
          </div>
          <div>
            <span className="block text-sm font-medium text-secondary-500 dark:text-secondary-400 mb-1">Bio</span>
            <p className="text-secondary-900 dark:text-secondary-100">{user.bio}</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const settingsTab = (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Change Password</h2>
        <div className="space-y-4">
          <Input label="Current Password" type="password" name="current" value={password.current} onChange={handlePasswordChange} />
          <Input label="New Password" type="password" name="new" value={password.new} onChange={handlePasswordChange} />
          <Input label="Confirm New Password" type="password" name="confirm" value={password.confirm} onChange={handlePasswordChange} />
          <div className="pt-2">
            <Button size="sm">Update Password</Button>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          {[
            { key: 'emailReminders', label: 'Email Reminders', desc: 'Receive email reminders before events' },
            { key: 'smsUpdates', label: 'SMS Updates', desc: 'Get text message updates about your bookings' },
            { key: 'promotional', label: 'Promotional Emails', desc: 'Receive offers and event recommendations' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-secondary-100 dark:border-secondary-700 last:border-0">
              <div>
                <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">{label}</p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">{desc}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications[key]}
                onClick={() => toggleNotification(key)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-900 ${
                  notifications[key] ? 'bg-primary-600' : 'bg-secondary-200 dark:bg-secondary-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ${
                    notifications[key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { value: 'details', label: 'Profile Details', content: detailsTab },
    { value: 'settings', label: 'Account Settings', content: settingsTab },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
    >
      <PageHeader title="Profile" description="Manage your personal information and settings" />

      <div className="mt-8 mb-8">
        <Card>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Avatar name={user.name} size="xl" className="h-20 w-20 text-xl" />
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">{user.name}</h2>
              <p className="flex items-center justify-center sm:justify-start gap-1.5 mt-1 text-sm text-secondary-500 dark:text-secondary-400">
                <Mail className="h-3.5 w-3.5" />{user.email}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                <Badge variant="primary" size="sm">{user.role}</Badge>
                <span className="flex items-center gap-1 text-xs text-secondary-400 dark:text-secondary-500">
                  <Calendar className="h-3 w-3" />Member since {formatDate(user.memberSince, 'MMMM YYYY')}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} tabs={tabs} />
    </motion.div>
  );
}
