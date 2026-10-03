export type StockStatus = 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK';

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountBadgePercentage?: number;
  rating: number;
  reviewCount: number;
  sku: string;
  stockStatus: StockStatus;
  images: string[];
  thumbnail: string;
  shortDescription: string;
  fullDescription: string;
  specifications: Record<string, string>;
  colors?: string[];
  tags?: string[];
  isFeatured?: boolean;
}

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export interface ProductFilters {
  search: string;
  category: string | null;
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number;
  sort: SortOption;
}
