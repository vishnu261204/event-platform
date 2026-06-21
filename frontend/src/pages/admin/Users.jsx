import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Paper, Title, Text, Group, Table, ScrollArea, Badge, TextInput, Skeleton, Modal, Stack, Button, ActionIcon, Tooltip } from '@mantine/core';
import { IconSearch, IconEye, IconTrash, IconRotate } from '@tabler/icons-react';
import { formatDate, getStatusColor, getStatusLabel } from '../../lib/utils';
import { adminAPI } from '../../services/api';
import { notifications } from '@mantine/notifications';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewUser, setViewUser] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    adminAPI.getUsers()
      .then((res) => setUsers(res.data.data.users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleToggleStatus = (id) => {
    adminAPI.toggleUserStatus(id)
      .then((res) => {
        notifications.show({ title: 'Updated', message: res.data.message || 'Status updated', color: 'green' });
        fetchUsers();
      })
      .catch(() => notifications.show({ title: 'Error', message: 'Failed to update user', color: 'red' }));
  };

  const filtered = users.filter((u) =>
    !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Manage Users</Title>
        <TextInput
          placeholder="Search users..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          w={300}
        />
      </Group>

      <Paper p="lg" radius="md" withBorder>
        {loading ? (
          <Stack gap="xs" p="md">
            <Skeleton height={36} radius="sm" mb="xs" />
            {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} height={48} radius="sm" />)}
          </Stack>
        ) : (
          <ScrollArea>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Joined</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filtered.length === 0 ? (
                  <Table.Tr><Table.Td colSpan={6}><Text ta="center" c="dimmed" py="xl">No users found</Text></Table.Td></Table.Tr>
                ) : filtered.map((user) => (
                  <Table.Tr key={user._id}>
                    <Table.Td>
                      <Text fw={500}>{user.name}</Text>
                    </Table.Td>
                    <Table.Td>{user.email}</Table.Td>
                    <Table.Td>
                      <Badge variant="light" color={user.role === 'admin' ? 'red' : user.role === 'organizer' ? 'violet' : 'blue'}>
                        {user.role}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={getStatusColor(user.isActive ? 'active' : 'inactive')} size="sm">
                        {getStatusLabel(user.isActive ? 'active' : 'inactive')}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{formatDate(user.createdAt)}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label="View details">
                          <ActionIcon variant="subtle" color="blue" onClick={() => setViewUser(user)}>
                            <IconEye size={18} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label={user.isActive ? 'Deactivate user' : 'Activate user'}>
                          <ActionIcon variant="subtle" color={user.isActive ? 'red' : 'green'} onClick={() => handleToggleStatus(user._id)}>
                            {user.isActive ? <IconTrash size={18} /> : <IconRotate size={18} />}
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        )}
      </Paper>

      <Modal opened={!!viewUser} onClose={() => setViewUser(null)} title="User Details" centered>
        {viewUser && (
          <Stack gap="sm">
            <Group><Text fw={500} w={100}>Name:</Text><Text>{viewUser.name}</Text></Group>
            <Group><Text fw={500} w={100}>Email:</Text><Text>{viewUser.email}</Text></Group>
            <Group><Text fw={500} w={100}>Role:</Text><Badge color={viewUser.role === 'admin' ? 'red' : viewUser.role === 'organizer' ? 'violet' : 'blue'}>{viewUser.role}</Badge></Group>
            <Group><Text fw={500} w={100}>Status:</Text><Badge color={getStatusColor(viewUser.isActive ? 'active' : 'inactive')}>{viewUser.isActive ? 'Active' : 'Inactive'}</Badge></Group>
            <Group><Text fw={500} w={100}>Joined:</Text><Text>{formatDate(viewUser.createdAt)}</Text></Group>
            <Button fullWidth mt="md" variant="default" onClick={() => setViewUser(null)}>Close</Button>
          </Stack>
        )}
      </Modal>
    </motion.div>
  );
}
