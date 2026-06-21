import { useState } from 'react';
import {
  TextInput, PasswordInput, Button, Checkbox, Anchor, Text, Container, Paper, Stack,
  useMantineColorScheme, useComputedColorScheme,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconMail, IconLock, IconTicket, IconCalendarCheck, IconShield, IconArrowRight } from '@tabler/icons-react';
import { loginUser } from '../features/auth/authSlice';
import { notifications } from '@mantine/notifications';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.07 } } };

const benefits = [
  { icon: IconTicket, text: 'Book tickets to top events in seconds' },
  { icon: IconCalendarCheck, text: 'Track your bookings and event history' },
  { icon: IconShield, text: 'Secure QR code check-in at the venue' },
];

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const computedColorScheme = useComputedColorScheme('light');
  const isDark = computedColorScheme === 'dark';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      const result = await dispatch(loginUser({ email: formData.email, password: formData.password })).unwrap();
      notifications.show({
        title: 'Welcome back!',
        message: `Signed in as ${result.user?.name || formData.email}`,
        color: 'green',
        autoClose: 3000,
      });
      const redirects = { admin: '/admin/dashboard', organizer: '/organizer/dashboard', attendee: '/my-tickets' };
      navigate(redirects[result.user?.role] || '/');
    } catch (err) {
      notifications.show({
        title: 'Login failed',
        message: typeof err === 'string' ? err : 'Invalid email or password',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: isDark ? '#0a0a0f' : '#f8f9fc' }}>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(135deg, #0f0f1a 0%, #1a1040 50%, #0f172a 100%)'
          : 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #ede9fe 100%)',
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-20%', right: '-10%', width: 500, height: 500,
            borderRadius: '50%', background: isDark
              ? 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', left: '-5%', width: 400, height: 400,
            borderRadius: '50%', background: isDark
              ? 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          }} />
        </div>

        <Container size={420} px="md" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={stagger} initial="initial" animate="animate">
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <IconTicket size={22} color="white" />
                </div>
                <Text fw={700} size="xl" style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  EventHub
                </Text>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <Text size="32px" fw={800} lh={1.2} mb={8}>
                Welcome back
              </Text>
              <Text size="md" c="dimmed" mb={40}>
                Sign in to manage events, book tickets, and more.
              </Text>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <Paper
                shadow="xl" radius="lg" p="xl" withBorder
                bg={isDark ? '#1a1a2e' : 'white'}
                style={{ border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)' }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack gap="md">
                    <div>
                      <Text size="sm" fw={600} mb={4}>Email</Text>
                      <TextInput
                        placeholder="you@example.com"
                        leftSection={<IconMail size={16} />}
                        size="md"
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </div>

                    <div>
                      <Text size="sm" fw={600} mb={4}>Password</Text>
                      <PasswordInput
                        placeholder="Enter your password"
                        leftSection={<IconLock size={16} />}
                        size="md"
                        visible={showPassword}
                        onVisibilityChange={setShowPassword}
                        error={errors.password?.message}
                        {...register('password')}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Checkbox label="Remember me" size="sm" />
                      <Anchor component="button" size="sm" c="dimmed">Forgot password?</Anchor>
                    </div>

                    <Button
                      fullWidth size="lg"
                      type="submit"
                      loading={isSubmitting}
                      rightSection={!isSubmitting && <IconArrowRight size={18} />}
                      styles={{ root: { height: 48, fontSize: 16 } }}
                    >
                      {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.35 }}>
              <Text ta="center" size="sm" mt="xl">
                Don't have an account?{' '}
                <Anchor component={Link} to="/register" fw={600}>
                  Create account
                </Anchor>
              </Text>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 80, background: isDark ? '#0f0f1a' : 'white',
      }}>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <Text size="48px" fw={800} lh={1.1} mb="lg">
            Your events,<br />one platform.
          </Text>
          <Text size="lg" c="dimmed" mb={48} style={{ maxWidth: 420, lineHeight: 1.7 }}>
            EventHub makes it effortless to discover, book, and manage events — from intimate workshops to large conferences.
          </Text>

          <Stack gap="xl">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              >
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: `linear-gradient(135deg, ${isDark ? 'rgba(99,102,241,0.2)' : '#eef2ff'}, ${isDark ? 'rgba(139,92,246,0.15)' : '#f5f3ff'})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <b.icon size={22} color={isDark ? '#818cf8' : '#6366f1'} />
                  </div>
                  <div>
                    <Text size="md" fw={600}>{b.text}</Text>
                    <Text size="sm" c="dimmed">Simple, fast, and reliable.</Text>
                  </div>
                </div>
              </motion.div>
            ))}
          </Stack>


        </motion.div>
      </div>
    </div>
  );
}
