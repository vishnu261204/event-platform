import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { register } from '../features/auth/authSlice'
import AuthLayout from '../layouts/AuthLayout'
import { Input, Button, Select } from '../components/ui'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    role: z.enum(['attendee', 'organizer'], { required_error: 'Select a role' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const roleOptions = [
  { value: 'attendee', label: 'Attendee' },
  { value: 'organizer', label: 'Organizer' },
]

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', role: 'attendee' },
  })

  const onSubmit = async (data) => {
    try {
      await dispatch(
        register({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      ).unwrap()
      toast.success('Account created successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err?.message || 'Registration failed')
    }
  }

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  })

  return (
    <AuthLayout>
      <motion.div {...fadeUp(0)} className="space-y-2">
        <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100">
          Create an account
        </h1>
        <p className="text-primary-500 dark:text-primary-400">
          Join the event platform today
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <motion.div {...fadeUp(0.1)} className="space-y-5">
          <Input
            label="Full name"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                label="I want to join as"
                options={roleOptions}
                value={field.value}
                onValueChange={field.onChange}
                error={errors.role?.message}
              />
            )}
          />
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </motion.div>
      </form>

      <motion.p
        {...fadeUp(0.3)}
        className="mt-8 text-center text-sm text-primary-500 dark:text-primary-400"
      >
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          Sign in
        </Link>
      </motion.p>
    </AuthLayout>
  )
}
