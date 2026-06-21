import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <Container size="sm" py={100}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title
          order={1}
          ta="center"
          style={{
            fontSize: '120px',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </Title>

        <Text ta="center" size="lg" mt="md" c="dimmed">
          Page not found. The page you are looking for does not exist or has been moved.
        </Text>

        <Group justify="center" mt="xl">
          <Button component={Link} to="/" variant="filled">
            Go Home
          </Button>
          <Button component={Link} to="/events" variant="light">
            Browse Events
          </Button>
        </Group>
      </motion.div>
    </Container>
  );
}
