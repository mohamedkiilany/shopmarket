import { Star } from 'lucide-react';
import { cn } from '@/utils/cn';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function RatingStars({ rating, reviewCount, size = 'sm', className }: RatingStarsProps) {
  const dim = size === 'sm' ? 'size-3.5' : 'size-4';
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex" role="img" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={cn(
              dim,
              n <= Math.round(rating) ? 'fill-[#FA8232] text-[#FA8232]' : 'fill-[#E4E7E9] text-[#E4E7E9]'
            )}
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-[#5F6C72]">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}

export default RatingStars;
