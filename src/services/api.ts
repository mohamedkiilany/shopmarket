import axios from 'axios';

/**
 * Axios instance for the real backend. The services in this folder currently
 * return mock data; swap them to `api.get(...)` when your API is ready.
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

export function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
