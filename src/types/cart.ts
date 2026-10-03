import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string) => void;
  clearCart: () => void;
  subtotal: () => number;
  totalItems: () => number;
}
