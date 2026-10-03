'use client';

import { useState } from 'react';
import { SearchX } from 'lucide-react';
import type { Product } from '@/types';
import { Skeleton } from '@/components/common/Skeleton';
import { cn } from '@/utils/cn';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  columns?: 3 | 4;
}

const gridCols: Record<3 | 4, string> = {
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export default function ProductGrid({ products, isLoading = false, columns = 4 }: ProductGridProps) {
  const [quickView, setQuickView] = useState<Product | null>(null);
  const grid = cn('grid grid-cols-1 gap-4', gridCols[columns]);

  if (isLoading) {
    return (
      <div className={grid} aria-busy="true" aria-label="Loading products">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-sm border border-[#E4E7E9] p-3">
            <Skeleton className="aspect-[4/3] w-full" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-[#E4E7E9] py-16 text-center">
        <SearchX className="size-10 text-[#929FA5]" />
        <p className="font-medium">No products match these filters</p>
        <p className="text-sm text-[#5F6C72]">Clear a filter or try a different search term.</p>
      </div>
    );
  }

  return (
    <>
      <div className={grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
        ))}
      </div>
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}
