'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import type { CartItem } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';

interface CartTableProps {
  items: CartItem[];
  onUpdate: (productId: string, quantity: number, color?: string) => void;
  onRemove: (productId: string, color?: string) => void;
}

export default function CartTable({ items, onUpdate, onRemove }: CartTableProps) {
  return (
    <div className="overflow-x-auto rounded-sm border border-[#E4E7E9]">
      <table className="w-full min-w-[34rem] text-sm">
        <caption className="sr-only">Items in your cart</caption>
        <thead className="bg-[#F2F4F5] text-left text-xs uppercase text-[#5F6C72]">
          <tr>
            <th scope="col" className="px-4 py-3">Product</th>
            <th scope="col" className="px-4 py-3">Price</th>
            <th scope="col" className="px-4 py-3">Quantity</th>
            <th scope="col" className="px-4 py-3 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ product, quantity, selectedColor }) => (
            <tr key={`${product.id}-${selectedColor ?? 'default'}`} className="border-t border-[#E4E7E9]">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Remove ${product.title}`}
                    onClick={() => onRemove(product.id, selectedColor)}
                    className="rounded-full p-1 text-[#929FA5] transition-all hover:bg-[#F2F4F5] hover:text-red-600"
                  >
                    <X className="size-4" />
                  </button>
                  <div className="relative size-16 shrink-0 overflow-hidden bg-[#F2F4F5]">
                    <Image src={product.thumbnail} alt="" fill unoptimized sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <Link href={`/product/${product.id}`} className="line-clamp-2 font-medium hover:text-[#1B6392]">
                      {product.title}
                    </Link>
                    {selectedColor && (
                      <span className="mt-1 flex items-center gap-1.5 text-xs text-[#5F6C72]">
                        Color
                        <span className="size-3.5 rounded-full border border-[#E4E7E9]" style={{ backgroundColor: selectedColor }} />
                      </span>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">{formatCurrency(product.price)}</td>
              <td className="px-4 py-4">
                <div className="inline-flex items-center rounded-sm border border-[#E4E7E9]">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => onUpdate(product.id, quantity - 1, selectedColor)}
                    className="flex size-9 items-center justify-center hover:bg-[#F2F4F5]"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => onUpdate(product.id, Math.min(10, quantity + 1), selectedColor)}
                    className="flex size-9 items-center justify-center hover:bg-[#F2F4F5]"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </td>
              <td className="px-4 py-4 text-right font-semibold">{formatCurrency(product.price * quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
