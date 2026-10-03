'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LogOut, Package, Settings } from 'lucide-react';
import { cn } from '@/utils/cn';

const links = [
  { href: '/account', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account/orders', label: 'Order history', icon: Package },
  { href: '/account/settings', label: 'Settings', icon: Settings },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Account" className="rounded-sm border border-[#E4E7E9] py-2">
      <ul>
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 px-5 py-3 text-sm transition-all',
                  active ? 'bg-[#FA8232] text-white' : 'text-[#5F6C72] hover:bg-[#F2F4F5]'
                )}
              >
                <Icon className="size-5" /> {label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link href="/login" className="flex items-center gap-3 px-5 py-3 text-sm text-[#5F6C72] hover:bg-[#F2F4F5]">
            <LogOut className="size-5" /> Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
}
