import type { Metadata } from 'next';
import { Suspense } from 'react';
import ShopView from '@/components/product/ShopView';

export const metadata: Metadata = { title: 'Shop' };

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-8">Loading products...</div>}>
      <ShopView />
    </Suspense>
  );
}
