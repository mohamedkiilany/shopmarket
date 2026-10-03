'use client';

import { useState } from 'react';
import type { Product } from '@/types';
import { cn } from '@/utils/cn';

type Tab = 'description' | 'specifications';

export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<Tab>('description');
  const tabs: { id: Tab; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
  ];

  return (
    <section className="rounded-sm border border-[#E4E7E9]">
      <div role="tablist" className="flex border-b border-[#E4E7E9]">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={cn(
              '-mb-px border-b-2 px-6 py-3 text-sm font-medium transition-all',
              tab === t.id
                ? 'border-[#FA8232] text-[#191C1F]'
                : 'border-transparent text-[#5F6C72] hover:text-[#191C1F]'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="p-6 text-sm">
        {tab === 'description' ? (
          <p className="max-w-prose leading-relaxed text-[#5F6C72]">{product.fullDescription}</p>
        ) : (
          <dl className="grid max-w-xl gap-y-2">
            {Object.entries(product.specifications).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[10rem_1fr] border-b border-[#F2F4F5] pb-2">
                <dt className="text-[#5F6C72]">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
