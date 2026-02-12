import { useParams } from 'react-router-dom';
import { useInsights, useOpportunities, useSolutions } from '../../hooks/useDB';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import { useUIStore } from '../../store/uiStore';
import { useState } from 'react';
import { Search } from 'lucide-react';

export function LibraryView() {
  const { type = 'insights' } = useParams<{ type: string }>();
  const insights = useInsights();
  const opportunities = useOpportunities();
  const solutions = useSolutions();
  const openPanel = useUIStore((s) => s.openPanel);
  const [filter, setFilter] = useState('');

  const items = type === 'insights' ? insights : type === 'opportunities' ? opportunities : solutions;
  const entityType = type === 'insights' ? 'insight' as const : type === 'opportunities' ? 'opportunity' as const : 'solution' as const;

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase()) ||
    item.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={`Search ${type}...`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-300"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState message={`No ${type} found`} />
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Title</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Description</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => openPanel(item.id, entityType)}
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="max-w-md px-4 py-3 text-xs text-gray-500">
                    <span className="line-clamp-1">{item.description}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
