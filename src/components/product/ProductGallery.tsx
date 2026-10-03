'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/utils/cn';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [active, setActive] = useState<number>(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[#E4E7E9] bg-[#F2F4F5]">
        <Image
          src={images[active]}
          alt={`${title}, image ${active + 1}`}
          fill
          unoptimized
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <ul className="grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <li key={src + i}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                'relative block aspect-square w-full overflow-hidden rounded-sm border-2 bg-[#F2F4F5] transition-all',
                i === active ? 'border-[#FA8232]' : 'border-[#E4E7E9] hover:border-[#929FA5]'
              )}
            >
              <Image src={src} alt="" fill unoptimized sizes="100px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
