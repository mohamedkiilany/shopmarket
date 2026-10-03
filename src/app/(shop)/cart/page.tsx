'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import CartTable from '@/components/cart/CartTable';
import OrderSummaryCard from '@/components/cart/OrderSummaryCard';
import { Button } from '@/components/common/Button';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
  const cart = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Shopping cart</h1>

      {cart.hydrated && cart.items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-sm border border-dashed border-[#E4E7E9] py-20 text-center">
          <ShoppingBag className="size-12 text-[#929FA5]" />
          <p className="font-medium">Your cart is empty</p>
          <Link href="/shop">
            <Button>Start shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-4">
            <CartTable items={cart.items} onUpdate={cart.updateQuantity} onRemove={cart.removeFromCart} />
            <div className="flex justify-between">
              <Link href="/shop">
                <Button variant="outline">Continue shopping</Button>
              </Link>
              <Button variant="ghost" onClick={cart.clearCart}>
                Clear cart
              </Button>
            </div>
          </div>
          <OrderSummaryCard subtotal={cart.subtotal} shipping={cart.shipping} tax={cart.tax} total={cart.total}>
            <Link href="/checkout" className="block">
              <Button size="lg" fullWidth disabled={cart.items.length === 0}>
                Proceed to checkout
              </Button>
            </Link>
          </OrderSummaryCard>
        </div>
      )}
    </div>
  );
}
