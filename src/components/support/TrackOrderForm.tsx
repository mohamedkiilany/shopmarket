'use client';

import { useState, type FormEvent } from 'react';
import { Check, Circle } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { trackOrder } from '@/services/orderService';
import type { TrackingResult } from '@/types';
import { cn } from '@/utils/cn';

export default function TrackOrderForm() {
  const [orderId, setOrderId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setNotFound(false);
    const data = await trackOrder(orderId);
    setResult(data);
    setNotFound(data === null);
    setLoading(false);
  };

  return (
    <div className="space-y-5">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <Input
          label="Order ID"
          placeholder="For example CLC-85377"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button type="submit" loading={loading} className="sm:shrink-0">
          Track order
        </Button>
      </form>

      {notFound && (
        <p role="alert" className="text-sm text-red-600">
          We could not find that order. Check the ID in your confirmation email.
        </p>
      )}

      {result && (
        <ol className="space-y-3" aria-label={`Tracking for ${result.orderId}`}>
          {result.steps.map((s) => (
            <li key={s.label} className={cn('flex items-center gap-3 text-sm', !s.done && 'text-[#929FA5]')}>
              {s.done ? (
                <span className="flex size-6 items-center justify-center rounded-full bg-[#2DB224] text-white">
                  <Check className="size-4" />
                </span>
              ) : (
                <Circle className="size-6" />
              )}
              {s.label}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
