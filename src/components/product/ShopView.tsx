'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { SlidersHorizontal } from 'lucide-react';
import { SORT_OPTIONS } from '@/config/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { getProducts } from '@/services/productService';
import { useFilterStore } from '@/store/useFilterStore';
import type { SortOption } from '@/types';
import ProductFilterSidebar from './ProductFilterSidebar';
import ProductGrid from './ProductGrid';

export default function ShopView() {
  const params = useSearchParams();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { search, category, brands, minPrice, maxPrice, minRating, sort, setSort, setSearch, setCategory } =
    useFilterStore();

  // Sync URL params (?q= and ?category=) into the filter store
  const q = params.get('q') ?? '';
  const cat = params.get('category');
  useEffect(() => {
    setSearch(q);
    setCategory(cat);
  }, [q, cat, setSearch, setCategory]);

  const debouncedMin = useDebounce(minPrice, 250);
  const debouncedMax = useDebounce(maxPrice, 250);

  const { data = [], isLoading, isFetching } = useQuery({
    queryKey: ['products', { search, category, brands, debouncedMin, debouncedMax, minRating, sort }],
    queryFn: () =>
      getProducts({ search, category, brands, minPrice: debouncedMin, maxPrice: debouncedMax, minRating, sort }),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{search ? `Results for "${search}"` : 'All products'}</h1>
          <p className="text-sm text-[#5F6C72]" aria-live="polite">
            {isLoading ? 'Loading...' : `${data.length} products`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            className="flex items-center gap-2 rounded-sm border border-[#E4E7E9] px-3 py-2 text-sm lg:hidden"
          >
            <SlidersHorizontal className="size-4" /> Filters
          </button>
          <label className="flex items-center gap-2 text-sm text-[#5F6C72]">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="h-10 rounded-sm border border-[#E4E7E9] bg-white px-3 text-[#191C1F]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <ProductFilterSidebar className={showFilters ? 'block' : 'hidden lg:block'} />
        <div className={isFetching && !isLoading ? 'opacity-70 transition-all' : 'transition-all'}>
          <ProductGrid products={data} isLoading={isLoading} columns={3} />
        </div>
      </div>
    </div>
  );
}
