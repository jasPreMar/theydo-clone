const colorMap: Record<string, string> = {
  Active: 'bg-green-100 text-green-700',
  Validated: 'bg-blue-100 text-blue-700',
  New: 'bg-gray-100 text-gray-700',
  'Under Review': 'bg-yellow-100 text-yellow-700',
  Prioritized: 'bg-purple-100 text-purple-700',
  Done: 'bg-green-100 text-green-700',
};

export function Badge({ label }: { label: string }) {
  const colors = colorMap[label] ?? 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors}`}>
      {label}
    </span>
  );
}
