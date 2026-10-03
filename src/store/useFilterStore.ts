import { create } from 'zustand';
import type { ProductFilters, SortOption } from '@/types';

interface FilterState extends ProductFilters {
  setSearch: (value: string) => void;
  setCategory: (value: string | null) => void;
  toggleBrand: (brand: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setMinRating: (value: number) => void;
  setSort: (value: SortOption) => void;
  reset: () => void;
}

const initialFilters: ProductFilters = {
  search: '',
  category: null,
  brands: [],
  minPrice: null,
  maxPrice: null,
  minRating: 0,
  sort: 'popular',
};

export const useFilterStore = create<FilterState>()((set, get) => ({
  ...initialFilters,
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  toggleBrand: (brand) => {
    const brands = get().brands;
    set({
      brands: brands.includes(brand) ? brands.filter((b) => b !== brand) : [...brands, brand],
    });
  },
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  setMinRating: (minRating) => set({ minRating }),
  setSort: (sort) => set({ sort }),
  reset: () => set({ ...initialFilters }),
}));
