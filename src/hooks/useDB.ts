import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';

export function useJourneys() {
  return useLiveQuery(() => db.journeys.toArray()) ?? [];
}

export function useJourney(id: string | undefined) {
  return useLiveQuery(() => (id ? db.journeys.get(id) : undefined), [id]);
}

export function usePhases(journeyId: string | undefined) {
  return useLiveQuery(
    () => (journeyId ? db.phases.where('journeyId').equals(journeyId).sortBy('order') : []),
    [journeyId]
  ) ?? [];
}

export function useSteps(journeyId: string | undefined) {
  return useLiveQuery(
    () => (journeyId ? db.steps.where('journeyId').equals(journeyId).sortBy('order') : []),
    [journeyId]
  ) ?? [];
}

export function useLanes(journeyId: string | undefined) {
  return useLiveQuery(
    () => (journeyId ? db.lanes.where('journeyId').equals(journeyId).sortBy('order') : []),
    [journeyId]
  ) ?? [];
}

export function useLaneItems(laneId: string | undefined) {
  return useLiveQuery(
    () => (laneId ? db.laneItems.where('laneId').equals(laneId).toArray() : []),
    [laneId]
  ) ?? [];
}

export function useLaneItemsForJourney(laneIds: string[]) {
  return useLiveQuery(
    () => laneIds.length > 0
      ? db.laneItems.where('laneId').anyOf(laneIds).toArray()
      : [],
    [laneIds.join(',')]
  ) ?? [];
}

export function useInsight(id: string | undefined) {
  return useLiveQuery(() => (id ? db.insights.get(id) : undefined), [id]);
}

export function useInsights() {
  return useLiveQuery(() => db.insights.toArray()) ?? [];
}

export function useOpportunity(id: string | undefined) {
  return useLiveQuery(() => (id ? db.opportunities.get(id) : undefined), [id]);
}

export function useOpportunities() {
  return useLiveQuery(() => db.opportunities.toArray()) ?? [];
}

export function useSolutions() {
  return useLiveQuery(() => db.solutions.toArray()) ?? [];
}

export function usePersonas() {
  return useLiveQuery(() => db.personas.toArray()) ?? [];
}

export function usePersona(id: string | undefined) {
  return useLiveQuery(() => (id ? db.personas.get(id) : undefined), [id]);
}
