import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Modal, Button, Text, Stack, Group, Divider } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCircleCheck } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../lib/utils';
import { createBooking } from '../../features/bookings/bookingSlice';
import { notifications } from '@mantine/notifications';

export default function PaymentModal({ opened, onClose, event, quantity }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setSubmitting(false);
    setSuccess(false);
    onClose();
  };

  const handleBook = async () => {
    setSubmitting(true);
    try {
      await dispatch(createBooking({ eventId: event._id, quantity })).unwrap();
      setSuccess(true);
      notifications.show({
        title: 'Booking Successful',
        message: 'Your booking has been confirmed.',
        color: 'green',
      });
    } catch (err) {
      notifications.show({
        title: 'Booking Failed',
        message: typeof err === 'string' ? err : 'Unable to complete booking.',
        color: 'red',
      });
      reset();
    }
  };

  const total = event.price * quantity;

  return (
    <Modal
      opened={opened}
      onClose={submitting ? undefined : reset}
      closeOnClickOutside={!submitting}
      closeOnEscape={!submitting}
      withCloseButton={!submitting}
      centered
      size="md"
      fullScreen={isMobile}
      padding={0}
    >
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div key="summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            <Stack p="lg" gap="md">
              <Text fw={700} size="lg">Confirm Your Booking</Text>
              <Divider />
              <Group justify="space-between"><Text size="sm" c="dimmed">Event</Text><Text fw={500} size="sm">{event.title}</Text></Group>
              <Group justify="space-between"><Text size="sm" c="dimmed">Venue</Text><Text size="sm">{event.venue || event.location}</Text></Group>
              <Group justify="space-between"><Text size="sm" c="dimmed">Date</Text><Text size="sm">{event.date}</Text></Group>
              <Divider />
              <Group justify="space-between"><Text size="sm" c="dimmed">Ticket Price</Text><Text size="sm" fw={500}>{formatCurrency(event.price)}</Text></Group>
              <Group justify="space-between"><Text size="sm" c="dimmed">Quantity</Text><Text size="sm" fw={500}>{quantity}</Text></Group>
              <Divider />
              <Group justify="space-between"><Text fw={700} size="lg">Total</Text><Text fw={700} size="lg" c="indigo">{formatCurrency(total)}</Text></Group>
              <Group grow mt="sm">
                <Button variant="default" onClick={reset} disabled={submitting}>Cancel</Button>
                <Button onClick={handleBook} loading={submitting}>
                  {submitting ? 'Booking...' : `Confirm Booking — ${formatCurrency(total)}`}
                </Button>
              </Group>
            </Stack>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
            <Stack p="xl" gap="md" align="center" py="xl">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}>
                <IconCircleCheck size={64} color="var(--mantine-color-green-5)" />
              </motion.div>
              <Text size="xl" fw={700}>Booking Confirmed!</Text>
              <Text size="sm" c="dimmed" ta="center">Your booking has been confirmed successfully.</Text>
              <Button fullWidth mt="md" size="lg" onClick={() => { reset(); navigate('/my-bookings'); }}>
                View My Bookings
              </Button>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
