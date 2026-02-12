import { useUIStore } from '../../store/uiStore';
import type { Insight, Opportunity } from '../../types';

const chipColors: Record<string, string> = {
  insight: 'bg-red-50 border-red-200 text-red-700',
  opportunity: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  solution: 'bg-blue-50 border-blue-200 text-blue-700',
  text: 'bg-gray-50 border-gray-200 text-gray-600',
};

interface Props {
  refType: string;
  data?: Insight | Opportunity | null;
  content?: string;
}

export function CardChip({ refType, data, content }: Props) {
  const openPanel = useUIStore((s) => s.openPanel);
  const colors = chipColors[refType] ?? chipColors.text;

  const title = data ? ('title' in data ? data.title : '') : content ?? '';
  const entityType = refType === 'insight' ? 'insight' : refType === 'opportunity' ? 'opportunity' : null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data && entityType) {
      openPanel(data.id, entityType);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full rounded border px-2 py-1 text-left text-xs transition-colors hover:brightness-95 ${colors}`}
    >
      <span className="line-clamp-2">{title}</span>
    </button>
  );
}
