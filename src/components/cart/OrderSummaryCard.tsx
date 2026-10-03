import type { ReactNode } from 'react';
import { FREE_SHIPPING_THRESHOLD } from '@/config/constants';
import { formatCurrency } from '@/utils/formatCurrency';

interface OrderSummaryCardProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  children?: ReactNode;
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? 'flex justify-between text-base font-semibold' : 'flex justify-between text-[#5F6C72]'}>
      <dt>{label}</dt>
      <dd className={strong ? '' : 'font-medium text-[#191C1F]'}>{value}</dd>
    </div>
  );
}

export default function OrderSummaryCard({ subtotal, shipping, tax, total, children }: OrderSummaryCardProps) {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  return (
    <aside aria-label="Order summary" className="h-fit rounded-sm border border-[#E4E7E9] p-5">
      <h2 className="mb-4 text-lg font-semibold">Order summary</h2>
      <dl className="space-y-3 text-sm">
        <Row label="Subtotal" value={formatCurrency(subtotal)} />
        <Row label="Shipping" value={shipping === 0 ? 'Free' : formatCurrency(shipping)} />
        <Row label="Tax" value={formatCurrency(tax)} />
        <div className="border-t border-[#E4E7E9] pt-3">
          <Row label="Total" value={formatCurrency(total)} strong />
        </div>
      </dl>
      {subtotal > 0 && remaining > 0 && (
        <p className="mt-3 text-xs text-[#5F6C72]">
          Add {formatCurrency(remaining)} more for free shipping.
        </p>
      )}
      {children && <div className="mt-5 space-y-3">{children}</div>}
    </aside>
  );
}
