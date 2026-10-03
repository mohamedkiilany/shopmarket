import Link from 'next/link';
import { CATEGORIES } from '@/config/constants';

export default function CategoryBar() {
  return (
    <div className="border-b border-[#E4E7E9] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4">
        <nav aria-label="Categories" className="scrollbar-none flex gap-6 overflow-x-auto py-3 text-sm">
          <Link href="/shop" className="whitespace-nowrap font-semibold text-[#191C1F] hover:text-[#FA8232]">
            All products
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className="whitespace-nowrap text-[#5F6C72] transition-all hover:text-[#FA8232]"
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <div className="hidden gap-5 whitespace-nowrap text-sm text-[#5F6C72] md:flex">
          <Link href="/support" className="hover:text-[#FA8232]">
            Track order
          </Link>
          <Link href="/support" className="hover:text-[#FA8232]">
            Help center
          </Link>
        </div>
      </div>
    </div>
  );
}
