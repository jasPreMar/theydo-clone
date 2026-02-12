import type { Lane, Step, LaneItem, Insight, Opportunity } from '../../types';
import { LaneCell } from './LaneCell';
import { X } from 'lucide-react';
import { db } from '../../db/database';

interface Props {
  lane: Lane;
  steps: Step[];
  laneItems: LaneItem[];
  insightsMap: Map<string, Insight>;
  opportunitiesMap: Map<string, Opportunity>;
  stepPhaseColors: Map<string, string>;
}

export function LaneRow({ lane, steps, laneItems, insightsMap, opportunitiesMap, stepPhaseColors }: Props) {
  const itemsByStep = new Map<string, LaneItem[]>();
  for (const item of laneItems) {
    const arr = itemsByStep.get(item.stepId) ?? [];
    arr.push(item);
    itemsByStep.set(item.stepId, arr);
  }

  const deleteLane = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await db.transaction('rw', [db.lanes, db.laneItems], async () => {
      await db.laneItems.where('laneId').equals(lane.id).delete();
      await db.lanes.delete(lane.id);
    });
  };

  return (
    <>
      <div className="group flex items-center border-b border-r border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        <span className="flex-1">{lane.name}</span>
        <button
          onClick={deleteLane}
          className="ml-1 hidden rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 group-hover:block dark:hover:bg-gray-600 dark:hover:text-gray-300"
          title="Delete lane"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      {steps.map((step) => (
        <LaneCell
          key={`${lane.id}-${step.id}`}
          items={itemsByStep.get(step.id) ?? []}
          insightsMap={insightsMap}
          opportunitiesMap={opportunitiesMap}
          phaseColor={stepPhaseColors.get(step.id)}
        />
      ))}
    </>
  );
}
