'use client';

import Link from 'next/link';
import type { Product } from '@/types';
import { Modal } from '@/components/common/Modal';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  return (
    <Modal open={product !== null} onClose={onClose} title="Product quick view">
      {product && (
        <div className="grid gap-6 pt-4 md:grid-cols-2">
          <ProductGallery images={product.images} title={product.title} />
          <div className="space-y-4">
            <ProductInfo product={product} compact />
            <Link
              href={`/product/${product.id}`}
              onClick={onClose}
              className="inline-block text-sm font-medium text-[#1B6392] underline underline-offset-4"
            >
              View full details
            </Link>
          </div>
        </div>
      )}
    </Modal>
  );
}
