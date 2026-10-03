import type { Metadata } from 'next';
import OrdersTable from '@/components/account/OrdersTable';
import { getOrders } from '@/services/orderService';

export const metadata: Metadata = { title: 'Order history' };

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Order history</h1>
      <OrdersTable orders={orders} />
    </div>
  );
}
