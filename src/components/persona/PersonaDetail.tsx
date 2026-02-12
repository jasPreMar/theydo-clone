import { useParams } from 'react-router-dom';
import { usePersona } from '../../hooks/useDB';
import { EmpathySection } from './EmpathySection';
import { EmptyState } from '../common/EmptyState';
import { Eye, MessageSquare, Hand, Ear, ThumbsDown, ThumbsUp, Target } from 'lucide-react';

export function PersonaDetail() {
  const { id } = useParams<{ id: string }>();
  const persona = usePersona(id);

  if (!persona) return <EmptyState message="Persona not found" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">{persona.title}</h2>
        <p className="mt-1 text-sm text-gray-500">{persona.role}</p>
        <p className="mt-3 text-sm text-gray-600">{persona.description}</p>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2">
          <Target className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">{persona.primaryGoal}</span>
        </div>
      </div>

      {/* Empathy Map — 2 column grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <EmpathySection icon={Eye} title="Sees" items={persona.sees} color="#6366f1" />
        <EmpathySection icon={MessageSquare} title="Says" items={persona.says} color="#8b5cf6" />
        <EmpathySection icon={Hand} title="Does" items={persona.does} color="#0ea5e9" />
        <EmpathySection icon={Ear} title="Hears" items={persona.hears} color="#f59e0b" />
      </div>

      {/* Pains & Gains — full width */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <ThumbsDown className="h-4 w-4 text-red-500" />
            <h3 className="text-sm font-semibold text-red-600">Pains</h3>
          </div>
          <div className="space-y-3">
            {persona.pains.map((pain, i) => (
              <div key={i}>
                <p className="text-xs font-medium text-gray-900">{pain.label}</p>
                <p className="text-xs text-gray-500">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-green-500" />
            <h3 className="text-sm font-semibold text-green-600">Gains</h3>
          </div>
          <div className="space-y-3">
            {persona.gains.map((gain, i) => (
              <div key={i}>
                <p className="text-xs font-medium text-gray-900">{gain.label}</p>
                <p className="text-xs text-gray-500">{gain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
