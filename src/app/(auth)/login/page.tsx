'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { delay } from '@/services/api';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (): Promise<void> => {
    await delay(600); // TODO: replace with a real auth call
    router.push('/account');
  };

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-semibold">Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="text-right text-sm">
          <Link href="/forgot-password" className="text-[#1B6392] hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[#5F6C72]">
        New to CLICON?{' '}
        <Link href="/register" className="font-medium text-[#1B6392] hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}
