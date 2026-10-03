import type { Order, OrderStatus } from '@/types';
import { Badge } from '@/components/common/Badge';
import { formatCurrency } from '@/utils/formatCurrency';

const statusTone = {
  PROCESSING: 'warning',
  SHIPPED: 'info',
  DELIVERED: 'success',
  CANCELLED: 'danger',
} as const satisfies Record<OrderStatus, 'warning' | 'info' | 'success' | 'danger'>;

const statusText: Record<OrderStatus, string> = {
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export default function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <p className="py-10 text-center text-sm text-[#5F6C72]">You have not placed any orders yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-[#E4E7E9]">
      <table className="w-full min-w-[32rem] text-sm">
        <caption className="sr-only">Your orders</caption>
        <thead className="bg-[#F2F4F5] text-left text-xs uppercase text-[#5F6C72]">
          <tr>
            <th scope="col" className="px-4 py-3">Order</th>
            <th scope="col" className="px-4 py-3">Date</th>
            <th scope="col" className="px-4 py-3">Status</th>
            <th scope="col" className="px-4 py-3">Items</th>
            <th scope="col" className="px-4 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-[#E4E7E9]">
              <td className="px-4 py-3 font-medium">{o.id}</td>
              <td className="px-4 py-3 text-[#5F6C72]">
                {new Date(o.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </td>
              <td className="px-4 py-3">
                <Badge tone={statusTone[o.status]}>{statusText[o.status]}</Badge>
              </td>
              <td className="px-4 py-3">{o.items.reduce((n, i) => n + i.quantity, 0)}</td>
              <td className="px-4 py-3 text-right font-semibold">{formatCurrency(o.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
