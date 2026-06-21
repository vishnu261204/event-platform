import { TextInput, PasswordInput, Button, Checkbox, Anchor, Text } from '@mantine/core';
import { IconMail, IconLock } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../features/auth/authSlice';
import AuthLayout from '../layouts/AuthLayout';
import { notifications } from '@mantine/notifications';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      notifications.show({ title: 'Success', message: 'Logged in successfully', color: 'green' });
      navigate('/');
    } catch (err) {
      notifications.show({ title: 'Error', message: err?.message || 'Login failed', color: 'red' });
    }
  };

  return (
    <AuthLayout>
      <motion.form onSubmit={handleSubmit(onSubmit)} {...fadeUp} transition={{ duration: 0.5 }}>
        <Text ta="center" size="xl" fw={700} mb="md">Welcome Back</Text>

        <TextInput
          label="Email"
          placeholder="your@email.com"
          leftSection={<IconMail size={16} />}
          error={errors.email?.message}
          {...register('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          leftSection={<IconLock size={16} />}
          mt="md"
          error={errors.password?.message}
          {...register('password')}
        />

        <Checkbox label="Remember me" mt="md" />

        <Button fullWidth type="submit" mt="xl" loading={isSubmitting}>
          Sign in
        </Button>

        <Text ta="center" size="sm" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor component={Link} to="/register">
            Register
          </Anchor>
        </Text>
      </motion.form>
    </AuthLayout>
  );
}
