import type { Metadata } from 'next';
import Link from 'next/link';
import { CircleCheck, Package, Truck } from 'lucide-react';
import OrdersTable from '@/components/account/OrdersTable';
import StatCard from '@/components/account/StatCard';
import { getOrders } from '@/services/orderService';
import { getCurrentUser } from '@/services/userService';

export const metadata: Metadata = { title: 'My account' };

export default async function AccountPage() {
  const [user, orders] = await Promise.all([getCurrentUser(), getOrders()]);
  const delivered = orders.filter((o) => o.status === 'DELIVERED').length;
  const inTransit = orders.filter((o) => o.status === 'SHIPPED').length;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Hello, {user.firstName}</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total orders" value={orders.length} icon={Package} />
        <StatCard label="In transit" value={inTransit} icon={Truck} />
        <StatCard label="Delivered" value={delivered} icon={CircleCheck} />
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent orders</h2>
          <Link href="/account/orders" className="text-sm font-medium text-[#1B6392] hover:underline">
            View all
          </Link>
        </div>
        <OrdersTable orders={orders.slice(0, 3)} />
      </section>
    </div>
  );
}
