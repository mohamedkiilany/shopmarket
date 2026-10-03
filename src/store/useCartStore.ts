import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartStore, Product } from '@/types';
import { CART_STORAGE_KEY } from '@/config/constants';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product: Product, quantity = 1, selectedColor) => {
        const currentCart = get().cart;
        const existingIndex = currentCart.findIndex(
          (item) => item.product.id === product.id && item.selectedColor === selectedColor
        );

        if (existingIndex > -1) {
          set({
            cart: currentCart.map((item, i) =>
              i === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
            ),
          });
        } else {
          set({ cart: [...currentCart, { product, quantity, selectedColor }] });
        }
      },
      removeFromCart: (productId, color) => {
        set({
          cart: get().cart.filter(
            (item) => !(item.product.id === productId && item.selectedColor === color)
          ),
        });
      },
      updateQuantity: (productId, quantity, color) => {
        if (quantity < 1) {
          get().removeFromCart(productId, color);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.product.id === productId && item.selectedColor === color
              ? { ...item, quantity }
              : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      subtotal: () =>
        get().cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
      totalItems: () => get().cart.reduce((total, item) => total + item.quantity, 0),
    }),
    { name: CART_STORAGE_KEY }
  )
);
