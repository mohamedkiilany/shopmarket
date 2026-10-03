import type { Product, ProductFilters } from '@/types';
import { products } from './mockData';
import { delay } from './api';

export async function getProducts(filters?: Partial<ProductFilters>): Promise<Product[]> {
  await delay(300);
  const f = filters ?? {};
  const term = f.search?.trim().toLowerCase();

  const result = products.filter((p) => {
    if (term && !`${p.title} ${p.brand} ${p.category}`.toLowerCase().includes(term)) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.brands?.length && !f.brands.includes(p.brand)) return false;
    if (f.minPrice != null && p.price < f.minPrice) return false;
    if (f.maxPrice != null && p.price > f.maxPrice) return false;
    if (f.minRating && p.rating < f.minRating) return false;
    return true;
  });

  switch (f.sort) {
    case 'price-asc':
      return result.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return result.sort((a, b) => b.price - a.price);
    case 'rating':
      return result.sort((a, b) => b.rating - a.rating);
    default:
      return result.sort((a, b) => b.reviewCount - a.reviewCount);
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  return products.find((p) => p.id === id) ?? null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return products.filter((p) => p.isFeatured).slice(0, limit);
}

export async function getBestSellers(limit = 8): Promise<Product[]> {
  return [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function getAllProductIds(): string[] {
  return products.map((p) => p.id);
}
