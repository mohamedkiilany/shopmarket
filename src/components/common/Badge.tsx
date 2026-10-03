import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Tone = 'sale' | 'success' | 'warning' | 'danger' | 'neutral' | 'info';

const tones: Record<Tone, string> = {
  sale: 'bg-[#FA8232] text-white',
  success: 'bg-[#2DB224]/10 text-[#2DB224]',
  warning: 'bg-[#F3A93C]/15 text-[#B7791F]',
  danger: 'bg-red-100 text-red-600',
  neutral: 'bg-[#F2F4F5] text-[#5F6C72]',
  info: 'bg-[#1B6392]/10 text-[#1B6392]',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold',
        tones[tone],
        className
      )}
      {...props}
    />
  );
}

export default Badge;
