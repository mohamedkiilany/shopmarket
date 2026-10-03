import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductGrid from '@/components/product/ProductGrid';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import { getAllProductIds, getProductById, getRelatedProducts } from '@/services/productService';

interface PageProps {
  params: { id: string };
}

export function generateStaticParams(): { id: string }[] {
  return getAllProductIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductById(params.id);
  return { title: product?.title ?? 'Product not found', description: product?.shortDescription };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductById(params.id);
  if (!product) notFound();
  const related = await getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-[#5F6C72]">
        <Link href="/" className="hover:text-[#1B6392]">Home</Link> /{' '}
        <Link href={`/shop?category=${product.category}`} className="capitalize hover:text-[#1B6392]">
          {product.category}
        </Link>{' '}
        / <span className="text-[#191C1F]">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />

      {related.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-semibold">Related products</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
