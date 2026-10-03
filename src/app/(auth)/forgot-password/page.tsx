'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { delay } from '@/services/api';

const schema = z.object({ email: z.string().email('Enter a valid email address') });
type Values = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (): Promise<void> => {
    await delay(600); // TODO: replace with a real reset-email call
    setSent(true);
  };

  return (
    <>
      <h1 className="mb-2 text-center text-2xl font-semibold">Reset password</h1>
      <p className="mb-6 text-center text-sm text-[#5F6C72]">
        Enter your email and we will send you a link to reset your password.
      </p>
      {sent ? (
        <p role="status" className="rounded-sm bg-[#2DB224]/10 p-4 text-center text-sm text-[#2DB224]">
          Check your inbox for the reset link.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
          <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
            Send reset link
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm">
        <Link href="/login" className="font-medium text-[#1B6392] hover:underline">
          Back to sign in
        </Link>
      </p>
    </>
  );
}
