import { create } from 'zustand';

interface UIState {
  panelOpen: boolean;
  selectedEntityId: string | null;
  selectedEntityType: 'insight' | 'opportunity' | 'solution' | 'step' | 'persona' | null;
  openPanel: (id: string, type: UIState['selectedEntityType']) => void;
  closePanel: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  panelOpen: false,
  selectedEntityId: null,
  selectedEntityType: null,
  openPanel: (id, type) => set({ panelOpen: true, selectedEntityId: id, selectedEntityType: type }),
  closePanel: () => set({ panelOpen: false, selectedEntityId: null, selectedEntityType: null }),
}));
