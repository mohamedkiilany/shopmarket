import { useCartStore } from '@/store/useCartStore';
import { useHydrated } from './useHydrated';
import { FLAT_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '@/config/constants';

export function useCart() {
  const hydrated = useHydrated();
  const storedItems = useCartStore((s) => s.cart);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  const items = hydrated ? storedItems : [];
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  return {
    hydrated,
    items,
    subtotal,
    totalItems,
    shipping,
    tax,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
