import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import SearchInput from '../../components/ui/SearchInput';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const sampleUsers = [
  { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', status: 'active', joined: '2024-03-15' },
  { id: 'u2', name: 'Bob Smith', email: 'bob@example.com', role: 'organizer', status: 'active', joined: '2024-04-22' },
  { id: 'u3', name: 'Carol White', email: 'carol@example.com', role: 'attendee', status: 'active', joined: '2024-05-10' },
  { id: 'u4', name: 'David Brown', email: 'david@example.com', role: 'organizer', status: 'suspended', joined: '2024-02-08' },
  { id: 'u5', name: 'Eve Davis', email: 'eve@example.com', role: 'attendee', status: 'active', joined: '2024-06-01' },
  { id: 'u6', name: 'Frank Wilson', email: 'frank@example.com', role: 'attendee', status: 'inactive', joined: '2024-01-19' },
  { id: 'u7', name: 'Grace Lee', email: 'grace@example.com', role: 'organizer', status: 'active', joined: '2024-07-14' },
  { id: 'u8', name: 'Henry Taylor', email: 'henry@example.com', role: 'attendee', status: 'active', joined: '2024-08-25' },
  { id: 'u9', name: 'Ivy Martinez', email: 'ivy@example.com', role: 'admin', status: 'active', joined: '2023-11-30' },
  { id: 'u10', name: 'Jack Anderson', email: 'jack@example.com', role: 'attendee', status: 'banned', joined: '2024-09-12' },
];

const roleVariant = (role) => {
  if (role === 'admin') return 'danger';
  if (role === 'organizer') return 'warning';
  return 'primary';
};

const statusVariant = (status) => {
  if (status === 'active') return 'success';
  if (status === 'inactive') return 'secondary';
  if (status === 'suspended') return 'warning';
  if (status === 'banned') return 'danger';
  return 'secondary';
};

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', render: (v) => <Badge variant={roleVariant(v)} size="sm">{v}</Badge> },
  { key: 'status', label: 'Status', render: (v) => <Badge variant={statusVariant(v)} size="sm" dot>{v}</Badge> },
  { key: 'joined', label: 'Joined', render: (v) => dayjs(v).format('MMM D, YYYY') },
  { key: 'actions', label: 'Actions', sortable: false, render: () => <Button variant="ghost" size="xs">Edit</Button> },
];

export default function AdminUsers() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return sampleUsers;
    const q = search.toLowerCase();
    return sampleUsers.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader title="Manage Users" description="View and manage all platform users" />

      <Card padding="none">
        <div className="p-6 pb-0">
          <SearchInput value={search} onChange={setSearch} placeholder="Search users by name or email..." className="max-w-sm" />
        </div>
        <Table columns={columns} data={filtered} emptyMessage="No users match your search" />
      </Card>
    </motion.div>
  );
}
