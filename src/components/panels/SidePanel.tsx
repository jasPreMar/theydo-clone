import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { InsightPanel } from './InsightPanel';
import { OpportunityPanel } from './OpportunityPanel';
import { StepPanel } from './StepPanel';
import { PersonaPanel } from './PersonaPanel';

const titles: Record<string, string> = {
  insight: 'Insight',
  opportunity: 'Opportunity',
  step: 'Step Details',
  persona: 'Persona',
};

export function SidePanel() {
  const { selectedEntityId, selectedEntityType, closePanel } = useUIStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closePanel]);

  if (!selectedEntityId || !selectedEntityType) return null;

  return (
    <div className="side-panel-enter flex w-96 flex-col border-l border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {titles[selectedEntityType] ?? 'Details'}
        </h2>
        <button
          onClick={closePanel}
          className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {selectedEntityType === 'insight' && <InsightPanel id={selectedEntityId} />}
        {selectedEntityType === 'opportunity' && <OpportunityPanel id={selectedEntityId} />}
        {selectedEntityType === 'step' && <StepPanel id={selectedEntityId} />}
        {selectedEntityType === 'persona' && <PersonaPanel id={selectedEntityId} />}
      </div>
    </div>
  );
}
