import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-sm border border-[#E4E7E9] p-5">
      <div className="flex size-12 items-center justify-center rounded-sm bg-[#1B6392]/10 text-[#1B6392]">
        <Icon className="size-6" />
      </div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-sm text-[#5F6C72]">{label}</p>
      </div>
    </div>
  );
}
