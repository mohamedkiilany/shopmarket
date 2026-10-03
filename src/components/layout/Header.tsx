'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Heart, Search, ShoppingCart, User } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

interface IconLinkProps {
  href: string;
  label: string;
  count?: number;
  children: React.ReactNode;
}

function IconLink({ href, label, count = 0, children }: IconLinkProps) {
  return (
    <Link href={href} aria-label={label} className="relative transition-all hover:opacity-80">
      {children}
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-[#FA8232] text-[11px] font-semibold text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
  };

  return (
    <header className="w-full">
      <div className="bg-[#0C548A] text-xs text-white sm:text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <p>{siteConfig.promo}</p>
          <p className="hidden md:block">Free shipping on orders over $200</p>
        </div>
      </div>

      <div className="bg-[#1B6392]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:flex-nowrap sm:gap-x-10">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-white">
            {siteConfig.name}
          </Link>

          <form
            role="search"
            onSubmit={onSubmit}
            className="relative order-last w-full sm:order-none sm:flex-1"
          >
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for anything..."
              className="h-11 w-full rounded-sm bg-white px-4 pr-11 text-sm text-[#191C1F] outline-none focus:ring-2 focus:ring-[#FA8232]"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[#191C1F]"
            >
              <Search className="size-5" />
            </button>
          </form>

          <nav aria-label="Account and cart" className="ml-auto flex items-center gap-5 text-white sm:ml-0">
            <IconLink href="/cart" label="Cart" count={totalItems}>
              <ShoppingCart className="size-6" />
            </IconLink>
            <IconLink href="/account" label="Wishlist" count={wishlistCount}>
              <Heart className="size-6" />
            </IconLink>
            <IconLink href="/login" label="Account">
              <User className="size-6" />
            </IconLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
