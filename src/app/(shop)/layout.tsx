import NewsletterBanner from '@/components/layout/NewsletterBanner';

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <NewsletterBanner />
    </>
  );
}
