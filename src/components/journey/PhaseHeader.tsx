import { Plus } from 'lucide-react';
import type { Phase } from '../../types';
import { db } from '../../db/database';

interface Props {
  phase: Phase;
  stepCount: number;
}

export function PhaseHeader({ phase, stepCount }: Props) {
  const addStep = async () => {
    const maxOrder = await db.steps
      .where('phaseId')
      .equals(phase.id)
      .toArray()
      .then((steps) => Math.max(0, ...steps.map((s) => s.order)));

    await db.steps.add({
      id: `step-${Date.now()}`,
      phaseId: phase.id,
      journeyId: phase.journeyId,
      name: 'New Step',
      order: maxOrder + 1,
      momentOfTruth: false,
    });
  };

  return (
    <div
      className="flex items-center justify-between rounded-t-lg px-3 py-2"
      style={{
        gridColumn: `span ${stepCount}`,
        backgroundColor: phase.color + '22',
        borderBottom: `3px solid ${phase.color}`,
      }}
    >
      <span className="text-xs font-semibold" style={{ color: phase.color }}>
        {phase.name}
      </span>
      <button
        onClick={addStep}
        className="rounded p-0.5 opacity-0 transition-opacity hover:bg-white/50 group-hover:opacity-100"
        style={{ color: phase.color }}
        title="Add step"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
