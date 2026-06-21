import { Container, Group, Text, Stack, Anchor, Divider } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconTicket, IconMail } from '@tabler/icons-react';

const footerData = {
  Platform: [
    { label: 'Events', to: '/events' },
    { label: 'Create Event', to: '/register' },
    { label: 'Pricing', to: '#' },
    { label: 'FAQ', to: '#' },
  ],
  Company: [
    { label: 'About', to: '#' },
    { label: 'Blog', to: '#' },
    { label: 'Careers', to: '#' },
    { label: 'Contact', to: '#' },
  ],
  Support: [
    { label: 'Help Center', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Privacy Policy', to: '#' },
    { label: 'Cookie Policy', to: '#' },
  ],
};

export default function FooterSection() {
  return (
    <footer style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
      <Container size="xl" py="xl">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 32, marginBottom: 32,
        }}>
          <div>
            <Group gap="xs" mb="sm">
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <IconTicket size={16} color="white" />
              </div>
              <Text fw={700}>EventHub</Text>
            </Group>
            <Text size="sm" c="dimmed" maw={240}>
              The premier platform for discovering, creating, and managing unforgettable events.
            </Text>
            <Group gap="xs" mt="sm">
              <IconMail size={14} />
              <Text size="sm" c="dimmed">hello@eventhub.com</Text>
            </Group>
          </div>
          {Object.entries(footerData).map(([title, links]) => (
            <div key={title}>
              <Text fw={600} size="sm" mb="xs">{title}</Text>
              <Stack gap={6}>
                {links.map((l) => (
                  <Anchor key={l.label} component={Link} to={l.to} size="sm" c="dimmed">
                    {l.label}
                  </Anchor>
                ))}
              </Stack>
            </div>
          ))}
        </div>
        <Divider />
        <Text ta="center" size="sm" c="dimmed" pt="md">
          &copy; {new Date().getFullYear()} EventHub. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
