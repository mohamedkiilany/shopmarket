'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/common/Button';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterBanner() {
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'error' | 'done'>('idle');

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('done');
    setEmail('');
  };

  return (
    <section className="bg-[#1B6392]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-12 text-center text-white">
        <h2 className="text-2xl font-bold sm:text-3xl">Subscribe to our newsletter</h2>
        <p className="max-w-lg text-sm text-white/80">
          Get new arrivals and exclusive deals in your inbox. No spam, unsubscribe any time.
        </p>
        <form onSubmit={onSubmit} noValidate className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus('idle');
            }}
            placeholder="Your email address"
            className="h-12 flex-1 rounded-sm px-4 text-sm text-[#191C1F] outline-none focus:ring-2 focus:ring-[#FA8232]"
          />
          <Button type="submit" size="lg">
            Subscribe
          </Button>
        </form>
        <p role="status" className="min-h-5 text-sm">
          {status === 'error' && 'Enter a valid email address.'}
          {status === 'done' && 'You are subscribed. Check your inbox to confirm.'}
        </p>
      </div>
    </section>
  );
}
