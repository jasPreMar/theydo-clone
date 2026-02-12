export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

export interface Journey {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  type: string;
  createdAt: string;
}

export interface Phase {
  id: string;
  journeyId: string;
  name: string;
  color: string;
  order: number;
}

export interface Step {
  id: string;
  phaseId: string;
  journeyId: string;
  name: string;
  order: number;
  momentOfTruth: boolean;
  touchpoints?: string[];
}

export interface Lane {
  id: string;
  journeyId: string;
  type: 'insights' | 'opportunities' | 'solutions' | 'metrics' | 'text';
  name: string;
  order: number;
}

export interface LaneItem {
  id: string;
  laneId: string;
  stepId: string;
  refType: 'insight' | 'opportunity' | 'solution' | 'metric' | 'text';
  refId?: string;
  content?: string;
}

export interface Insight {
  id: string;
  projectId: string;
  title: string;
  description: string;
  experienceImpact?: number;
  status: string;
}

export interface Opportunity {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
}

export interface Solution {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  effort?: number;
}

export interface Persona {
  id: string;
  projectId: string;
  title: string;
  role: string;
  description: string;
  primaryGoal: string;
  sees: string[];
  says: string[];
  does: string[];
  hears: string[];
  pains: { label: string; description: string }[];
  gains: { label: string; description: string }[];
}
