import Dexie, { type Table } from 'dexie';
import type {
  Project, Journey, Phase, Step, Lane, LaneItem,
  Insight, Opportunity, Solution, Persona,
} from '../types';

export class AppDatabase extends Dexie {
  projects!: Table<Project, string>;
  journeys!: Table<Journey, string>;
  phases!: Table<Phase, string>;
  steps!: Table<Step, string>;
  lanes!: Table<Lane, string>;
  laneItems!: Table<LaneItem, string>;
  insights!: Table<Insight, string>;
  opportunities!: Table<Opportunity, string>;
  solutions!: Table<Solution, string>;
  personas!: Table<Persona, string>;

  constructor() {
    super('TheyDoClone');
    this.version(1).stores({
      projects: 'id',
      journeys: 'id, projectId',
      phases: 'id, journeyId, order',
      steps: 'id, phaseId, journeyId, order',
      lanes: 'id, journeyId, order',
      laneItems: 'id, laneId, stepId, refId',
      insights: 'id, projectId',
      opportunities: 'id, projectId',
      solutions: 'id, projectId',
      personas: 'id, projectId',
    });
  }
}

export const db = new AppDatabase();
