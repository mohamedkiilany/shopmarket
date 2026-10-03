import Link from 'next/link';
import { CATEGORIES } from '@/config/constants';
import { siteConfig } from '@/config/siteConfig';

const quickLinks: { label: string; href: string }[] = [
  { label: 'Shop all products', href: '/shop' },
  { label: 'Shopping cart', href: '/cart' },
  { label: 'Track order', href: '/support' },
  { label: 'Help center', href: '/support' },
  { label: 'My account', href: '/account' },
];

const tags: string[] = ['Game', 'Laptop', 'Headphone', 'Camera', 'Phone', 'Wireless', 'Gaming', 'Watch'];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase text-white">{title}</h3>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#191C1F] text-sm text-[#929FA5]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="text-2xl font-extrabold text-white">{siteConfig.name}</p>
          <p>Customer support</p>
          <p className="text-lg font-semibold text-white">{siteConfig.supportPhone}</p>
          <p>{siteConfig.address}</p>
          <p>{siteConfig.supportEmail}</p>
        </div>

        <Column title="Top category">
          <ul className="space-y-2.5">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className="transition-all hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Quick links">
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition-all hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Popular tags">
          <ul className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <li key={t}>
                <Link
                  href={`/shop?q=${t.toLowerCase()}`}
                  className="inline-block rounded-sm border border-[#303639] px-3 py-1.5 transition-all hover:border-[#FA8232] hover:text-white"
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </Column>
      </div>
      <div className="border-t border-[#303639] py-5 text-center text-xs">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
