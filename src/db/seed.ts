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
  role: 'Regulatory domain expert at the intersection of legal, marketing, product, and engineering. Translator, gatekeeper, and partner all at once.',
  description:
    'A mid-career compliance professional (5–10 years experience) embedded with or adjacent to a marketing organization. Reviews 15–30 marketing assets daily — ad copy, landing pages, email campaigns, influencer posts, social content. Spends more time translating legal risk into plain language than making the actual compliance determination. The job is much less glamorous and far more reactive than people imagine.',
  primaryGoal: 'Minimize regulatory risk while enabling business teams to move forward',
  avatarUrl: '/persona-avatar.jpeg',
  sees: [
    'A queue of 15–30 marketing assets in various stages of review every day',
    'Requests arriving late, marked "urgent," with launch dates already locked in',
    'A Frankenstein stack of disconnected tools: Slack, email, Google Docs, Jira, spreadsheets, shared drives',
    'The compliance review step as the least-tooled part of the entire marketing workflow — "a spreadsheet and a prayer"',
    'The same types of issues over and over: superlatives without substantiation, testimonials without disclosures, "free" offers with buried conditions',
    'Specialized GRC tools that exist but are clunky, expensive, and hated by marketing teams',
    'A department that is last to innovate — high risk and liability concerns make compliance teams conservative about adopting new tools',
    'An asymmetric workload — marketing produces high volumes of material while compliance must review everything',
  ],
  says: [
    '"You can say X, but not Y."',
    '"This claim is okay if you add this qualifier."',
    '"What\'s the substantiation for this claim?"',
    '"Have we said something like this before?"',
    '"I\'m not trying to block you — I\'m trying to protect us."',
    '"This needs legal escalation before I can sign off."',
    '"If a competitor reported us for this, we\'d lose and have to pull the whole campaign."',
    '"We need substantiation before using this stat."',
    '"This framing could be misleading under Rule ABC."',
  ],
  does: [
    'Reviews marketing copy line by line against regulatory guidelines',
    'Cross-references claims with substantiation documentation',
    'Flags high-risk language and suggests compliant alternatives',
    'Scans for trigger words: guaranteed, free, instant, best-in-class',
    'Routes documents to correct specialized reviewers based on regulation type',
    'Interprets ambiguous regulations and makes judgment calls in gray areas',
    'Calibrates feedback to the organization\'s specific risk tolerance',
    'Translates legal risk into plain language for marketing — the biggest time sink',
    'Spot-checks live ads post-approval to verify what went live matches what was approved',
    'Logs all approvals and decisions manually for future audits',
    'Escalates edge cases to legal counsel',
    'Tracks regulatory updates from FTC, CFPB, state AGs, industry bodies via newsletters and RSS feeds',
  ],
  hears: [
    '"Can you turn this around by end of day?"',
    '"Can we make the disclaimer font white on a light background?"',
    '"The competitor says this — why can\'t we?"',
    '"You\'re slowing us down."',
    '"Who do I even send this to for approval?"',
    '"We need to launch tomorrow, can you expedite?"',
    '"Legal said it\'s fine — why is compliance flagging it?"',
    '"The regulation changed last week, did you see?"',
    '"Can we test a version without the disclaimer?"',
  ],
  pains: [
    { label: 'Ambiguous regulations', description: 'Regulations are often vague, requiring interpretation that carries personal and organizational risk. "Is this a real risk or just conservative nerves?"' },
    { label: 'Everything is last-minute', description: 'Marketing arrives after decisions are locked in, timelines set, and creative nearly finished. Makes compliance feel less like a partner and more like a blocker.' },
    { label: 'Version control nightmare', description: 'What goes live may not be what was approved. Marketing uploads wrong versions, interns use old disclaimers, "small tweaks" happen after sign-off. This keeps analysts up at night.' },
    { label: 'No institutional memory', description: 'Past decisions live in random emails, Slack threads, Google Docs, Jira tickets, or people\'s heads. No clean, searchable knowledge base. The same questions get re-litigated over and over.' },
    { label: 'Tool fragmentation', description: '80% of approvals happen in messy email chains. None of the tools talk to each other. "If I get hit by a bus tomorrow, my team would be lost."' },
    { label: 'Being seen as a blocker', description: 'Perceived as the "department of no" rather than a risk partner. The worst marketing partners try to route around compliance entirely.' },
    { label: 'Gray area fatigue', description: 'Most regulations are not black and white. Every judgment call carries personal accountability. If it goes wrong, it\'s the analyst\'s fault.' },
    { label: 'Context switching', description: 'Jumping from reviewing a 50-page whitepaper to a 280-character tweet. Translating between legal language, marketing strategy, product mechanics, and risk assessment all day.' },
    { label: 'Two failure modes under pressure', description: 'Either get overwhelmed and fall behind on volume, or aggressively reject at the first issue — extending iteration cycles and damaging the relationship with marketing.' },
    { label: 'False sense of AI security', description: 'Marketing teams running copy through ChatGPT asking "is this FTC compliant?" and treating the answer as legal advice. Compliance requires contextual judgment AI can\'t provide alone.' },
  ],
  gains: [
    { label: 'Clear guidelines', description: 'When regulations are specific and well-documented, reviews are faster and more confident.' },
    { label: 'Early involvement', description: 'Being included at the campaign brief stage prevents costly late-stage rewrites. The best collaborations happen during ideation, not just approval.' },
    { label: 'Searchable precedent library', description: 'A database of past decisions — "How did we handle claims like this before?" — enables consistent, defensible rulings.' },
    { label: 'Trusted partner status', description: 'When marketing treats compliance as a creative constraint rather than a bureaucratic barrier, collaboration improves dramatically.' },
    { label: 'Enabling creativity within constraints', description: 'Pride in being the "Department of Yes" — helping marketing find safe ways to say what they want, not just shutting ideas down.' },
    { label: 'Automated pre-screening', description: 'When obvious issues are caught before human review, analysts can focus on the nuanced judgment calls that actually require expertise.' },
    { label: 'Regulatory change alerts', description: 'Proactive notifications about regulatory changes connected to active campaigns reduce surprise and rework.' },
    { label: 'Reduced repetitive work', description: 'Reviewing similar things again and again is draining. A system that surfaces prior approvals instantly would be transformative.' },
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
      { id: 'step-0-0', phaseId: 'phase-0', name: 'Marketing develops creative', order: 0, momentOfTruth: false, touchpoints: ['Figma', 'HubSpot', 'Creative briefs', 'Brief templates', 'Google Docs', 'Slack', 'Email'], experienceScore: -1.5 },
    ],
  },
  {
    phase: { id: 'phase-1', journeyId: JOURNEY_ID, name: 'Triage & Intake', color: '#60a5fa', order: 1 },
    steps: [
      { id: 'step-1-0', phaseId: 'phase-1', name: 'Scan inbound queue of review requests', order: 0, momentOfTruth: false, touchpoints: ['Email', 'Jira', 'Slack "Urgent" channel'], experienceScore: -0.5 },
      { id: 'step-1-1', phaseId: 'phase-1', name: 'Prioritize by urgency and launch date', order: 1, momentOfTruth: false, touchpoints: ['Jira', 'Spreadsheets', 'Airtable'], experienceScore: -1.0 },
      { id: 'step-1-2', phaseId: 'phase-1', name: 'Route to specialized reviewers', order: 2, momentOfTruth: false, touchpoints: ['Email', 'Slack DMs'], experienceScore: 0.0 },
      { id: 'step-1-3', phaseId: 'phase-1', name: 'Context-set what\'s launching', order: 3, momentOfTruth: false, touchpoints: ['Slack', 'Campaign briefs', 'Marketing calendar'], experienceScore: 0.5 },
    ],
  },
  {
    phase: { id: 'phase-2', journeyId: JOURNEY_ID, name: 'Deep Review', color: '#a78bfa', order: 2 },
    steps: [
      { id: 'step-2-0', phaseId: 'phase-2', name: 'Review AI compliance analysis visualization', order: 0, momentOfTruth: false, touchpoints: ['Decision tree view', 'AI analysis summary', 'Document viewer'], experienceScore: -0.5 },
      { id: 'step-2-1', phaseId: 'phase-2', name: 'Drill into flagged issues and AI comments', order: 1, momentOfTruth: false, touchpoints: ['Anchored comments', 'Document highlights', 'Check detail panels'], experienceScore: 0.5 },
      { id: 'step-2-2', phaseId: 'phase-2', name: 'Override AI check results where judgment differs', order: 2, momentOfTruth: true, touchpoints: ['Override controls', 'Analyst notes', 'Decision tree nodes'], experienceScore: -0.5 },
      { id: 'step-2-3', phaseId: 'phase-2', name: 'Cross-reference substantiation and past precedent', order: 3, momentOfTruth: false, touchpoints: ['Substantiation library', 'Shared Drive', 'Precedent search'], experienceScore: -0.5 },
      { id: 'step-2-4', phaseId: 'phase-2', name: 'Interpret ambiguous regulations', order: 4, momentOfTruth: true, touchpoints: ['Regulatory PDFs', 'FTC/CFPB guidance', 'Law firm newsletters'], experienceScore: -2.0 },
      { id: 'step-2-5', phaseId: 'phase-2', name: 'Calibrate to org risk tolerance and decide escalation', order: 5, momentOfTruth: false, touchpoints: ['Internal playbooks', 'Risk framework docs', 'Email', 'Slack DMs'], experienceScore: -1.0 },
    ],
  },
  {
    phase: { id: 'phase-3', journeyId: JOURNEY_ID, name: 'Translation & Communication', color: '#f59e0b', order: 3 },
    steps: [
      { id: 'step-3-0', phaseId: 'phase-3', name: 'Annotate compliance results for marketing', order: 0, momentOfTruth: true, touchpoints: ['Visualization annotations', 'Plain-language templates', 'Comment anchors'], experienceScore: -0.5 },
      { id: 'step-3-1', phaseId: 'phase-3', name: 'Send structured feedback from compliance view', order: 1, momentOfTruth: true, touchpoints: ['In-app messaging', 'Structured feedback view', 'Email notifications'], experienceScore: -0.5 },
    ],
  },
  {
    phase: { id: 'phase-4', journeyId: JOURNEY_ID, name: 'Negotiation & Alignment', color: '#f97316', order: 4 },
    steps: [
      { id: 'step-4-0', phaseId: 'phase-4', name: 'Walk marketing through compliance visualization', order: 0, momentOfTruth: false, touchpoints: ['Shared visualization link', 'Screen share', 'Video calls'], experienceScore: -1.0 },
      { id: 'step-4-1', phaseId: 'phase-4', name: 'Explain AI rationale and analyst overrides', order: 1, momentOfTruth: false, touchpoints: ['Decision tree walkthrough', 'Override annotations', 'Presentations'], experienceScore: -0.5 },
      { id: 'step-4-2', phaseId: 'phase-4', name: 'Navigate pushback from stakeholders', order: 2, momentOfTruth: true, touchpoints: ['Meetings', 'Slack', 'Email threads'], experienceScore: -1.5 },
    ],
  },
  {
    phase: { id: 'phase-5', journeyId: JOURNEY_ID, name: 'Approval & Handoff', color: '#34d399', order: 5 },
    steps: [
      { id: 'step-5-0', phaseId: 'phase-5', name: 'Sign off on final approved version', order: 0, momentOfTruth: false, touchpoints: ['Email', 'Jira'], experienceScore: 1.5 },
      { id: 'step-5-1', phaseId: 'phase-5', name: 'Communicate approval and required changes', order: 1, momentOfTruth: false, touchpoints: ['Email', 'Slack'], experienceScore: 1.0 },
      { id: 'step-5-2', phaseId: 'phase-5', name: 'Document for audit trail', order: 2, momentOfTruth: false, touchpoints: ['Shared Drive', 'Spreadsheets', 'Email archives'], experienceScore: 0.5 },
    ],
  },
  {
    phase: { id: 'phase-6', journeyId: JOURNEY_ID, name: 'After — Monitoring', color: '#64748b', order: 6 },
    steps: [
      { id: 'step-6-0', phaseId: 'phase-6', name: 'Post-approval spot-checks on live assets', order: 0, momentOfTruth: false, touchpoints: ['Facebook Ads Manager', 'Live websites', 'Social platforms'], experienceScore: -0.5 },
      { id: 'step-6-1', phaseId: 'phase-6', name: 'Version control verification', order: 1, momentOfTruth: false, touchpoints: ['CMS', 'Ad platforms', 'Asset manager'], experienceScore: -1.0 },
      { id: 'step-6-2', phaseId: 'phase-6', name: 'Track regulatory changes', order: 2, momentOfTruth: false, touchpoints: ['RSS feeds', 'Law firm newsletters', 'LinkedIn', 'FTC.gov'], experienceScore: 0.0 },
    ],
  },
];

// --- Lanes ---
const lanes: Lane[] = [
  { id: 'lane-experience', journeyId: JOURNEY_ID, type: 'experience', name: 'Experience', order: 0 },
  { id: 'lane-touchpoints', journeyId: JOURNEY_ID, type: 'text', name: 'Touchpoints', order: 1 },
  { id: 'lane-pains', journeyId: JOURNEY_ID, type: 'insights', name: 'Pains', order: 2 },
  { id: 'lane-opportunities', journeyId: JOURNEY_ID, type: 'opportunities', name: 'Opportunities', order: 3 },
];

// --- Insights (pains mapped to steps) ---
const insights: Insight[] = [
  { id: 'ins-1', projectId: PROJECT_ID, title: 'No compliance input at brief stage', description: 'Marketing briefs are created without any compliance checkpoint, leading to costly late-stage revisions. Compliance guidance only arrives at the review stage, never at ideation.', experienceImpact: -3, status: 'Validated' },
  { id: 'ins-2', projectId: PROJECT_ID, title: 'Overwhelming inbound volume', description: 'The review queue grows faster than the team can process (15–30 assets/day), causing SLA breaches and rushed reviews. Most arrive late, marked "urgent," with launch dates already locked in.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-3', projectId: PROJECT_ID, title: 'Ambiguous regulatory language', description: 'Vague regulations force analysts to make judgment calls that carry personal and organizational risk. "Is this a real risk or just conservative nerves?" — there\'s rarely a clear answer.', experienceImpact: -3, status: 'Validated' },
  { id: 'ins-4', projectId: PROJECT_ID, title: 'No searchable precedent library', description: 'Past decisions live in random emails, Slack threads, Google Docs, Jira tickets, and people\'s heads. The same questions get re-litigated over and over because there\'s no clean, searchable knowledge base.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-5', projectId: PROJECT_ID, title: 'Jargon gap creates friction', description: 'Compliance speaks in "UDAAP" and "clear and conspicuous"; marketing speaks in conversion rates and funnels. Translating between these mindsets is exhausting and the #1 time sink.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-6', projectId: PROJECT_ID, title: 'Perceived as blockers', description: 'Compliance is seen as the "department of no." The worst marketing partners try to route around compliance. The best treat the analyst as a thought partner — but this depends on the relationship dynamic more than any tool.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-7', projectId: PROJECT_ID, title: 'No post-approval monitoring', description: 'Approved materials are modified after sign-off without compliance awareness. Interns upload wrong versions, "small tweaks" bypass review, and what goes live diverges from what was approved.', experienceImpact: -3, status: 'Validated' },
  { id: 'ins-8', projectId: PROJECT_ID, title: 'Version control breakdown', description: '"I\'ll redline something in a Google Doc, the copywriter makes changes, the designer builds it out, and then someone makes small tweaks I never see. The thing that goes live is not the thing I approved."', experienceImpact: -3, status: 'Validated' },
  { id: 'ins-9', projectId: PROJECT_ID, title: 'Tool fragmentation across workflow', description: '80% of approvals happen in email chains. The compliance review step is the least-tooled part of the entire marketing workflow — "a spreadsheet and a prayer." None of the tools talk to each other.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-10', projectId: PROJECT_ID, title: 'Last-minute submissions destroy collaboration', description: 'Marketing comes to compliance after decisions are basically locked in. That makes compliance feel less like a partner and more like a blocker — and the analyst is suddenly the villain holding things up.', experienceImpact: -3, status: 'Validated' },
  { id: 'ins-11', projectId: PROJECT_ID, title: 'Substantiation tracking is manual and fragile', description: 'When marketing says "our product is #1," the analyst must find the source, verify it\'s current, confirm the methodology, and check usage rights — all across shared drives held together with duct tape.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-12', projectId: PROJECT_ID, title: 'Two failure modes under pressure', description: 'Analysts either get overwhelmed by volume and fall behind, or aggressively reject at the first issue found — extending iteration cycles and damaging the relationship with marketing. Both modes are common.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-13', projectId: PROJECT_ID, title: 'Sensitive data exposure in fragmented channels', description: 'Compliance discussions happen in Slack threads and email chains where sensitive data (screening matches, regulatory flags, criminal record matches) can be accidentally exposed to the wrong people.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-14', projectId: PROJECT_ID, title: 'AI analysis needs human calibration for org-specific risk', description: 'Different organizations have varying risk tolerance for the same regulations. What\'s non-negotiable for one company may be deprioritized by another. AI checks apply broad rules but can\'t account for each organization\'s specific risk appetite, internal playbooks, or business context — requiring analysts to override and calibrate.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-15', projectId: PROJECT_ID, title: 'Informational AI tasks blur the line with compliance failures', description: 'AI analysis generates both failure tasks (\'this claim is unsupported\') and informational tasks (\'check your playbook for X requirement we can\'t verify\'). Analysts must distinguish between issues that block approval vs. items for awareness — a cognitive burden that grows with volume.', experienceImpact: -1, status: 'Validated' },
  { id: 'ins-16', projectId: PROJECT_ID, title: 'AI analysis creates verification burden instead of saving time', description: 'Analysts either over-trust the AI and rubber-stamp its output — dangerous in a high-liability domain — or distrust it entirely and redo the analysis manually. The decision tree visualization adds transparency but also cognitive load: analysts must now evaluate the AI\'s reasoning path on top of the document itself, sometimes spending more time verifying the AI than the original review would have taken.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-17', projectId: PROJECT_ID, title: 'Structured feedback flattens the nuance compliance work requires', description: 'Each compliance finding has different severity, context-dependency, and urgency. Structured feedback formats flatten this into a uniform list, making it hard for marketing to distinguish between "this violates federal law" and "this is a conservative suggestion." The result is either panicked over-correction on minor points or dangerously ignored feedback on critical ones.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-18', projectId: PROJECT_ID, title: 'Compliance visualization overwhelms non-expert stakeholders', description: 'The decision tree is designed around regulatory logic that compliance analysts understand intuitively. When shared with marketing or product teams, it creates confusion rather than clarity — they see branching nodes and legal terminology but can\'t extract actionable guidance. The analyst ends up explaining the tool instead of explaining the compliance issue, adding a new translation layer.', experienceImpact: -2, status: 'Validated' },
  { id: 'ins-19', projectId: PROJECT_ID, title: 'Dual AI-and-analyst authority undermines stakeholder trust', description: 'When analysts override AI check results and then present both the AI\'s findings and their own adjustments, stakeholders struggle with whose judgment to trust. Marketing asks "why did you override the AI?" or "why should I trust you over the AI?" instead of engaging with the compliance issue itself. The conversation becomes about the tool\'s reliability rather than the actual risk.', experienceImpact: -2, status: 'Validated' },
];

const opportunities: Opportunity[] = [
  { id: 'opp-11', projectId: PROJECT_ID, title: 'Intuitive decision tree visualization for AI analysis', description: 'Design the AI compliance analysis as an explorable decision tree that shows the analyst each check the AI performed, the branching logic it followed, and where it flagged issues. Make the AI\'s reasoning transparent and navigable rather than a black-box list of comments.', status: 'Prioritized' },
  { id: 'opp-12', projectId: PROJECT_ID, title: 'Analyst override of AI check results', description: 'Allow compliance analysts to override individual AI check results based on their professional judgment — e.g. accepting a claim the AI flagged, or flagging something the AI passed. Track overrides in the audit trail with rationale for traceability and organizational learning.', status: 'Prioritized' },
  { id: 'opp-13', projectId: PROJECT_ID, title: 'In-visualization communication to marketing', description: 'Enable analysts to annotate compliance results and send structured, plain-language instructions to marketing directly from the decision tree visualization. Marketing receives clear, contextual guidance tied to specific issues rather than disconnected email feedback.', status: 'Prioritized' },
];

// --- Lane Items (connecting insights/opportunities to steps) ---
const laneItems: LaneItem[] = [
  // Touchpoints lane — text content per step (using touchpoints from step data)
  // We'll auto-generate these from step touchpoints

  // Pains lane — insights mapped to relevant steps
  { id: 'li-p-1', laneId: 'lane-pains', stepId: 'step-0-0', refType: 'insight', refId: 'ins-1' },
  { id: 'li-p-3', laneId: 'lane-pains', stepId: 'step-1-0', refType: 'insight', refId: 'ins-2' },
  { id: 'li-p-4', laneId: 'lane-pains', stepId: 'step-2-3', refType: 'insight', refId: 'ins-3' },
  { id: 'li-p-5', laneId: 'lane-pains', stepId: 'step-2-3', refType: 'insight', refId: 'ins-4' },
  { id: 'li-p-6', laneId: 'lane-pains', stepId: 'step-3-0', refType: 'insight', refId: 'ins-5' },
  { id: 'li-p-7', laneId: 'lane-pains', stepId: 'step-4-2', refType: 'insight', refId: 'ins-6' },
  { id: 'li-p-8', laneId: 'lane-pains', stepId: 'step-6-0', refType: 'insight', refId: 'ins-7' },
  { id: 'li-p-9', laneId: 'lane-pains', stepId: 'step-5-0', refType: 'insight', refId: 'ins-8' },
  { id: 'li-p-10', laneId: 'lane-pains', stepId: 'step-6-1', refType: 'insight', refId: 'ins-8' },
  { id: 'li-p-11', laneId: 'lane-pains', stepId: 'step-1-0', refType: 'insight', refId: 'ins-9' },
  { id: 'li-p-12', laneId: 'lane-pains', stepId: 'step-3-0', refType: 'insight', refId: 'ins-9' },
  { id: 'li-p-13', laneId: 'lane-pains', stepId: 'step-0-0', refType: 'insight', refId: 'ins-10' },
  { id: 'li-p-15', laneId: 'lane-pains', stepId: 'step-1-1', refType: 'insight', refId: 'ins-10' },
  { id: 'li-p-16', laneId: 'lane-pains', stepId: 'step-2-3', refType: 'insight', refId: 'ins-11' },
  { id: 'li-p-17', laneId: 'lane-pains', stepId: 'step-1-1', refType: 'insight', refId: 'ins-12' },
  { id: 'li-p-18', laneId: 'lane-pains', stepId: 'step-2-0', refType: 'insight', refId: 'ins-12' },
  { id: 'li-p-19', laneId: 'lane-pains', stepId: 'step-3-0', refType: 'insight', refId: 'ins-13' },
  { id: 'li-p-20', laneId: 'lane-pains', stepId: 'step-4-0', refType: 'insight', refId: 'ins-13' },

  // Pains for opportunity steps (why experience is still negative despite opportunities)
  { id: 'li-p-23', laneId: 'lane-pains', stepId: 'step-2-0', refType: 'insight', refId: 'ins-16' },
  { id: 'li-p-24', laneId: 'lane-pains', stepId: 'step-3-1', refType: 'insight', refId: 'ins-17' },
  { id: 'li-p-25', laneId: 'lane-pains', stepId: 'step-4-0', refType: 'insight', refId: 'ins-18' },
  { id: 'li-p-26', laneId: 'lane-pains', stepId: 'step-4-1', refType: 'insight', refId: 'ins-19' },

  // Opportunities lane — AI analysis flow

  { id: 'li-p-21', laneId: 'lane-pains', stepId: 'step-2-2', refType: 'insight', refId: 'ins-14' },
  { id: 'li-p-22', laneId: 'lane-pains', stepId: 'step-2-1', refType: 'insight', refId: 'ins-15' },
  { id: 'li-o-18', laneId: 'lane-opportunities', stepId: 'step-2-0', refType: 'opportunity', refId: 'opp-11' },
  { id: 'li-o-19', laneId: 'lane-opportunities', stepId: 'step-4-0', refType: 'opportunity', refId: 'opp-11' },
  { id: 'li-o-20', laneId: 'lane-opportunities', stepId: 'step-2-2', refType: 'opportunity', refId: 'opp-12' },
  { id: 'li-o-21', laneId: 'lane-opportunities', stepId: 'step-4-1', refType: 'opportunity', refId: 'opp-12' },
  { id: 'li-o-22', laneId: 'lane-opportunities', stepId: 'step-3-0', refType: 'opportunity', refId: 'opp-13' },
  { id: 'li-o-23', laneId: 'lane-opportunities', stepId: 'step-3-1', refType: 'opportunity', refId: 'opp-13' },
];

// Generate touchpoint lane items from step data — one card per touchpoint
const touchpointLaneItems: LaneItem[] = [];
let tpCounter = 0;
for (const pd of phasesData) {
  for (const step of pd.steps) {
    if (step.touchpoints && step.touchpoints.length > 0) {
      for (const tp of step.touchpoints) {
        tpCounter++;
        touchpointLaneItems.push({
          id: `li-tp-${tpCounter}`,
          laneId: 'lane-touchpoints',
          stepId: step.id,
          refType: 'text',
          content: tp,
        });
      }
    }
  }
}

// Experience scores by step ID for migration
const experienceScores: Record<string, number> = {};
for (const pd of phasesData) {
  for (const step of pd.steps) {
    if (step.experienceScore !== undefined) {
      experienceScores[step.id] = step.experienceScore;
    }
  }
}

async function migrateExperienceLane() {
  // Check if the experience lane already exists
  const existing = await db.lanes.get('lane-experience');
  if (existing) return;

  await db.transaction('rw', [db.lanes, db.steps], async () => {
    // Shift existing lane orders up by 1
    const allLanes = await db.lanes.where('journeyId').equals(JOURNEY_ID).toArray();
    for (const lane of allLanes) {
      await db.lanes.update(lane.id, { order: lane.order + 1 });
    }

    // Add the experience lane at order 0
    await db.lanes.add({
      id: 'lane-experience',
      journeyId: JOURNEY_ID,
      type: 'experience',
      name: 'Experience',
      order: 0,
    });

    // Patch experience scores onto existing steps
    for (const [stepId, score] of Object.entries(experienceScores)) {
      const step = await db.steps.get(stepId);
      if (step && step.experienceScore === undefined) {
        await db.steps.update(stepId, { experienceScore: score });
      }
    }
  });
}

async function migratePersonaAvatar() {
  const p = await db.personas.get(PERSONA_ID);
  if (p && p.avatarUrl !== '/persona-avatar.jpeg') {
    await db.personas.update(PERSONA_ID, { avatarUrl: '/persona-avatar.jpeg' });
  }
}

async function migrateEnrichFromResearch() {
  // Check if migration already ran by looking for a new insight
  const existing = await db.insights.get('ins-8');
  if (existing) return;

  await db.transaction('rw',
    [db.personas, db.insights, db.opportunities, db.laneItems, db.steps, db.phases],
    async () => {
      // Update persona with enriched data
      await db.personas.update(PERSONA_ID, {
        role: persona.role,
        description: persona.description,
        sees: persona.sees,
        says: persona.says,
        does: persona.does,
        hears: persona.hears,
        pains: persona.pains,
        gains: persona.gains,
      });

      // Add new insights (ins-8 through ins-13)
      const newInsights = insights.filter(i => parseInt(i.id.split('-')[1]) >= 8);
      await db.insights.bulkAdd(newInsights);

      // Add new opportunities (opp-6 through opp-10)
      const newOpps = opportunities.filter(o => parseInt(o.id.split('-')[1]) >= 6);
      await db.opportunities.bulkAdd(newOpps);

      // Update existing insights and opportunities with enriched descriptions
      for (const ins of insights.filter(i => parseInt(i.id.split('-')[1]) < 8)) {
        await db.insights.update(ins.id, { description: ins.description, experienceImpact: ins.experienceImpact, status: ins.status });
      }
      for (const opp of opportunities.filter(o => parseInt(o.id.split('-')[1]) < 6)) {
        await db.opportunities.update(opp.id, { description: opp.description });
      }

      // Add new lane items (pain mappings li-p-9 through li-p-20, opp mappings li-o-9 through li-o-17)
      const newLaneItemIds = [
        'li-p-9', 'li-p-10', 'li-p-11', 'li-p-12', 'li-p-13', 'li-p-15',
        'li-p-16', 'li-p-17', 'li-p-18', 'li-p-19', 'li-p-20',
        'li-o-9', 'li-o-11', 'li-o-12', 'li-o-13', 'li-o-14', 'li-o-15', 'li-o-16', 'li-o-17',
      ];
      const newItems = laneItems.filter(li => newLaneItemIds.includes(li.id));
      await db.laneItems.bulkAdd(newItems);

      // Update step names and touchpoints
      for (const pd of phasesData) {
        for (const step of pd.steps) {
          await db.steps.update(step.id, {
            name: step.name,
            touchpoints: step.touchpoints,
          });
        }
      }
    }
  );
}

async function migrateConsolidateSteps() {
  // Check if migration already ran by checking if step-0-1 still exists
  const step01 = await db.steps.get('step-0-1');
  if (!step01) return;

  await db.transaction('rw', [db.steps, db.laneItems], async () => {
    // Phase 0: Consolidate 3 steps → 1 ("Marketing develops creative")
    await db.steps.update('step-0-0', {
      name: 'Marketing develops creative',
      touchpoints: ['Figma', 'HubSpot', 'Creative briefs', 'Brief templates', 'Google Docs', 'Slack', 'Email'],
    });
    await db.steps.delete('step-0-1');
    await db.steps.delete('step-0-2');

    // Phase 3: Remove "Navigate the jargon gap" (it's a pain, not a step)
    await db.steps.delete('step-3-2');

    // Remove lane items that become duplicates after merging steps
    await db.laneItems.bulkDelete(['li-p-2', 'li-p-14', 'li-o-2', 'li-o-10']);

    // Remap lane items from deleted steps to their new homes
    await db.laneItems.update('li-o-13', { stepId: 'step-0-0' });  // opp-9 from step-0-1
    await db.laneItems.update('li-p-6', { stepId: 'step-3-0' });   // ins-5 from step-3-2
    await db.laneItems.update('li-p-19', { stepId: 'step-3-0' });  // ins-13 from step-3-2
    await db.laneItems.update('li-o-15', { stepId: 'step-3-0' });  // opp-10 from step-3-2

    // Delete touchpoint lane items for removed steps
    const allTpItems = await db.laneItems.where('laneId').equals('lane-touchpoints').toArray();
    const removedStepIds = ['step-0-1', 'step-0-2', 'step-3-2'];
    const toDelete = allTpItems.filter(li => removedStepIds.includes(li.stepId)).map(li => li.id);
    await db.laneItems.bulkDelete(toDelete);
  });
}

async function migrateAIAnalysisFlow() {
  // Check if migration already ran by looking for a new insight
  const existing = await db.insights.get('ins-14');
  if (existing) return;

  await db.transaction('rw',
    [db.steps, db.insights, db.opportunities, db.laneItems],
    async () => {
      // Update step names, touchpoints, experienceScores, momentOfTruth for phases 2-4
      const stepUpdates: Record<string, Partial<Step>> = {
        'step-2-0': { name: 'Review AI compliance analysis visualization', touchpoints: ['Decision tree view', 'AI analysis summary', 'Document viewer'], experienceScore: 1.0, momentOfTruth: false },
        'step-2-1': { name: 'Drill into flagged issues and AI comments', touchpoints: ['Anchored comments', 'Document highlights', 'Check detail panels'], experienceScore: 0.5, momentOfTruth: false },
        'step-2-2': { name: 'Override AI check results where judgment differs', touchpoints: ['Override controls', 'Analyst notes', 'Decision tree nodes'], experienceScore: -0.5, momentOfTruth: true },
        'step-2-3': { name: 'Cross-reference substantiation and past precedent', touchpoints: ['Substantiation library', 'Shared Drive', 'Precedent search'], experienceScore: -0.5, momentOfTruth: false },
        'step-2-4': { name: 'Interpret ambiguous regulations', touchpoints: ['Regulatory PDFs', 'FTC/CFPB guidance', 'Law firm newsletters'], experienceScore: -2.0, momentOfTruth: true },
        'step-2-5': { name: 'Calibrate to org risk tolerance and decide escalation', touchpoints: ['Internal playbooks', 'Risk framework docs', 'Email', 'Slack DMs'], experienceScore: -1.0, momentOfTruth: false },
        'step-3-0': { name: 'Annotate compliance results for marketing', touchpoints: ['Visualization annotations', 'Plain-language templates', 'Comment anchors'], experienceScore: 1.0, momentOfTruth: true },
        'step-3-1': { name: 'Send structured feedback from compliance view', touchpoints: ['In-app messaging', 'Structured feedback view', 'Email notifications'], experienceScore: 1.5, momentOfTruth: true },
        'step-4-0': { name: 'Walk marketing through compliance visualization', touchpoints: ['Shared visualization link', 'Screen share', 'Video calls'], experienceScore: 0.5, momentOfTruth: false },
        'step-4-1': { name: 'Explain AI rationale and analyst overrides', touchpoints: ['Decision tree walkthrough', 'Override annotations', 'Presentations'], experienceScore: 0.0, momentOfTruth: false },
        'step-4-2': { name: 'Navigate pushback from stakeholders', touchpoints: ['Meetings', 'Slack', 'Email threads'], experienceScore: -1.5, momentOfTruth: true },
      };
      for (const [id, update] of Object.entries(stepUpdates)) {
        await db.steps.update(id, update);
      }

      // Add new insights
      const newInsights = insights.filter(i => ['ins-14', 'ins-15'].includes(i.id));
      await db.insights.bulkAdd(newInsights);

      // Add new opportunities
      const newOpps = opportunities.filter(o => ['opp-11', 'opp-12', 'opp-13'].includes(o.id));
      await db.opportunities.bulkAdd(newOpps);

      // Remap existing lane items to new step meanings
      await db.laneItems.update('li-p-5', { stepId: 'step-2-3' });   // ins-4 → cross-ref step
      await db.laneItems.update('li-p-16', { stepId: 'step-2-3' });  // ins-11 → cross-ref step
      await db.laneItems.update('li-o-3', { stepId: 'step-2-3' });   // opp-2 → cross-ref step

      // Add new lane items for new insights/opportunities
      const newLaneItemIds = [
        'li-p-21', 'li-p-22',
        'li-o-18', 'li-o-19', 'li-o-20', 'li-o-21', 'li-o-22', 'li-o-23',
      ];
      const newItems = laneItems.filter(li => newLaneItemIds.includes(li.id));
      await db.laneItems.bulkAdd(newItems);

      // Update touchpoint lane items for phases 2-4
      const phase2to4StepIds = [
        'step-2-0', 'step-2-1', 'step-2-2', 'step-2-3', 'step-2-4', 'step-2-5',
        'step-3-0', 'step-3-1',
        'step-4-0', 'step-4-1', 'step-4-2',
      ];
      // Delete old touchpoint lane items for these steps
      const allTpItems = await db.laneItems.where('laneId').equals('lane-touchpoints').toArray();
      const toDelete = allTpItems.filter(li => phase2to4StepIds.includes(li.stepId)).map(li => li.id);
      await db.laneItems.bulkDelete(toDelete);

      // Add new touchpoint lane items from updated phasesData
      const newTpItems: LaneItem[] = [];
      let counter = 100; // offset to avoid ID collisions
      for (const pd of phasesData) {
        if (!['phase-2', 'phase-3', 'phase-4'].includes(pd.phase.id)) continue;
        for (const step of pd.steps) {
          if (step.touchpoints && step.touchpoints.length > 0) {
            for (const tp of step.touchpoints) {
              counter++;
              newTpItems.push({
                id: `li-tp-${counter}`,
                laneId: 'lane-touchpoints',
                stepId: step.id,
                refType: 'text',
                content: tp,
              });
            }
          }
        }
      }
      await db.laneItems.bulkAdd(newTpItems);
    }
  );
}

async function migrateNegativeOpportunityScores() {
  // Check if migration already ran by looking for ins-16
  const existing = await db.insights.get('ins-16');
  if (existing) return;

  await db.transaction('rw', [db.steps, db.insights, db.laneItems], async () => {
    // Lower experience scores — opportunity steps are still painful
    await db.steps.update('step-2-0', { experienceScore: -0.5 });
    await db.steps.update('step-3-0', { experienceScore: -0.5 });
    await db.steps.update('step-3-1', { experienceScore: -0.5 });
    await db.steps.update('step-4-0', { experienceScore: -1.0 });
    await db.steps.update('step-4-1', { experienceScore: -0.5 });

    // Add new insights explaining why
    const newInsightIds = ['ins-16', 'ins-17', 'ins-18', 'ins-19'];
    const newInsights = insights.filter(i => newInsightIds.includes(i.id));
    await db.insights.bulkAdd(newInsights);

    // Map new insights to steps as pain cards
    const newLaneItemIds = ['li-p-23', 'li-p-24', 'li-p-25', 'li-p-26'];
    const newItems = laneItems.filter(li => newLaneItemIds.includes(li.id));
    await db.laneItems.bulkAdd(newItems);
  });
}

async function migrateDeleteOldOpportunities() {
  // Check if migration already ran — opp-1 should no longer exist
  const existing = await db.opportunities.get('opp-1');
  if (!existing) return;

  await db.transaction('rw', [db.opportunities, db.laneItems], async () => {
    const oldOppIds = ['opp-1', 'opp-2', 'opp-3', 'opp-4', 'opp-5', 'opp-6', 'opp-7', 'opp-8', 'opp-9', 'opp-10'];
    await db.opportunities.bulkDelete(oldOppIds);

    // Delete lane items referencing old opportunities
    const oldOppLaneItemIds = [
      'li-o-1', 'li-o-3', 'li-o-4', 'li-o-5', 'li-o-6', 'li-o-7', 'li-o-8',
      'li-o-9', 'li-o-11', 'li-o-12', 'li-o-13', 'li-o-14', 'li-o-15', 'li-o-16', 'li-o-17',
    ];
    await db.laneItems.bulkDelete(oldOppLaneItemIds);
  });
}

export async function seedDatabase() {
  const count = await db.projects.count();
  if (count > 0) {
    // Existing DB — run migrations for new features
    await migrateExperienceLane();
    await migratePersonaAvatar();
    await migrateEnrichFromResearch();
    await migrateConsolidateSteps();
    await migrateAIAnalysisFlow();
    await migrateDeleteOldOpportunities();
    await migrateNegativeOpportunityScores();
    return;
  }

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
