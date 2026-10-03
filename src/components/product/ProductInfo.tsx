'use client';

import { useState } from 'react';
import { Check, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { RatingStars } from '@/components/common/RatingStars';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/utils/cn';
import ProductPrice from './ProductPrice';

interface ProductInfoProps {
  product: Product;
  compact?: boolean;
}

const stockLabel = {
  IN_STOCK: { tone: 'success', text: 'In stock' },
  LOW_STOCK: { tone: 'warning', text: 'Only a few left' },
  OUT_OF_STOCK: { tone: 'danger', text: 'Out of stock' },
} as const;

export default function ProductInfo({ product, compact = false }: ProductInfoProps) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string | undefined>(product.colors?.[0]);
  const [added, setAdded] = useState<boolean>(false);

  const soldOut = product.stockStatus === 'OUT_OF_STOCK';
  const stock = stockLabel[product.stockStatus];
  const wished = isWishlisted(product.id);

  const onAdd = (): void => {
    addToCart(product, quantity, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
          <Badge tone={stock.tone}>{stock.text}</Badge>
        </div>
        <h1 className={cn('font-semibold', compact ? 'text-xl' : 'text-2xl')}>{product.title}</h1>
        <p className="text-sm text-[#5F6C72]">
          SKU {product.sku} · Brand {product.brand}
        </p>
      </div>

      <ProductPrice price={product.price} originalPrice={product.originalPrice} className="text-2xl" />
      <p className="text-sm text-[#5F6C72]">{product.shortDescription}</p>

      {product.colors && product.colors.length > 0 && (
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Color</legend>
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                aria-label={`Color ${c}`}
                aria-pressed={color === c}
                style={{ backgroundColor: c }}
                className={cn(
                  'size-8 rounded-full border-2 border-white outline outline-2 transition-all',
                  color === c ? 'outline-[#FA8232]' : 'outline-[#E4E7E9]'
                )}
              />
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-12 items-center rounded-sm border border-[#E4E7E9]">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-12 items-center justify-center hover:bg-[#F2F4F5]"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center text-sm font-medium" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="flex size-12 items-center justify-center hover:bg-[#F2F4F5]"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <Button size="lg" disabled={soldOut} onClick={onAdd} className="flex-1 sm:flex-none">
          {added ? <Check className="size-5" /> : <ShoppingCart className="size-5" />}
          {added ? 'Added to cart' : 'Add to cart'}
        </Button>

        <Button
          variant="outline"
          size="lg"
          aria-pressed={wished}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggle(product)}
          className="px-4"
        >
          <Heart className={cn('size-5', wished && 'fill-current')} />
        </Button>
      </div>
    </div>
  );
}
