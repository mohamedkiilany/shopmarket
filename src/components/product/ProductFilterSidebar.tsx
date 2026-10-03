'use client';

import { Star } from 'lucide-react';
import { BRANDS, CATEGORIES, PRICE_RANGES } from '@/config/constants';
import { useFilterStore } from '@/store/useFilterStore';
import { Button } from '@/components/common/Button';
import { cn } from '@/utils/cn';

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-[#E4E7E9] pb-5">
      <legend className="mb-3 text-sm font-semibold uppercase">{title}</legend>
      <div className="space-y-2.5 text-sm">{children}</div>
    </fieldset>
  );
}

const optionLabel = 'flex cursor-pointer items-center gap-2.5 text-[#5F6C72] hover:text-[#191C1F]';

export default function ProductFilterSidebar({ className }: { className?: string }) {
  const { category, brands, minPrice, maxPrice, minRating } = useFilterStore();
  const { setCategory, toggleBrand, setPriceRange, setMinRating, reset } = useFilterStore();

  return (
    <aside aria-label="Product filters" className={cn('space-y-5', className)}>
      <Group title="Category">
        {[{ name: 'All categories', slug: null as string | null }, ...CATEGORIES].map((c) => (
          <label key={c.name} className={optionLabel}>
            <input
              type="radio"
              name="category"
              checked={category === c.slug}
              onChange={() => setCategory(c.slug)}
              className="size-4 accent-[#FA8232]"
            />
            {c.name}
          </label>
        ))}
      </Group>

      <Group title="Price range">
        {PRICE_RANGES.map((r) => (
          <label key={r.label} className={optionLabel}>
            <input
              type="radio"
              name="price"
              checked={minPrice === r.min && maxPrice === r.max}
              onChange={() => setPriceRange(r.min, r.max)}
              className="size-4 accent-[#FA8232]"
            />
            {r.label}
          </label>
        ))}
      </Group>

      <Group title="Brand">
        {BRANDS.map((b) => (
          <label key={b} className={optionLabel}>
            <input
              type="checkbox"
              checked={brands.includes(b)}
              onChange={() => toggleBrand(b)}
              className="size-4 accent-[#FA8232]"
            />
            {b}
          </label>
        ))}
      </Group>

      <Group title="Rating">
        {[4, 3, 0].map((r) => (
          <label key={r} className={optionLabel}>
            <input
              type="radio"
              name="rating"
              checked={minRating === r}
              onChange={() => setMinRating(r)}
              className="size-4 accent-[#FA8232]"
            />
            {r === 0 ? (
              'Any rating'
            ) : (
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-[#FA8232] text-[#FA8232]" /> {r}.0 and up
              </span>
            )}
          </label>
        ))}
      </Group>

      <Button variant="outline" size="sm" fullWidth onClick={reset}>
        Clear all filters
      </Button>
    </aside>
  );
}
