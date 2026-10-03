import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">We could not find that product</h1>
      <p className="mt-2 text-[#5F6C72]">It may have been removed or the link is incorrect.</p>
      <Link href="/shop" className="mt-6 inline-block font-medium text-[#1B6392] underline underline-offset-4">
        Back to the shop
      </Link>
    </div>
  );
}
