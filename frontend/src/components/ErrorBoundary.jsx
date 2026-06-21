import { Component } from 'react';
import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconTicket } from '@tabler/icons-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container size="sm" py={100}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <IconTicket size={32} color="white" />
            </div>
            <Title order={2} ta="center">Something went wrong</Title>
            <Text ta="center" c="dimmed" maw={400}>
              An unexpected error occurred. Please try refreshing the page.
            </Text>
            <Group>
              <Button component={Link} to="/" onClick={() => this.setState({ hasError: false, error: null })}>
                Browse Events
              </Button>
              <Button variant="light" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </Group>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}
