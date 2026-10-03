import type { Order, PlaceOrderPayload, TrackingResult } from '@/types';
import { products } from './mockData';
import { delay } from './api';

const sampleOrders: Order[] = [
  {
    id: 'CLC-84921',
    createdAt: '2026-09-18T10:24:00Z',
    status: 'DELIVERED',
    items: [{ product: products[6], quantity: 1 }],
    total: 301.32,
    paymentMethod: 'CARD',
    shippingAddress: { line1: '12 Nile St', city: 'Ismailia', zip: '41511', country: 'Egypt' },
  },
  {
    id: 'CLC-85377',
    createdAt: '2026-09-27T16:02:00Z',
    status: 'SHIPPED',
    items: [
      { product: products[0], quantity: 1, selectedColor: '#1B6392' },
      { product: products[11], quantity: 2 },
    ],
    total: 856.44,
    paymentMethod: 'COD',
    shippingAddress: { line1: '12 Nile St', city: 'Ismailia', zip: '41511', country: 'Egypt' },
  },
];

export async function getOrders(): Promise<Order[]> {
  await delay(300);
  return sampleOrders;
}

export async function placeOrder(payload: PlaceOrderPayload): Promise<Order> {
  await delay(700);
  return {
    ...payload,
    id: `CLC-${Math.floor(10000 + Math.random() * 89999)}`,
    createdAt: new Date().toISOString(),
    status: 'PROCESSING',
  };
}

export async function trackOrder(orderId: string): Promise<TrackingResult | null> {
  await delay(500);
  const order = sampleOrders.find((o) => o.id.toLowerCase() === orderId.trim().toLowerCase());
  if (!order) return null;

  const reached = { PROCESSING: 1, SHIPPED: 3, DELIVERED: 4, CANCELLED: 1 }[order.status];
  const labels = ['Order placed', 'Packed', 'Out for delivery', 'Delivered'];
  return {
    orderId: order.id,
    status: order.status,
    steps: labels.map((label, i) => ({ label, done: i < reached })),
  };
}
