import type { CartItem } from './cart';
import type { Address } from './user';

export type OrderStatus = 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentMethod = 'CARD' | 'COD';

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
}

export interface TrackingStep {
  label: string;
  done: boolean;
}

export interface TrackingResult {
  orderId: string;
  status: OrderStatus;
  steps: TrackingStep[];
}

export interface PlaceOrderPayload {
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
}
