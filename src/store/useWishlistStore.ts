import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';
import { WISHLIST_STORAGE_KEY } from '@/config/constants';

interface WishlistState {
  items: Product[];
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        set({
          items: exists
            ? get().items.filter((p) => p.id !== product.id)
            : [...get().items, product],
        });
      },
      remove: (productId) => set({ items: get().items.filter((p) => p.id !== productId) }),
      clear: () => set({ items: [] }),
    }),
    { name: WISHLIST_STORAGE_KEY }
  )
);
