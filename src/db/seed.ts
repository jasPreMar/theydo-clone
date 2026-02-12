import { db } from './database';
import type {
  Project, Journey, Phase, Step, Lane, LaneItem,
  Insight, Opportunity, Persona,
} from '../types';

const PROJECT_ID = 'proj-1';
const JOURNEY_ID = 'journey-1';
const PERSONA_ID = 'persona-1';

const project: Project = {
  id: PROJECT_ID,
  name: 'Compliance & Marketing',
  createdAt: new Date().toISOString(),
};

const persona: Persona = {
  id: PERSONA_ID,
  projectId: PROJECT_ID,
  title: 'The Compliance Analyst',
  role: 'Regulatory domain expert at the intersection of legal, marketing, product, and engineering',
  description:
    'A mid-career compliance professional responsible for reviewing marketing materials, advertising claims, and customer-facing copy for regulatory adherence.',
  primaryGoal: 'Minimize regulatory risk while enabling business teams to move forward',
  sees: [
    'Marketing copy drafts arriving with tight deadlines',
    'Regulatory updates and guidance documents from agencies',
    'Spreadsheets tracking review status across campaigns',
    'Slack/email threads from marketing asking for approvals',
    'Legal opinions and precedent documents',
    'Competitor marketing materials (for benchmarking)',
  ],
  says: [
    '"We can\'t say that — it implies a guarantee."',
    '"Can you add a disclaimer here?"',
    '"What\'s the substantiation for this claim?"',
    '"Let me check how we handled this last quarter."',
    '"I\'m not trying to block you — I\'m trying to protect us."',
    '"This needs legal escalation before I can sign off."',
  ],
  does: [
    'Reviews marketing copy line by line against regulatory guidelines',
    'Cross-references claims with substantiation documentation',
    'Flags high-risk language and suggests compliant alternatives',
    'Tracks review turnaround times and SLA compliance',
    'Maintains a knowledge base of past decisions and precedents',
    'Escalates edge cases to legal counsel',
    'Participates in calibration sessions with other reviewers',
  ],
  hears: [
    '"Can you turn this around by end of day?"',
    '"Legal said it\'s fine, why are you flagging it?"',
    '"The competitor says this — why can\'t we?"',
    '"You\'re slowing us down."',
    '"The regulation changed last week, did you see?"',
    '"We need to launch tomorrow, can you expedite?"',
  ],
  pains: [
    { label: 'Ambiguous regulations', description: 'Regulations are often vague, requiring interpretation that carries personal and organizational risk.' },
    { label: 'Constant time pressure', description: 'Marketing timelines rarely account for thorough compliance review.' },
    { label: 'Being seen as a blocker', description: 'Perceived as the "department of no" rather than a risk partner.' },
    { label: 'Inconsistent precedents', description: 'Past decisions are poorly documented, making consistent rulings difficult.' },
    { label: 'Context switching', description: 'Juggling multiple review requests across different product lines and regulatory frameworks.' },
    { label: 'Knowledge silos', description: 'Critical institutional knowledge lives in individual heads, not systems.' },
  ],
  gains: [
    { label: 'Clear guidelines', description: 'When regulations are specific and well-documented, reviews are faster and more confident.' },
    { label: 'Early involvement', description: 'Being included at the campaign brief stage prevents costly late-stage rewrites.' },
    { label: 'Searchable precedent library', description: 'A database of past decisions enables consistent, defensible rulings.' },
    { label: 'Trusted partner status', description: 'When marketing sees compliance as an enabler, collaboration improves dramatically.' },
    { label: 'Automated pre-screening', description: 'Tools that catch obvious issues before human review free up time for nuanced judgment.' },
    { label: 'Regulatory change alerts', description: 'Proactive notifications about regulatory changes reduce surprise and rework.' },
  ],
};

const journey: Journey = {
  id: JOURNEY_ID,
  projectId: PROJECT_ID,
  title: 'Compliance Analyst Reviewing Marketing Materials',
  description:
    'End-to-end journey of a compliance analyst reviewing marketing materials, from upstream gaps through post-approval monitoring.',
  status: 'Active',
  type: 'As-Is',
  createdAt: new Date().toISOString(),
};

// --- Phases & Steps ---

interface PhaseData {
  phase: Phase;
  steps: Omit<Step, 'journeyId'>[];
}

const phasesData: PhaseData[] = [
  {
    phase: { id: 'phase-0', journeyId: JOURNEY_ID, name: 'Before — The Upstream Gap', color: '#94a3b8', order: 0 },
    steps: [
      { id: 'step-0-0', phaseId: 'phase-0', name: 'Marketing develops without compliance', order: 0, momentOfTruth: false, touchpoints: ['Campaign brief tools', 'Creative platforms'] },
      { id: 'step-0-1', phaseId: 'phase-0', name: 'Compliance guidance unavailable at brief stage', order: 1, momentOfTruth: false, touchpoints: ['Brief templates'] },
      { id: 'step-0-2', phaseId: 'phase-0', name: 'Marketing delays involving compliance', order: 2, momentOfTruth: false, touchpoints: ['Project management tools'] },
    ],
  },
  {
    phase: { id: 'phase-1', journeyId: JOURNEY_ID, name: 'Triage & Intake', color: '#60a5fa', order: 1 },
    steps: [
      { id: 'step-1-0', phaseId: 'phase-1', name: 'Scan inbound queue', order: 0, momentOfTruth: false, touchpoints: ['Email', 'Ticketing system'] },
      { id: 'step-1-1', phaseId: 'phase-1', name: 'Prioritize by urgency', order: 1, momentOfTruth: false, touchpoints: ['Queue dashboard'] },
      { id: 'step-1-2', phaseId: 'phase-1', name: 'Route to specialized reviewers', order: 2, momentOfTruth: false, touchpoints: ['Team assignments'] },
      { id: 'step-1-3', phaseId: 'phase-1', name: 'Context-set what\'s launching', order: 3, momentOfTruth: false, touchpoints: ['Slack', 'Campaign briefs'] },
    ],
  },
  {
    phase: { id: 'phase-2', journeyId: JOURNEY_ID, name: 'Deep Review', color: '#a78bfa', order: 2 },
    steps: [
      { id: 'step-2-0', phaseId: 'phase-2', name: 'Line-by-line copy review', order: 0, momentOfTruth: false, touchpoints: ['Review tool', 'Document editor'] },
      { id: 'step-2-1', phaseId: 'phase-2', name: 'Cross-reference substantiation', order: 1, momentOfTruth: false, touchpoints: ['Substantiation database'] },
      { id: 'step-2-2', phaseId: 'phase-2', name: 'Pattern-match past decisions', order: 2, momentOfTruth: false, touchpoints: ['Precedent library'] },
      { id: 'step-2-3', phaseId: 'phase-2', name: 'Interpret ambiguous regulations', order: 3, momentOfTruth: true, touchpoints: ['Regulatory guidance docs'] },
      { id: 'step-2-4', phaseId: 'phase-2', name: 'Calibrate to risk tolerance', order: 4, momentOfTruth: false, touchpoints: ['Risk framework'] },
      { id: 'step-2-5', phaseId: 'phase-2', name: 'Decide whether to escalate', order: 5, momentOfTruth: false, touchpoints: ['Escalation matrix'] },
    ],
  },
  {
    phase: { id: 'phase-3', journeyId: JOURNEY_ID, name: 'Translation & Communication', color: '#f59e0b', order: 3 },
    steps: [
      { id: 'step-3-0', phaseId: 'phase-3', name: 'Explain decisions in plain language', order: 0, momentOfTruth: true, touchpoints: ['Email', 'Review comments'] },
      { id: 'step-3-1', phaseId: 'phase-3', name: 'Write actionable feedback', order: 1, momentOfTruth: true, touchpoints: ['Review tool', 'Shared docs'] },
      { id: 'step-3-2', phaseId: 'phase-3', name: 'Navigate jargon gap', order: 2, momentOfTruth: false, touchpoints: ['Meetings', 'Slack'] },
    ],
  },
  {
    phase: { id: 'phase-4', journeyId: JOURNEY_ID, name: 'Negotiation & Alignment', color: '#f97316', order: 4 },
    steps: [
      { id: 'step-4-0', phaseId: 'phase-4', name: 'Mediate between marketing/legal/product', order: 0, momentOfTruth: false, touchpoints: ['Meetings', 'Email'] },
      { id: 'step-4-1', phaseId: 'phase-4', name: 'Explain why changes needed', order: 1, momentOfTruth: false, touchpoints: ['Presentations', 'Documentation'] },
      { id: 'step-4-2', phaseId: 'phase-4', name: 'Navigate pushback', order: 2, momentOfTruth: true, touchpoints: ['Meetings', 'Slack'] },
    ],
  },
  {
    phase: { id: 'phase-5', journeyId: JOURNEY_ID, name: 'Approval & Handoff', color: '#34d399', order: 5 },
    steps: [
      { id: 'step-5-0', phaseId: 'phase-5', name: 'Sign off final version', order: 0, momentOfTruth: false, touchpoints: ['Approval system'] },
      { id: 'step-5-1', phaseId: 'phase-5', name: 'Communicate results', order: 1, momentOfTruth: false, touchpoints: ['Email', 'Slack'] },
      { id: 'step-5-2', phaseId: 'phase-5', name: 'Document for audit trail', order: 2, momentOfTruth: false, touchpoints: ['Compliance archive'] },
    ],
  },
  {
    phase: { id: 'phase-6', journeyId: JOURNEY_ID, name: 'After — Monitoring', color: '#64748b', order: 6 },
    steps: [
      { id: 'step-6-0', phaseId: 'phase-6', name: 'Post-approval spot-checks', order: 0, momentOfTruth: false, touchpoints: ['Live asset monitoring'] },
      { id: 'step-6-1', phaseId: 'phase-6', name: 'Version control verification', order: 1, momentOfTruth: false, touchpoints: ['CMS', 'Asset manager'] },
      { id: 'step-6-2', phaseId: 'phase-6', name: 'Policy catch-up', order: 2, momentOfTruth: false, touchpoints: ['Regulatory feeds', 'Training'] },
    ],
  },
];

// --- Lanes ---
const lanes: Lane[] = [
  { id: 'lane-touchpoints', journeyId: JOURNEY_ID, type: 'text', name: 'Touchpoints', order: 0 },
  { id: 'lane-pains', journeyId: JOURNEY_ID, type: 'insights', name: 'Pains', order: 1 },
  { id: 'lane-opportunities', journeyId: JOURNEY_ID, type: 'opportunities', name: 'Opportunities', order: 2 },
];

// --- Insights (pains mapped to steps) ---
const insights: Insight[] = [
  { id: 'ins-1', projectId: PROJECT_ID, title: 'No compliance input at brief stage', description: 'Marketing briefs are created without any compliance checkpoint, leading to costly late-stage revisions.', experienceImpact: -3, status: 'Validated' },
  { id: 'ins-2', projectId: PROJECT_ID, title: 'Overwhelming inbound volume', description: 'The review queue grows faster than the team can process, causing SLA breaches and rushed reviews.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-3', projectId: PROJECT_ID, title: 'Ambiguous regulatory language', description: 'Vague regulations force analysts to make judgment calls that carry personal and organizational risk.', experienceImpact: -3, status: 'Validated' },
  { id: 'ins-4', projectId: PROJECT_ID, title: 'No searchable precedent library', description: 'Past decisions are stored in emails and personal notes, making consistent rulings nearly impossible.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-5', projectId: PROJECT_ID, title: 'Jargon gap creates friction', description: 'Compliance feedback uses regulatory language that marketing teams struggle to act on.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-6', projectId: PROJECT_ID, title: 'Perceived as blockers', description: 'Compliance team is seen as the "department of no" rather than risk management partners.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-7', projectId: PROJECT_ID, title: 'No post-approval monitoring', description: 'Approved materials may be modified after sign-off without compliance awareness.', experienceImpact: -1, status: 'New' },
];

const opportunities: Opportunity[] = [
  { id: 'opp-1', projectId: PROJECT_ID, title: 'Embed compliance in campaign briefs', description: 'Add a compliance checklist to the campaign brief template so teams self-screen before submission.', status: 'Under Review' },
  { id: 'opp-2', projectId: PROJECT_ID, title: 'Build a precedent decision database', description: 'Create a searchable library of past compliance decisions with rationale and outcomes.', status: 'Prioritized' },
  { id: 'opp-3', projectId: PROJECT_ID, title: 'Plain-language feedback templates', description: 'Develop templates that translate regulatory requirements into actionable marketing guidance.', status: 'Under Review' },
  { id: 'opp-4', projectId: PROJECT_ID, title: 'AI-assisted pre-screening', description: 'Use NLP to flag common compliance issues before human review, reducing review volume by ~30%.', status: 'New' },
  { id: 'opp-5', projectId: PROJECT_ID, title: 'Automated version control alerts', description: 'Monitor published assets for unauthorized changes after compliance approval.', status: 'New' },
];

// --- Lane Items (connecting insights/opportunities to steps) ---
const laneItems: LaneItem[] = [
  // Touchpoints lane — text content per step (using touchpoints from step data)
  // We'll auto-generate these from step touchpoints

  // Pains lane — insights mapped to relevant steps
  { id: 'li-p-1', laneId: 'lane-pains', stepId: 'step-0-0', refType: 'insight', refId: 'ins-1' },
  { id: 'li-p-2', laneId: 'lane-pains', stepId: 'step-0-2', refType: 'insight', refId: 'ins-1' },
  { id: 'li-p-3', laneId: 'lane-pains', stepId: 'step-1-0', refType: 'insight', refId: 'ins-2' },
  { id: 'li-p-4', laneId: 'lane-pains', stepId: 'step-2-3', refType: 'insight', refId: 'ins-3' },
  { id: 'li-p-5', laneId: 'lane-pains', stepId: 'step-2-2', refType: 'insight', refId: 'ins-4' },
  { id: 'li-p-6', laneId: 'lane-pains', stepId: 'step-3-2', refType: 'insight', refId: 'ins-5' },
  { id: 'li-p-7', laneId: 'lane-pains', stepId: 'step-4-2', refType: 'insight', refId: 'ins-6' },
  { id: 'li-p-8', laneId: 'lane-pains', stepId: 'step-6-0', refType: 'insight', refId: 'ins-7' },

  // Opportunities lane
  { id: 'li-o-1', laneId: 'lane-opportunities', stepId: 'step-0-0', refType: 'opportunity', refId: 'opp-1' },
  { id: 'li-o-2', laneId: 'lane-opportunities', stepId: 'step-0-1', refType: 'opportunity', refId: 'opp-1' },
  { id: 'li-o-3', laneId: 'lane-opportunities', stepId: 'step-2-2', refType: 'opportunity', refId: 'opp-2' },
  { id: 'li-o-4', laneId: 'lane-opportunities', stepId: 'step-3-0', refType: 'opportunity', refId: 'opp-3' },
  { id: 'li-o-5', laneId: 'lane-opportunities', stepId: 'step-3-1', refType: 'opportunity', refId: 'opp-3' },
  { id: 'li-o-6', laneId: 'lane-opportunities', stepId: 'step-1-0', refType: 'opportunity', refId: 'opp-4' },
  { id: 'li-o-7', laneId: 'lane-opportunities', stepId: 'step-2-0', refType: 'opportunity', refId: 'opp-4' },
  { id: 'li-o-8', laneId: 'lane-opportunities', stepId: 'step-6-1', refType: 'opportunity', refId: 'opp-5' },
];

// Generate touchpoint lane items from step data
const touchpointLaneItems: LaneItem[] = [];
let tpCounter = 0;
for (const pd of phasesData) {
  for (const step of pd.steps) {
    if (step.touchpoints && step.touchpoints.length > 0) {
      tpCounter++;
      touchpointLaneItems.push({
        id: `li-tp-${tpCounter}`,
        laneId: 'lane-touchpoints',
        stepId: step.id,
        refType: 'text',
        content: step.touchpoints.join(', '),
      });
    }
  }
}

export async function seedDatabase() {
  const count = await db.projects.count();
  if (count > 0) return;

  await db.transaction('rw',
    [db.projects, db.journeys, db.phases, db.steps, db.lanes, db.laneItems, db.insights, db.opportunities, db.personas],
    async () => {
      await db.projects.add(project);
      await db.personas.add(persona);
      await db.journeys.add(journey);

      for (const pd of phasesData) {
        await db.phases.add(pd.phase);
        for (const step of pd.steps) {
          await db.steps.add({ ...step, journeyId: JOURNEY_ID });
        }
      }

      await db.lanes.bulkAdd(lanes);
      await db.insights.bulkAdd(insights);
      await db.opportunities.bulkAdd(opportunities);
      await db.laneItems.bulkAdd([...laneItems, ...touchpointLaneItems]);
    }
  );
}
