import type { Metadata } from 'next';
import TrackOrderForm from '@/components/support/TrackOrderForm';
import { siteConfig } from '@/config/siteConfig';

export const metadata: Metadata = { title: 'Help center' };

const faqs: { q: string; a: string }[] = [
  { q: 'How long does delivery take?', a: 'Most orders arrive in 3 to 5 business days. You get a tracking update at each step.' },
  { q: 'Can I return a product?', a: 'Yes. Return any unused item within 30 days for a full refund.' },
  { q: 'Which payment methods do you accept?', a: 'Credit and debit cards, and cash on delivery in supported areas.' },
  { q: 'How do I change or cancel an order?', a: 'Contact support within one hour of ordering and we will update it before it ships.' },
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-4 py-10">
      <header>
        <h1 className="text-3xl font-semibold">Help center</h1>
        <p className="mt-2 text-[#5F6C72]">
          Track an order or find answers below. Still stuck? Email {siteConfig.supportEmail} or call{' '}
          {siteConfig.supportPhone}.
        </p>
      </header>

      <section className="rounded-sm border border-[#E4E7E9] p-6">
        <h2 className="mb-4 text-xl font-semibold">Track your order</h2>
        <TrackOrderForm />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Frequently asked questions</h2>
        <div className="divide-y divide-[#E4E7E9] rounded-sm border border-[#E4E7E9]">
          {faqs.map((f) => (
            <details key={f.q} className="group p-4">
              <summary className="cursor-pointer text-sm font-medium marker:text-[#FA8232]">{f.q}</summary>
              <p className="mt-2 text-sm text-[#5F6C72]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
