import type { LaneItem, Insight, Opportunity } from '../../types';
import { CardChip } from './CardChip';

interface Props {
  items: LaneItem[];
  insightsMap: Map<string, Insight>;
  opportunitiesMap: Map<string, Opportunity>;
  phaseColor?: string;
}

export function LaneCell({ items, insightsMap, opportunitiesMap, phaseColor }: Props) {
  return (
    <div
      className="flex min-h-[80px] flex-col gap-2 border-b border-r border-gray-200 p-2 dark:border-gray-700"
      style={{ backgroundColor: phaseColor ? phaseColor + '12' : undefined }}
    >
      {items.map((item) => {
        if (item.refType === 'text') {
          return <CardChip key={item.id} refType="text" content={item.content} itemId={item.id} />;
        }
        if (item.refType === 'insight' && item.refId) {
          return <CardChip key={item.id} refType="insight" data={insightsMap.get(item.refId)} />;
        }
        if (item.refType === 'opportunity' && item.refId) {
          return <CardChip key={item.id} refType="opportunity" data={opportunitiesMap.get(item.refId)} />;
        }
        return null;
      })}
    </div>
  );
}
