import type { Lane, Step, LaneItem, Insight, Opportunity } from '../../types';
import { LaneCell } from './LaneCell';

interface Props {
  lane: Lane;
  steps: Step[];
  laneItems: LaneItem[];
  insightsMap: Map<string, Insight>;
  opportunitiesMap: Map<string, Opportunity>;
}

export function LaneRow({ lane, steps, laneItems, insightsMap, opportunitiesMap }: Props) {
  const itemsByStep = new Map<string, LaneItem[]>();
  for (const item of laneItems) {
    const arr = itemsByStep.get(item.stepId) ?? [];
    arr.push(item);
    itemsByStep.set(item.stepId, arr);
  }

  return (
    <>
      <div className="flex items-center border-b border-r border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
        {lane.name}
      </div>
      {steps.map((step) => (
        <LaneCell
          key={`${lane.id}-${step.id}`}
          items={itemsByStep.get(step.id) ?? []}
          insightsMap={insightsMap}
          opportunitiesMap={opportunitiesMap}
        />
      ))}
    </>
  );
}
