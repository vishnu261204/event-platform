import { useState } from 'react';
import {
  TextInput, PasswordInput, Button, Anchor, Text, Container, Paper, Stack, Group, Divider,
  useComputedColorScheme,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconMail, IconLock, IconKey, IconTicket, IconArrowRight, IconArrowLeft,
  IconRefresh, IconShieldCheck, IconCheck,
} from '@tabler/icons-react';
import { forgotPassword, verifyOtp, resetPassword } from '../features/auth/authSlice';
import { notifications } from '@mantine/notifications';

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

const emailSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'Enter the 6-digit code'),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

function StepIndicator({ step }) {
  return (
    <Group justify="center" gap={10} mb="lg">
      {['Email', 'Verify', 'Reset'].map((label, i) => {
        const idx = i + 1;
        const active = step >= idx;
        const done = step > idx;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {i > 0 && <div style={{ width: 28, height: 2, borderRadius: 1, background: step > idx - 1 ? '#6366f1' : '#e5e7eb' }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? '#6366f1' : active ? 'rgba(99,102,241,0.15)' : '#e5e7eb',
                color: done ? 'white' : active ? '#6366f1' : '#9ca3af',
                fontSize: 12, fontWeight: 700, transition: 'all 0.3s ease',
              }}>
                {done ? <IconCheck size={14} /> : idx}
              </div>
              <Text size="sm" fw={600} c={active ? undefined : 'dimmed'}>{label}</Text>
            </div>
          </div>
        );
      })}
    </Group>
  );
}

function EmailStep({ onNext }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(emailSchema) });

  const onSubmit = async (formData) => {
    try {
      await dispatch(forgotPassword({ email: formData.email })).unwrap();
      notifications.show({
        title: 'OTP sent',
        message: `Check your inbox. A 6-digit code was sent to ${formData.email}.`,
        color: 'green',
        autoClose: 5000,
      });
      onNext(formData.email);
    } catch (err) {
      notifications.show({
        title: 'Something went wrong',
        message: typeof err === 'string' ? err : 'Could not send the OTP. Please try again.',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  return (
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
        <Button
          fullWidth size="lg"
          type="submit"
          loading={isSubmitting}
          rightSection={!isSubmitting && <IconArrowRight size={18} />}
          styles={{ root: { height: 48, fontSize: 16 } }}
        >
          {isSubmitting ? 'Sending code...' : 'Send reset code'}
        </Button>
      </Stack>
    </form>
  );
}

function OtpStep({ email, onBack, onNext }) {
  const dispatch = useDispatch();
  const [resending, setResending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(otpSchema) });

  const onSubmit = async (formData) => {
    try {
      await dispatch(verifyOtp({ email, otp: formData.otp })).unwrap();
      notifications.show({
        title: 'Code verified',
        message: 'Now create a new password.',
        color: 'green',
        autoClose: 4000,
      });
      onNext(formData.otp);
    } catch (err) {
      notifications.show({
        title: 'Verification failed',
        message: typeof err === 'string' ? err : 'Invalid or expired code.',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      await dispatch(forgotPassword({ email })).unwrap();
      notifications.show({
        title: 'Code resent',
        message: `A new code was sent to ${email}.`,
        color: 'green',
        autoClose: 4000,
      });
    } catch (err) {
      notifications.show({
        title: 'Resend failed',
        message: typeof err === 'string' ? err : 'Could not resend the code.',
        color: 'red',
        autoClose: 5000,
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md">
        <div>
          <Text size="sm" fw={600} mb={4}>Enter 6-digit code</Text>
          <TextInput
            placeholder="000000"
            maxLength={6}
            size="lg"
            autoFocus
            styles={{
              input: { textAlign: 'center', fontSize: 22, fontWeight: 700, letterSpacing: 8, fontFamily: 'monospace' },
            }}
            error={errors.otp?.message}
            {...register('otp')}
          />
        </div>

        <Group justify="center">
          <Button
            variant="subtle"
            size="sm"
            leftSection={<IconRefresh size={16} />}
            loading={resending}
            onClick={handleResend}
          >
            Resend code
          </Button>
        </Group>

        <Button
          fullWidth size="lg"
          type="submit"
          loading={isSubmitting}
          rightSection={!isSubmitting && <IconArrowRight size={18} />}
          styles={{ root: { height: 48, fontSize: 16 } }}
        >
          {isSubmitting ? 'Verifying...' : 'Verify code'}
        </Button>

        <Button
          fullWidth variant="subtle" size="sm"
          leftSection={<IconArrowLeft size={16} />}
          color="dimmed"
          onClick={onBack}
        >
          Back
        </Button>
      </Stack>
    </form>
  );
}

function PasswordStep({ email, otp, onBack, onDone }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(passwordSchema) });

  const onSubmit = async (formData) => {
    try {
      await dispatch(resetPassword({
        email,
        otp,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })).unwrap();
      notifications.show({
        title: 'Password reset',
        message: 'Your password was changed. Sign in with your new password.',
        color: 'green',
        autoClose: 4000,
      });
      onDone();
    } catch (err) {
      notifications.show({
        title: 'Reset failed',
        message: typeof err === 'string' ? err : 'Could not reset the password. Try again.',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md">
        <div>
          <Text size="sm" fw={600} mb={4}>New password</Text>
          <PasswordInput
            placeholder="Create a new password"
            leftSection={<IconLock size={16} />}
            size="md"
            visible={showPassword}
            onVisibilityChange={setShowPassword}
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <div>
          <Text size="sm" fw={600} mb={4}>Confirm new password</Text>
          <PasswordInput
            placeholder="Repeat your new password"
            leftSection={<IconKey size={16} />}
            size="md"
            visible={showConfirm}
            onVisibilityChange={setShowConfirm}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        <Button
          fullWidth size="lg"
          type="submit"
          loading={isSubmitting}
          rightSection={!isSubmitting && <IconArrowRight size={18} />}
          styles={{ root: { height: 48, fontSize: 16 } }}
        >
          {isSubmitting ? 'Resetting...' : 'Reset password'}
        </Button>

        <Button
          fullWidth variant="subtle" size="sm"
          leftSection={<IconArrowLeft size={16} />}
          color="dimmed"
          onClick={onBack}
        >
          Back
        </Button>
      </Stack>
    </form>
  );
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const computedColorScheme = useComputedColorScheme('light');
  const isDark = computedColorScheme === 'dark';
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

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
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', left: '-5%', width: 400, height: 400,
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          }} />
        </div>

        <Container size={440} px="md" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="initial" animate="animate">
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
              <Text size="30px" fw={800} lh={1.2} mb={6}>
                {step === 1 ? 'Forgot your password?' : step === 2 ? 'Verify your identity' : 'Create a new password'}
              </Text>
              <Text size="md" c="dimmed" mb={28}>
                {step === 1
                  ? "Enter your account email and we'll send you a reset code."
                  : step === 2
                    ? `Enter the 6-digit code sent to ${email}.`
                    : 'Almost done — pick a strong new password.'}
              </Text>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <Paper
                shadow="xl" radius="lg" p="xl" withBorder
                bg={isDark ? '#1a1a2e' : 'white'}
                style={{ border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)' }}
              >
                <StepIndicator step={step} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {step === 1 && <EmailStep onNext={(em) => { setEmail(em); setStep(2); }} />}
                    {step === 2 && (
                      <OtpStep
                        email={email}
                        onBack={() => setStep(1)}
                        onNext={(code) => { setOtp(code); setStep(3); }}
                      />
                    )}
                    {step === 3 && (
                      <PasswordStep
                        email={email}
                        otp={otp}
                        onBack={() => setStep(2)}
                        onDone={() => navigate('/login')}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Paper>
            </motion.div>

            {step === 1 && (
              <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.35 }}>
                <Text ta="center" size="sm" mt="xl">
                  Remembered your password?{' '}
                  <Anchor component={Link} to="/login" fw={600}>
                    Back to sign in
                  </Anchor>
                </Text>
              </motion.div>
            )}
          </motion.div>
        </Container>
      </div>

      <div className="hidden lg:flex" style={{
        flex: 1, flexDirection: 'column', justifyContent: 'center',
        padding: 80, background: isDark ? '#0f0f1a' : 'white',
      }}>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <Text size="48px" fw={800} lh={1.1} mb="lg">
            Back in<br />no time.
          </Text>
          <Text size="lg" c="dimmed" mb={48} style={{ maxWidth: 420, lineHeight: 1.7 }}>
            Reset your password securely with a one-time code — no long-form links, no hassle.
          </Text>

          <Stack gap="xl">
            {[
              { icon: IconShieldCheck, title: 'Secure by design', desc: 'Codes expire in 10 minutes for your safety.' },
              { icon: IconMail, title: 'Fast delivery', desc: 'Your reset code lands in your inbox instantly.' },
              { icon: IconKey, title: 'Full control', desc: 'You can resend the code anytime for convenience.' },
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

          <Divider my="xl" />
          <Text size="sm" c="dimmed">
            Having trouble? <Anchor component={Link} to="/register" fw={600}>Create a new account</Anchor>
          </Text>
        </motion.div>
      </div>
    </div>
  );
}