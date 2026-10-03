import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/formatCurrency';

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

export default function ProductPrice({ price, originalPrice, className }: ProductPriceProps) {
  return (
    <p className={cn('flex items-baseline gap-2', className)}>
      <span className="font-semibold text-[#1B6392]">{formatCurrency(price)}</span>
      {originalPrice && (
        <span className="text-sm text-[#929FA5] line-through">{formatCurrency(originalPrice)}</span>
      )}
    </p>
  );
}
