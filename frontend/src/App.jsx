import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Center, Loader, Stack, Text } from '@mantine/core';
import { IconTicket } from '@tabler/icons-react';
import AppRoutes from './routes/AppRoutes';
import { getProfile } from './features/auth/authSlice';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const dispatch = useDispatch();
  const { token, authInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !authInitialized) {
      dispatch(getProfile());
    }
  }, [dispatch, token, authInitialized]);

  if (!authInitialized) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack align="center" gap="md">
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconTicket size={24} color="white" />
          </div>
          <Loader color="indigo" size="sm" />
          <Text size="sm" c="dimmed">Loading...</Text>
        </Stack>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}
