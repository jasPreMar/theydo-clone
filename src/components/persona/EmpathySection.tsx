import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  items: string[];
  color: string;
}

export function EmpathySection({ icon: Icon, title, items, color }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4" style={{ color }} />
        <h3 className="text-sm font-semibold" style={{ color }}>{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-xs leading-relaxed text-gray-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
