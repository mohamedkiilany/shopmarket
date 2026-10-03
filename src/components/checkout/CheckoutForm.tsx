'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import OrderSummaryCard from '@/components/cart/OrderSummaryCard';
import { useCart } from '@/hooks/useCart';
import { placeOrder } from '@/services/orderService';
import { formatCurrency } from '@/utils/formatCurrency';

const schema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name'),
    email: z.string().email('Enter a valid email address'),
    phone: z.string().min(7, 'Enter a valid phone number'),
    line1: z.string().min(5, 'Enter your street address'),
    city: z.string().min(2, 'Enter your city'),
    zip: z.string().min(3, 'Enter your ZIP or postal code'),
    country: z.string().min(2, 'Enter your country'),
    paymentMethod: z.enum(['CARD', 'COD']),
    cardNumber: z.string().optional(),
  })
  .superRefine((v, ctx) => {
    if (v.paymentMethod === 'CARD' && !/^\d{13,19}$/.test((v.cardNumber ?? '').replace(/\s/g, ''))) {
      ctx.addIssue({ code: 'custom', path: ['cardNumber'], message: 'Enter a valid card number' });
    }
  });

type CheckoutValues = z.infer<typeof schema>;

export default function CheckoutForm() {
  const router = useRouter();
  const cart = useCart();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(schema),
    defaultValues: { paymentMethod: 'COD', country: '' },
  });
  const method = watch('paymentMethod');

  if (cart.hydrated && cart.items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-[#5F6C72]">Your cart is empty.</p>
        <Link href="/shop" className="font-medium text-[#1B6392] underline underline-offset-4">
          Continue shopping
        </Link>
      </div>
    );
  }

  const onSubmit = async (v: CheckoutValues): Promise<void> => {
    setSubmitError(null);
    try {
      await placeOrder({
        items: cart.items,
        total: cart.total,
        paymentMethod: v.paymentMethod,
        shippingAddress: { line1: v.line1, city: v.city, zip: v.zip, country: v.country },
      });
      cart.clearCart();
      router.push('/account/orders');
    } catch {
      setSubmitError('We could not place your order. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-8">
        <section className="space-y-4 rounded-sm border border-[#E4E7E9] p-5">
          <h2 className="text-lg font-semibold">Billing and shipping</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full name" autoComplete="name" error={errors.fullName?.message} {...register('fullName')} />
            <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
            <Input label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register('phone')} />
            <Input label="Country" autoComplete="country-name" error={errors.country?.message} {...register('country')} />
            <div className="sm:col-span-2">
              <Input label="Street address" autoComplete="street-address" error={errors.line1?.message} {...register('line1')} />
            </div>
            <Input label="City" autoComplete="address-level2" error={errors.city?.message} {...register('city')} />
            <Input label="ZIP / postal code" autoComplete="postal-code" error={errors.zip?.message} {...register('zip')} />
          </div>
        </section>

        <fieldset className="space-y-4 rounded-sm border border-[#E4E7E9] p-5">
          <legend className="px-1 text-lg font-semibold">Payment method</legend>
          <label className="flex items-center gap-3 text-sm">
            <input type="radio" value="COD" className="size-4 accent-[#FA8232]" {...register('paymentMethod')} />
            Cash on delivery
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="radio" value="CARD" className="size-4 accent-[#FA8232]" {...register('paymentMethod')} />
            Credit or debit card
          </label>
          {method === 'CARD' && (
            <Input
              label="Card number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              error={errors.cardNumber?.message}
              {...register('cardNumber')}
            />
          )}
        </fieldset>
      </div>

      <OrderSummaryCard subtotal={cart.subtotal} shipping={cart.shipping} tax={cart.tax} total={cart.total}>
        <ul className="max-h-48 space-y-2 overflow-y-auto text-sm">
          {cart.items.map((i) => (
            <li key={`${i.product.id}-${i.selectedColor ?? ''}`} className="flex items-center gap-3">
              <div className="relative size-10 shrink-0 bg-[#F2F4F5]">
                <Image src={i.product.thumbnail} alt="" fill unoptimized sizes="40px" className="object-cover" />
              </div>
              <span className="line-clamp-1 flex-1">
                {i.quantity} × {i.product.title}
              </span>
              <span>{formatCurrency(i.product.price * i.quantity)}</span>
            </li>
          ))}
        </ul>
        {submitError && (
          <p role="alert" className="text-sm text-red-600">
            {submitError}
          </p>
        )}
        <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
          Place order
        </Button>
      </OrderSummaryCard>
    </form>
  );
}
