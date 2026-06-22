import { Container, Text } from '@mantine/core';

export default function FooterSection() {
  return (
    <footer style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
      <Container size="xl" py="md">
        <Text ta="center" size="sm" c="dimmed">
          &copy; {new Date().getFullYear()} EventHub. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
