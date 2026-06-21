import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { login } from '../features/auth/authSlice'
import AuthLayout from '../layouts/AuthLayout'
import { Input, Button, Checkbox } from '../components/ui'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = async (data) => {
    try {
      await dispatch(login({ email: data.email, password: data.password })).unwrap()
      toast.success('Login successful!')
      navigate('/')
    } catch (err) {
      toast.error(err?.message || 'Login failed')
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
          Welcome back
        </h1>
        <p className="text-primary-500 dark:text-primary-400">
          Sign in to your account
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <motion.div {...fadeUp(0.1)} className="space-y-5">
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

          <div className="flex items-center justify-between">
            <Checkbox label="Remember me" {...register('rememberMe')} />
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              Forgot password?
            </Link>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </motion.div>
      </form>

      <motion.p
        {...fadeUp(0.3)}
        className="mt-8 text-center text-sm text-primary-500 dark:text-primary-400"
      >
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          Create one
        </Link>
      </motion.p>
    </AuthLayout>
  )
}
