import { Plus } from 'lucide-react';
import type { LaneItem, Insight, Opportunity } from '../../types';
import { CardChip } from './CardChip';
import { db } from '../../db/database';

interface Props {
  items: LaneItem[];
  insightsMap: Map<string, Insight>;
  opportunitiesMap: Map<string, Opportunity>;
  phaseColor?: string;
  laneId: string;
  stepId: string;
  laneType: string;
}

export function LaneCell({ items, insightsMap, opportunitiesMap, phaseColor, laneId, stepId, laneType }: Props) {
  const addCard = async () => {
    await db.laneItems.add({
      id: crypto.randomUUID(),
      laneId,
      stepId,
      refType: 'text',
      content: '',
    });
  };

  const deleteCard = (itemId: string) => async () => {
    await db.laneItems.delete(itemId);
  };

  return (
    <div
      className="group/cell flex min-h-[80px] flex-col gap-2 border-b border-r border-gray-200 p-2 dark:border-gray-700"
      style={{ backgroundColor: phaseColor ? phaseColor + '12' : undefined }}
    >
      {items.map((item) => {
        if (item.refType === 'text') {
          return (
            <CardChip
              key={item.id}
              refType="text"
              content={item.content}
              itemId={item.id}
              onDelete={deleteCard(item.id)}
            />
          );
        }
        if (item.refType === 'insight' && item.refId) {
          return <CardChip key={item.id} refType="insight" data={insightsMap.get(item.refId)} />;
        }
        if (item.refType === 'opportunity' && item.refId) {
          return <CardChip key={item.id} refType="opportunity" data={opportunitiesMap.get(item.refId)} />;
        }
        return null;
      })}
      {laneType === 'text' && (
        <button
          onClick={addCard}
          className="flex h-7 w-7 items-center justify-center self-center rounded-md text-gray-400 opacity-0 transition-opacity hover:bg-gray-200 hover:text-gray-600 group-hover/cell:opacity-100 dark:hover:bg-gray-600 dark:hover:text-gray-300"
          title="Add touchpoint"
        >
          <Plus className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
