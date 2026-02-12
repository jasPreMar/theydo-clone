const colorMap: Record<string, string> = {
  Active: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Validated: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  New: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  'Under Review': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  Prioritized: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Done: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
};

export function Badge({ label }: { label: string }) {
  const colors = colorMap[label] ?? 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors}`}>
      {label}
    </span>
  );
}
