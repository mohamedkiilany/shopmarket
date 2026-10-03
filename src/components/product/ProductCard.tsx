'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { Badge } from '@/components/common/Badge';
import { RatingStars } from '@/components/common/RatingStars';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/utils/cn';
import ProductPrice from './ProductPrice';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const actionClass =
  'flex size-10 items-center justify-center rounded-full bg-white text-[#191C1F] shadow transition-all hover:bg-[#FA8232] hover:text-white disabled:opacity-50';

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const soldOut = product.stockStatus === 'OUT_OF_STOCK';
  const wished = isWishlisted(product.id);

  return (
    <article className="group relative flex flex-col rounded-sm border border-[#E4E7E9] bg-white p-3 transition-all hover:shadow-lg">
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
        {product.discountBadgePercentage && (
          <Badge tone="info" className="bg-[#2DB224] text-white">
            {product.discountBadgePercentage}% off
          </Badge>
        )}
        {product.stockStatus === 'LOW_STOCK' && <Badge tone="warning">Low stock</Badge>}
        {soldOut && <Badge tone="danger">Sold out</Badge>}
      </div>

      <Link href={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-[#F2F4F5]">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          unoptimized
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={cn('object-cover transition-all', soldOut && 'opacity-50')}
        />
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center gap-2 bg-black/30 opacity-0 transition-all',
            'group-hover:opacity-100 group-focus-within:opacity-100'
          )}
        >
          <button
            type="button"
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wished}
            onClick={(e) => {
              e.preventDefault();
              toggle(product);
            }}
            className={cn(actionClass, wished && 'bg-[#FA8232] text-white')}
          >
            <Heart className={cn('size-5', wished && 'fill-current')} />
          </button>
          <button
            type="button"
            aria-label={`Add ${product.title} to cart`}
            disabled={soldOut}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1, product.colors?.[0]);
            }}
            className={actionClass}
          >
            <ShoppingCart className="size-5" />
          </button>
          {onQuickView && (
            <button
              type="button"
              aria-label={`Quick view ${product.title}`}
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className={actionClass}
            >
              <Eye className="size-5" />
            </button>
          )}
        </div>
      </Link>

      <div className="mt-3 flex flex-1 flex-col gap-1.5">
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <h3 className="line-clamp-2 text-sm text-[#191C1F]">
          <Link href={`/product/${product.id}`} className="hover:text-[#1B6392]">
            {product.title}
          </Link>
        </h3>
        <ProductPrice price={product.price} originalPrice={product.originalPrice} className="mt-auto pt-1" />
      </div>
    </article>
  );
}
