import { useWishlistStore } from '@/store/useWishlistStore';
import { useHydrated } from './useHydrated';

export function useWishlist() {
  const hydrated = useHydrated();
  const storedItems = useWishlistStore((s) => s.items);
  const toggle = useWishlistStore((s) => s.toggle);
  const remove = useWishlistStore((s) => s.remove);

  const items = hydrated ? storedItems : [];
  const isWishlisted = (productId: string): boolean => items.some((p) => p.id === productId);

  return { hydrated, items, count: items.length, toggle, remove, isWishlisted };
}
