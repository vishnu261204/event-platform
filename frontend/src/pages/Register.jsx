import { TextInput, PasswordInput, Button, Select, Text, Anchor } from '@mantine/core';
import { IconMail, IconLock, IconUser } from '@tabler/icons-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { register as registerUser } from '../features/auth/authSlice';
import AuthLayout from '../layouts/AuthLayout';
import { notifications } from '@mantine/notifications';

const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['attendee', 'organizer']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      notifications.show({ title: 'Success', message: 'Account created successfully', color: 'green' });
      navigate('/');
    } catch (err) {
      notifications.show({ title: 'Error', message: err?.message || 'Registration failed', color: 'red' });
    }
  };

  return (
    <AuthLayout>
      <motion.form onSubmit={handleSubmit(onSubmit)} {...fadeUp} transition={{ duration: 0.5 }}>
        <Text ta="center" size="xl" fw={700} mb="md">Create Account</Text>

        <TextInput
          label="Name"
          placeholder="Your name"
          leftSection={<IconUser size={16} />}
          error={errors.name?.message}
          {...register('name')}
        />

        <TextInput
          label="Email"
          placeholder="your@email.com"
          leftSection={<IconMail size={16} />}
          mt="md"
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

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          leftSection={<IconLock size={16} />}
          mt="md"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              label="Role"
              placeholder="Select role"
              data={[
                { value: 'attendee', label: 'Attendee' },
                { value: 'organizer', label: 'Organizer' },
              ]}
              mt="md"
              value={field.value}
              onChange={field.onChange}
              error={errors.role?.message}
            />
          )}
        />

        <Button fullWidth type="submit" mt="xl" loading={isSubmitting}>
          Register
        </Button>

        <Text ta="center" size="sm" mt="md">
          Already have an account?{' '}
          <Anchor component={Link} to="/login">
            Sign in
          </Anchor>
        </Text>
      </motion.form>
    </AuthLayout>
  );
}
