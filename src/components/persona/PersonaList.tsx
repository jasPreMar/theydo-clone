import { useNavigate } from 'react-router-dom';
import { usePersonas } from '../../hooks/useDB';
import { EmptyState } from '../common/EmptyState';
import { Users } from 'lucide-react';

export function PersonaList() {
  const personas = usePersonas();
  const navigate = useNavigate();

  if (personas.length === 0) {
    return <EmptyState message="No personas yet" />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {personas.map((p) => (
        <button
          key={p.id}
          onClick={() => navigate(`/persona/${p.id}`)}
          className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
              <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.title}</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">{p.role}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{p.primaryGoal}</p>
        </button>
      ))}
    </div>
  );
}
