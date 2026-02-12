import { useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { useJourney, usePhases, useSteps, useLanes } from '../../hooks/useDB';
import { PhaseHeader } from './PhaseHeader';
import { StepCell } from './StepCell';
import { LaneRow } from './LaneRow';
import { AddLaneButton } from './AddLaneButton';
import { EmptyState } from '../common/EmptyState';
import type { Phase, Insight, Opportunity, LaneItem } from '../../types';

export function JourneyEditor() {
  const { id } = useParams<{ id: string }>();
  const journey = useJourney(id);
  const phases = usePhases(id);
  const allSteps = useSteps(id);
  const lanes = useLanes(id);

  const laneIds = lanes.map((l) => l.id);
  const laneItems = useLiveQuery(
    () => laneIds.length > 0 ? db.laneItems.where('laneId').anyOf(laneIds).toArray() : [],
    [laneIds.join(',')]
  ) ?? [] as LaneItem[];

  const insights = useLiveQuery(() => db.insights.toArray()) ?? [] as Insight[];
  const opportunities = useLiveQuery(() => db.opportunities.toArray()) ?? [] as Opportunity[];

  if (!journey) return <EmptyState message="Journey not found" />;

  // Group steps by phase
  const stepsByPhase = new Map<string, typeof allSteps>();
  for (const step of allSteps) {
    const arr = stepsByPhase.get(step.phaseId) ?? [];
    arr.push(step);
    stepsByPhase.set(step.phaseId, arr);
  }

  // Ordered flat list of all steps across all phases
  const orderedSteps = phases.flatMap((p) => {
    const steps = stepsByPhase.get(p.id) ?? [];
    return steps.sort((a, b) => a.order - b.order);
  });

  const totalSteps = orderedSteps.length;
  if (totalSteps === 0) return <EmptyState message="No steps in this journey" />;

  // Build lookup maps
  const insightsMap = new Map(insights.map((i: Insight) => [i.id, i]));
  const opportunitiesMap = new Map(opportunities.map((o: Opportunity) => [o.id, o]));

  // Lane items grouped by lane
  const itemsByLane = new Map<string, LaneItem[]>();
  for (const item of laneItems) {
    const arr = itemsByLane.get(item.laneId) ?? [];
    arr.push(item);
    itemsByLane.set(item.laneId, arr);
  }

  const gridCols = `200px repeat(${totalSteps}, minmax(140px, 1fr))`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{journey.description}</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <div style={{ display: 'grid', gridTemplateColumns: gridCols }} className="min-w-fit">
          {/* Phase headers row */}
          <div className="border-b border-r border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-500">
            Phase
          </div>
          {phases.map((phase: Phase) => {
            const count = (stepsByPhase.get(phase.id) ?? []).length;
            return count > 0 ? (
              <PhaseHeader key={phase.id} phase={phase} stepCount={count} />
            ) : null;
          })}

          {/* Steps row */}
          <div className="border-b border-r border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-500">
            Steps
          </div>
          {orderedSteps.map((step) => (
            <StepCell key={step.id} step={step} />
          ))}

          {/* Lane rows */}
          {lanes.map((lane) => (
            <LaneRow
              key={lane.id}
              lane={lane}
              steps={orderedSteps}
              laneItems={itemsByLane.get(lane.id) ?? []}
              insightsMap={insightsMap}
              opportunitiesMap={opportunitiesMap}
            />
          ))}
        </div>
      </div>

      <AddLaneButton journeyId={journey.id} currentLaneCount={lanes.length} />
    </div>
  );
}
