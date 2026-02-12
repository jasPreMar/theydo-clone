import type { Lane, Step } from '../../types';
import { useUIStore } from '../../store/uiStore';
import { X } from 'lucide-react';
import { db } from '../../db/database';

interface Props {
  lane: Lane;
  steps: Step[];
}

function scoreToColor(score: number): string {
  // Clamp to [-2, 2]
  const s = Math.max(-2, Math.min(2, score));
  // Map -2..+2 to hue 0 (red) → 60 (yellow) → 120 (green)
  const hue = ((s + 2) / 4) * 120;
  return `hsl(${hue}, 70%, 85%)`;
}

function formatScore(score: number): string {
  const s = Math.max(-2, Math.min(2, score));
  return (s > 0 ? '+' : '') + s.toFixed(1);
}

export function ExperienceLaneRow({ lane, steps }: Props) {
  const openPanel = useUIStore((s) => s.openPanel);

  const deleteLane = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await db.lanes.delete(lane.id);
  };

  return (
    <>
      <div className="group flex items-center border-b border-r border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
        <span className="flex-1">{lane.name}</span>
        <button
          onClick={deleteLane}
          className="ml-1 hidden rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 group-hover:block"
          title="Delete lane"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      {steps.map((step) => {
        const score = step.experienceScore ?? 0;
        return (
          <div
            key={`${lane.id}-${step.id}`}
            className="flex min-h-[48px] cursor-pointer items-center justify-center border-b border-r border-gray-200 px-2 py-1.5 text-xs font-semibold transition-colors hover:opacity-80"
            style={{ backgroundColor: scoreToColor(score) }}
            onClick={() => openPanel(step.id, 'step')}
            title={`${step.name}: ${formatScore(score)}`}
          >
            {formatScore(score)}
          </div>
        );
      })}
    </>
  );
}
