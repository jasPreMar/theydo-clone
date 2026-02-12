import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { Star, StarOff } from 'lucide-react';
import { useState, useEffect } from 'react';

function scoreToColor(score: number): string {
  const s = Math.max(-2, Math.min(2, score));
  const hue = ((s + 2) / 4) * 120;
  return `hsl(${hue}, 70%, 85%)`;
}

export function StepPanel({ id }: { id: string }) {
  const step = useLiveQuery(() => db.steps.get(id), [id]);
  const [name, setName] = useState('');

  useEffect(() => {
    if (step) setName(step.name);
  }, [step]);

  if (!step) return null;

  const saveName = async () => {
    if (name.trim() && name !== step.name) {
      await db.steps.update(id, { name: name.trim() });
    }
  };

  const toggleMoT = async () => {
    await db.steps.update(id, { momentOfTruth: !step.momentOfTruth });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Step Name</label>
        <input
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={saveName}
        />
      </div>

      <button
        onClick={toggleMoT}
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
          step.momentOfTruth
            ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
            : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
        }`}
      >
        {step.momentOfTruth ? (
          <Star className="h-4 w-4 fill-amber-400 text-amber-400 dark:fill-amber-500 dark:text-amber-500" />
        ) : (
          <StarOff className="h-4 w-4" />
        )}
        {step.momentOfTruth ? 'Moment of Truth' : 'Mark as Moment of Truth'}
      </button>

      {step.touchpoints && step.touchpoints.length > 0 && (
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Touchpoints</label>
          <div className="flex flex-wrap gap-1.5">
            {step.touchpoints.map((tp, i) => (
              <span key={i} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                {tp}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Experience Score</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={-2}
            max={2}
            step={0.5}
            value={step.experienceScore ?? 0}
            onChange={(e) => db.steps.update(id, { experienceScore: parseFloat(e.target.value) })}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-500 dark:bg-gray-600"
          />
          <div
            className="flex h-8 w-14 items-center justify-center rounded-md text-xs font-semibold"
            style={{ backgroundColor: scoreToColor(step.experienceScore ?? 0) }}
          >
            {(step.experienceScore ?? 0) > 0 ? '+' : ''}
            {(step.experienceScore ?? 0).toFixed(1)}
          </div>
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
          <span>-2.0</span>
          <span>0</span>
          <span>+2.0</span>
        </div>
      </div>
    </div>
  );
}
