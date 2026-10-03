import AccountSidebar from '@/components/account/AccountSidebar';

export default function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[16rem_1fr]">
      <AccountSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
