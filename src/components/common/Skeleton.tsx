import { cn } from '@/utils/cn';

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-sm bg-[#E4E7E9]', className)} aria-hidden />;
}

export default Skeleton;
