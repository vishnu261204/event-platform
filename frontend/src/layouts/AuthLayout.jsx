import { Paper, Container, Title, Text, Center } from '@mantine/core';
import { IconTicket } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eef2ff, #ffffff, #f5f3ff)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Container size="xs" px="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper shadow="xl" radius="lg" p="xl" withBorder>
            <Center mb="lg">
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <IconTicket size={24} color="white" />
              </div>
            </Center>
            <Title ta="center" order={2} mb={4}>{title}</Title>
            {subtitle && (
              <Text ta="center" c="dimmed" size="sm" mb="xl">{subtitle}</Text>
            )}
            {children}
          </Paper>
        </motion.div>
      </Container>
    </div>
  );
}
