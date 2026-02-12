import { Star, Diamond } from 'lucide-react';
import type { Step } from '../../types';
import { useUIStore } from '../../store/uiStore';
import { db } from '../../db/database';
import { useState } from 'react';

interface Props {
  step: Step;
  phaseColor?: string;
}

export function StepCell({ step, phaseColor }: Props) {
  const openPanel = useUIStore((s) => s.openPanel);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(step.name);

  const save = async () => {
    setEditing(false);
    if (name.trim() && name !== step.name) {
      await db.steps.update(step.id, { name: name.trim() });
    } else {
      setName(step.name);
    }
  };

  return (
    <div
      className={`flex min-h-[56px] cursor-pointer items-center gap-2 border-b border-r border-gray-200 px-3 py-2 text-sm transition-colors hover:brightness-95 dark:border-gray-700 dark:hover:brightness-110 ${!phaseColor ? 'bg-white dark:bg-gray-800' : ''}`}
      style={phaseColor ? { backgroundColor: phaseColor + '15' } : undefined}
      onClick={() => openPanel(step.id, 'step')}
    >
      <Diamond className="h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-gray-500" />
      {editing ? (
        <input
          className="w-full rounded border border-indigo-300 bg-transparent px-1 py-0.5 text-sm focus:outline-none dark:border-indigo-600 dark:bg-gray-800 dark:text-gray-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === 'Enter' && save()}
          onClick={(e) => e.stopPropagation()}
          autoFocus
        />
      ) : (
        <span
          className="flex-1 leading-snug dark:text-gray-200"
          onDoubleClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
        >
          {step.name}
        </span>
      )}
      {step.momentOfTruth && (
        <span title="Moment of Truth">
          <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />
        </span>
      )}
    </div>
  );
}
