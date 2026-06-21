import { motion } from 'framer-motion';
import { Paper, Title, Text, Group, Table, ScrollArea, Badge, TextInput } from '@mantine/core';
import { IconSearch, IconEye, IconTrash } from '@tabler/icons-react';
import { formatDate, getStatusColor, getStatusLabel } from '../../lib/utils';

const users = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'active', joined: '2024-01-15' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Organizer', status: 'active', joined: '2024-02-20' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Admin', status: 'active', joined: '2023-11-05' },
  { name: 'David Brown', email: 'david@example.com', role: 'User', status: 'inactive', joined: '2024-03-10' },
  { name: 'Eve Davis', email: 'eve@example.com', role: 'User', status: 'active', joined: '2024-04-22' },
  { name: 'Frank Miller', email: 'frank@example.com', role: 'Organizer', status: 'active', joined: '2024-01-30' },
  { name: 'Grace Wilson', email: 'grace@example.com', role: 'User', status: 'cancelled', joined: '2024-05-12' },
  { name: 'Henry Taylor', email: 'henry@example.com', role: 'User', status: 'active', joined: '2024-06-01' },
];

export default function Users() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Manage Users</Title>
        <TextInput
          placeholder="Search users..."
          leftSection={<IconSearch size={16} />}
          w={300}
        />
      </Group>

      <Paper p="lg" radius="md" withBorder>
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
              {users.map((user) => (
                <Table.Tr key={user.email}>
                  <Table.Td>
                    <Text fw={500}>{user.name}</Text>
                  </Table.Td>
                  <Table.Td>{user.email}</Table.Td>
                  <Table.Td>
                    <Badge variant="light" color={user.role === 'Admin' ? 'red' : user.role === 'Organizer' ? 'violet' : 'blue'}>
                      {user.role}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(user.status)} size="sm">
                      {getStatusLabel(user.status)}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{formatDate(user.joined)}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <IconEye size={18} style={{ cursor: 'pointer', color: 'var(--mantine-color-blue-6)' }} />
                      <IconTrash size={18} style={{ cursor: 'pointer', color: 'var(--mantine-color-red-6)' }} />
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </motion.div>
  );
}
