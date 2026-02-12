import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { Badge } from '../common/Badge';
import { useState, useEffect } from 'react';

export function OpportunityPanel({ id }: { id: string }) {
  const opportunity = useLiveQuery(() => db.opportunities.get(id), [id]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (opportunity) {
      setTitle(opportunity.title);
      setDescription(opportunity.description);
    }
  }, [opportunity]);

  if (!opportunity) return null;

  const saveTitle = async () => {
    await db.opportunities.update(id, { title: title.trim() });
  };

  const saveDescription = async () => {
    await db.opportunities.update(id, { description: description.trim() });
  };

  return (
    <div className="space-y-4">
      <Badge label={opportunity.status} />

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Title</label>
        <input
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={saveTitle}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Description</label>
        <textarea
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={saveDescription}
        />
      </div>
    </div>
  );
}
