import { useState, useMemo } from 'react';
import {
  TextInput, PasswordInput, Button, Anchor, Text, Container, Paper, Stack, Checkbox,
  useComputedColorScheme, Tooltip,
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconMail, IconLock, IconUser, IconTicket, IconCalendarCheck, IconArrowRight } from '@tabler/icons-react';
import { registerUser } from '../features/auth/authSlice';
import { notifications } from '@mantine/notifications';

const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['organizer', 'attendee']),
    acceptTerms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

const roles = [
  { value: 'attendee', label: 'Attendee', desc: 'Discover and book amazing events', icon: IconTicket, color: '#6366f1' },
  { value: 'organizer', label: 'Organizer', desc: 'Create and manage your own events', icon: IconCalendarCheck, color: '#7c3aed' },
];

function PasswordStrength({ password }) {
  const strength = useMemo(() => {
    if (!password) return { label: '', score: 0, color: '' };
    let score = 0;
    if (password.length >= 6) score += 25;
    if (password.length >= 10) score += 15;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^A-Za-z0-9]/.test(password)) score += 10;
    if (score <= 30) return { label: 'Weak', score, color: '#ef4444' };
    if (score <= 60) return { label: 'Fair', score, color: '#f97316' };
    if (score <= 80) return { label: 'Good', score, color: '#22c55e' };
    return { label: 'Strong', score, color: '#16a34a' };
  }, [password]);

  if (!password) return null;

  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ height: 4, borderRadius: 2, background: '#e5e7eb', overflow: 'hidden' }}>
        <div style={{ width: `${strength.score}%`, height: '100%', background: strength.color, borderRadius: 2, transition: 'width 0.3s ease' }} />
      </div>
      <Text size="xs" style={{ color: strength.color, marginTop: 2 }}>{strength.label}</Text>
    </div>
  );
}

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const computedColorScheme = useComputedColorScheme('light');
  const isDark = computedColorScheme === 'dark';

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: 'attendee', acceptTerms: false },
  });

  const watchPassword = watch('password');

  const onSubmit = async (formData) => {
    try {
      const result = await dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })).unwrap();
      notifications.show({
        title: 'Account created!',
        message: `Welcome to EventHub, ${result.user?.name || formData.name}`,
        color: 'green',
        autoClose: 4000,
      });
      const redirects = { admin: '/admin/dashboard', organizer: '/organizer/dashboard', attendee: '/' };
      navigate(redirects[result.user?.role] || '/');
    } catch (err) {
      notifications.show({
        title: 'Registration failed',
        message: typeof err === 'string' ? err : 'Could not create account. Please try again.',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: isDark ? '#0a0a0f' : '#f8f9fc' }}>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isDark
          ? 'linear-gradient(135deg, #0f0f1a 0%, #1a1040 50%, #0f172a 100%)'
          : 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #ede9fe 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-15%', right: '-8%', width: 450, height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-5%', left: '-10%', width: 350, height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          }} />
        </div>

        <Container size={460} px="md" style={{ position: 'relative', zIndex: 1 }}>
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
                Create your account
              </Text>
              <Text size="md" c="dimmed" mb={32}>
                Join thousands of attendees and organizers.
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
                      <Text size="sm" fw={600} mb={4}>Full name</Text>
                      <TextInput
                        placeholder="John Doe"
                        leftSection={<IconUser size={16} />}
                        size="md"
                        error={errors.name?.message}
                        {...register('name')}
                      />
                    </div>

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
                        placeholder="Create a strong password"
                        leftSection={<IconLock size={16} />}
                        size="md"
                        visible={showPassword}
                        onVisibilityChange={setShowPassword}
                        error={errors.password?.message}
                        {...register('password')}
                      />
                      <PasswordStrength password={watchPassword || ''} />
                    </div>

                    <div>
                      <Text size="sm" fw={600} mb={4}>Confirm password</Text>
                      <PasswordInput
                        placeholder="Repeat your password"
                        leftSection={<IconLock size={16} />}
                        size="md"
                        visible={showConfirm}
                        onVisibilityChange={setShowConfirm}
                        error={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                      />
                    </div>

                    <div>
                      <Text size="sm" fw={600} mb={8}>I want to join as</Text>
                      <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                          <div style={{ display: 'flex', gap: 10 }}>
                            {roles.map((r) => (
                              <Tooltip key={r.value} label={r.desc} withArrow>
                                <Paper
                                  withBorder
                                  radius="md"
                                  p="sm"
                                  onClick={() => field.onChange(r.value)}
                                  style={{
                                    flex: 1, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                                    borderColor: field.value === r.value ? r.color : undefined,
                                    background: field.value === r.value
                                      ? (isDark ? `${r.color}22` : `${r.color}11`)
                                      : undefined,
                                  }}
                                >
                                  <r.icon size={24} color={r.color} style={{ margin: '0 auto 4px' }} />
                                  <Text size="sm" fw={600}>{r.label}</Text>
                                </Paper>
                              </Tooltip>
                            ))}
                          </div>
                        )}
                      />
                      {errors.role && <Text size="xs" c="red" mt={2}>{errors.role.message}</Text>}
                    </div>

                    <Checkbox
                      label={<Text size="sm">I agree to the <Anchor component="button" size="sm">Terms of Service</Anchor> and <Anchor component="button" size="sm">Privacy Policy</Anchor></Text>}
                      error={errors.acceptTerms?.message}
                      {...register('acceptTerms')}
                    />

                    <Button
                      fullWidth size="lg"
                      type="submit"
                      loading={isSubmitting}
                      rightSection={!isSubmitting && <IconArrowRight size={18} />}
                      styles={{ root: { height: 48, fontSize: 16 } }}
                    >
                      {isSubmitting ? 'Creating account...' : 'Create account'}
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.35 }}>
              <Text ta="center" size="sm" mt="xl">
                Already have an account?{' '}
                <Anchor component={Link} to="/login" fw={600}>
                  Sign in
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
            Start your<br />event journey.
          </Text>
          <Text size="lg" c="dimmed" mb={48} style={{ maxWidth: 420, lineHeight: 1.7 }}>
            Whether you're hosting or attending, EventHub gives you everything you need for a seamless experience.
          </Text>

          <Stack gap="xl">
            {[
              { icon: IconTicket, title: 'Discover events', desc: 'Browse hundreds of events curated just for you.' },
              { icon: IconCalendarCheck, title: 'Instant booking', desc: 'Secure your spot in seconds with instant confirmation.' },
              { icon: IconLock, title: 'Secure & private', desc: 'Your data is encrypted and never shared without permission.' },
            ].map((item, i) => (
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
                    <item.icon size={22} color={isDark ? '#818cf8' : '#6366f1'} />
                  </div>
                  <div>
                    <Text size="md" fw={600}>{item.title}</Text>
                    <Text size="sm" c="dimmed">{item.desc}</Text>
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
