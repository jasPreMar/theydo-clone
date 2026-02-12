import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { useState, useEffect } from 'react';

export function PersonaPanel({ id }: { id: string }) {
  const persona = useLiveQuery(() => db.personas.get(id), [id]);
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (persona) {
      setTitle(persona.title);
      setRole(persona.role);
    }
  }, [persona]);

  if (!persona) return null;

  const saveTitle = async () => {
    await db.personas.update(id, { title: title.trim() });
  };

  const saveRole = async () => {
    await db.personas.update(id, { role: role.trim() });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Name</label>
        <input
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={saveTitle}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Role</label>
        <input
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          onBlur={saveRole}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Primary Goal</label>
        <p className="text-sm text-gray-700 dark:text-gray-300">{persona.primaryGoal}</p>
      </div>
    </div>
  );
}
