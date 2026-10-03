import type { SortOption } from '@/types';

export interface CategoryItem {
  name: string;
  slug: string;
}

export const CATEGORIES: CategoryItem[] = [
  { name: 'Phones', slug: 'phones' },
  { name: 'Laptops', slug: 'laptops' },
  { name: 'Cameras', slug: 'cameras' },
  { name: 'Headphones', slug: 'headphones' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'Accessories', slug: 'accessories' },
];

export const BRANDS: string[] = ['Nova', 'Volt', 'Axiom', 'Kestrel', 'Lumen', 'Orbit'];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Most popular' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
];

export const PRICE_RANGES: { label: string; min: number | null; max: number | null }[] = [
  { label: 'All prices', min: null, max: null },
  { label: 'Under $100', min: null, max: 100 },
  { label: '$100 to $500', min: 100, max: 500 },
  { label: '$500 to $1,000', min: 500, max: 1000 },
  { label: 'Over $1,000', min: 1000, max: null },
];

export const FREE_SHIPPING_THRESHOLD = 200;
export const FLAT_SHIPPING_FEE = 15;
export const TAX_RATE = 0.08;
export const CART_STORAGE_KEY = 'clicon-cart-storage';
export const WISHLIST_STORAGE_KEY = 'clicon-wishlist-storage';
