'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { getCurrentUser, updateUser } from '@/services/userService';

const schema = z.object({
  firstName: z.string().min(2, 'Enter your first name'),
  lastName: z.string().min(2, 'Enter your last name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
});
type Values = z.infer<typeof schema>;

export default function SettingsPage() {
  const [saved, setSaved] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      const u = await getCurrentUser();
      return { firstName: u.firstName, lastName: u.lastName, email: u.email, phone: u.phone };
    },
  });

  const onSubmit = async (values: Values): Promise<void> => {
    await updateUser(values);
    setSaved(true);
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Profile settings</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setSaved(false)}
        noValidate
        className="space-y-4"
        aria-busy={isLoading}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="First name" error={errors.firstName?.message} {...register('firstName')} />
          <Input label="Last name" error={errors.lastName?.message} {...register('lastName')} />
        </div>
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" type="tel" error={errors.phone?.message} {...register('phone')} />
        <div className="flex items-center gap-4">
          <Button type="submit" loading={isSubmitting} disabled={isLoading}>
            Save changes
          </Button>
          {saved && (
            <p role="status" className="text-sm text-[#2DB224]">
              Changes saved
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
