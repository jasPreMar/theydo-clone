import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { Star, StarOff } from 'lucide-react';
import { useState, useEffect } from 'react';

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
        <label className="mb-1 block text-xs font-medium text-gray-500">Step Name</label>
        <input
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={saveName}
        />
      </div>

      <button
        onClick={toggleMoT}
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
          step.momentOfTruth
            ? 'border-amber-200 bg-amber-50 text-amber-700'
            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
        }`}
      >
        {step.momentOfTruth ? (
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        ) : (
          <StarOff className="h-4 w-4" />
        )}
        {step.momentOfTruth ? 'Moment of Truth' : 'Mark as Moment of Truth'}
      </button>

      {step.touchpoints && step.touchpoints.length > 0 && (
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Touchpoints</label>
          <div className="flex flex-wrap gap-1.5">
            {step.touchpoints.map((tp, i) => (
              <span key={i} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
                {tp}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
