import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-[#5F6C72]">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="mt-6 inline-block font-medium text-[#1B6392] underline underline-offset-4">
        Go to the homepage
      </Link>
    </div>
  );
}
