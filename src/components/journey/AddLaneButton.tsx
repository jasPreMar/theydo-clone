import { Plus } from 'lucide-react';
import { useState } from 'react';
import { db } from '../../db/database';

interface Props {
  journeyId: string;
  currentLaneCount: number;
}

const laneTypes = [
  { type: 'experience' as const, label: 'Experience Lane' },
  { type: 'insights' as const, label: 'Insights Lane' },
  { type: 'opportunities' as const, label: 'Opportunities Lane' },
  { type: 'solutions' as const, label: 'Solutions Lane' },
  { type: 'text' as const, label: 'Text Lane' },
];

export function AddLaneButton({ journeyId, currentLaneCount }: Props) {
  const [open, setOpen] = useState(false);

  const addLane = async (type: typeof laneTypes[number]['type'], label: string) => {
    await db.lanes.add({
      id: `lane-${Date.now()}`,
      journeyId,
      type,
      name: label,
      order: currentLaneCount,
    });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-xs text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Lane
      </button>
      {open && (
        <div className="absolute left-0 top-full z-10 mt-1 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {laneTypes.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => addLane(type, label.replace(' Lane', ''))}
              className="block w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
