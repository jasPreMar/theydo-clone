import { useNavigate } from 'react-router-dom';
import { useJourneys } from '../../hooks/useDB';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import { Map } from 'lucide-react';

export function JourneyList() {
  const journeys = useJourneys();
  const navigate = useNavigate();

  if (journeys.length === 0) {
    return <EmptyState message="No journeys yet" />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {journeys.map((j) => (
        <button
          key={j.id}
          onClick={() => navigate(`/journey/${j.id}`)}
          className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-lg"
        >
          <div className="flex items-center gap-2">
            <Map className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{j.title}</span>
          </div>
          <p className="line-clamp-2 text-xs text-gray-500 dark:text-gray-400">{j.description}</p>
          <div className="flex items-center gap-2 pt-1">
            <Badge label={j.status} />
            <span className="text-xs text-gray-400 dark:text-gray-500">{j.type}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
