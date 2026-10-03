import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Headphones, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import { BRANDS, CATEGORIES } from '@/config/constants';
import { getBestSellers, getFeaturedProducts } from '@/services/productService';

const perks = [
  { icon: Truck, title: 'Free shipping', text: 'On orders over $200' },
  { icon: PackageCheck, title: '30-day returns', text: 'Money back, no questions' },
  { icon: ShieldCheck, title: 'Secure payment', text: '100% protected checkout' },
  { icon: Headphones, title: 'Support 24/7', text: 'Call or chat any time' },
];

export default async function HomePage() {
  const [featured, bestSellers] = await Promise.all([getFeaturedProducts(4), getBestSellers(8)]);

  return (
    <>
      <section className="bg-[#F2F4F5]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 lg:py-20">
          <div className="space-y-5">
            <p className="text-sm font-semibold text-[#1B6392]">New season, new tech</p>
            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
              Latest electronics at prices that make sense
            </h1>
            <p className="max-w-md text-[#5F6C72]">
              Phones, laptops, cameras and gaming gear, shipped fast with free returns.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-sm bg-[#FA8232] px-8 py-3.5 font-semibold text-white transition-all hover:bg-opacity-90"
            >
              Shop now <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src="/assets/banners/hero.svg"
              alt="Phone and laptop on a light background"
              fill
              unoptimized
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-label="Store benefits" className="border-b border-[#E4E7E9]">
        <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-4">
              <Icon className="size-9 shrink-0 text-[#1B6392]" />
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm text-[#5F6C72]">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-semibold">Shop by category</h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/shop?category=${c.slug}`}
                className="flex h-28 items-center justify-center rounded-sm border border-[#E4E7E9] text-sm font-medium transition-all hover:border-[#FA8232] hover:shadow-md"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured products</h2>
          <Link href="/shop" className="text-sm font-medium text-[#1B6392] hover:underline">
            Browse all
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/shop?category=gaming"
            className="rounded-md bg-[#191C1F] p-8 text-white transition-all hover:opacity-95"
          >
            <p className="text-sm text-[#F3A93C]">Gaming</p>
            <p className="mt-2 text-2xl font-bold">Consoles and controllers</p>
            <p className="mt-2 text-sm text-white/70">Play at 4K and up to 120fps.</p>
          </Link>
          <Link
            href="/shop?category=headphones"
            className="rounded-md bg-[#FA8232] p-8 text-white transition-all hover:opacity-95"
          >
            <p className="text-sm text-white/80">Up to 20% off</p>
            <p className="mt-2 text-2xl font-bold">Noise-cancelling headphones</p>
            <p className="mt-2 text-sm text-white/80">40 hours of playback on one charge.</p>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="mb-6 text-2xl font-semibold">Best sellers</h2>
        <ProductGrid products={bestSellers} />
      </section>

      <section aria-label="Brands" className="border-t border-[#E4E7E9]">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 py-10">
          {BRANDS.map((b) => (
            <li key={b} className="text-xl font-bold text-[#929FA5]">
              {b}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
