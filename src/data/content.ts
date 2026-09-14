export interface Slide {
  title: string;
  body: string;
  tab: string;
  link: string;
  href: string;
  img: number;
}

export interface Pillar {
  n: string;
  title: string;
  body: string;
}

export interface Fact {
  value: string;
  label: string;
}

export interface Solution {
  title: string;
  body: string;
  details: string[];
  stack: string[];
  ttv: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const SLIDES: Slide[] = [
  {
    title: "AI automation, built to run in production.",
    body: "We design, develop, deploy and maintain agentic systems across support, sales, marketing and operations — then stay on to operate them.",
    tab: "The practice",
    link: "See our solutions",
    href: "#solutions",
    img: 180
  },
  {
    title: "Answer every customer in seconds, at any hour.",
    body: "Support and WhatsApp agents that resolve tier-one enquiries on their own and hand the rest to your team with the full context attached.",
    tab: "Customer operations",
    link: "See support agents",
    href: "#solutions",
    img: 3
  },
  {
    title: "Qualify and route every lead before a competitor replies.",
    body: "Sales agents that score inbound against your own ICP, enrich the record, and start the follow-up within minutes of the form hitting.",
    tab: "Revenue",
    link: "See sales agents",
    href: "#solutions",
    img: 160
  },
  {
    title: "Automation you can audit, not just admire.",
    body: "Evaluation, guardrails and reporting ship with the build — so every automated decision is visible, explainable and yours.",
    tab: "Governance",
    link: "See our solutions",
    href: "#solutions",
    img: 48
  }
];

export const PILLARS: Pillar[] = [
  {
    n: "01",
    title: "Design",
    body: "Process mapping and automation scoring before a line of code. We say no to poor candidates, in writing."
  },
  {
    n: "02",
    title: "Build",
    body: "Production systems on your stack, with the evaluation set and guardrails written alongside the features."
  },
  {
    n: "03",
    title: "Deploy",
    body: "Staged rollout behind human review, so confidence is earned on your own data rather than in a demo."
  },
  {
    n: "04",
    title: "Maintain",
    body: "We stay on: monitoring, model changes, knowledge refresh, and a named owner you can actually call."
  }
];

export const FACTS: Fact[] = [
  { value: "1 week", label: "To a scoped, costed automation plan" },
  { value: "3 weeks", label: "Typical pilot from kickoff to live" },
  { value: "24/7", label: "Agent coverage, with human escalation paths" },
  { value: "70%", label: "Of tier-one enquiries resolved without a human" }
];

export const SOLUTIONS: Solution[] = [
  {
    title: "AI Customer Service & Support Agents",
    body: "Tier-one resolution across chat, email and voice, with confident hand-off the moment a question leaves scope.",
    details: [
      "Knowledge ingestion from docs, tickets and past resolutions",
      "Escalation rules and human hand-off with full conversation context",
      "Deflection, containment and satisfaction reporting per channel"
    ],
    stack: ["Retrieval grounding", "Helpdesk API", "Eval suite"],
    ttv: "3–4 weeks"
  },
  {
    title: "AI Sales & Lead Generation Agents",
    body: "Qualification, enrichment and follow-up on every inbound lead within minutes, not days.",
    details: [
      "Inbound qualification against written ICP criteria",
      "CRM enrichment and automatic routing to the right owner",
      "Sequenced follow-up with reply and intent detection"
    ],
    stack: ["CRM integration", "Enrichment APIs", "Scoring model"],
    ttv: "2–3 weeks"
  },
  {
    title: "WhatsApp AI Business Agents",
    body: "Cloud API agents on the channel your customers already use — enquiries, bookings, order status and payments.",
    details: [
      "WhatsApp Business Cloud API setup and template approval",
      "Catalogue, booking and order-status conversation flows",
      "Payment links and automated post-purchase notifications"
    ],
    stack: ["WhatsApp Cloud API", "Order system", "Payment links"],
    ttv: "3 weeks"
  },
  {
    title: "AI Marketing Automation Platform",
    body: "Campaign production and lifecycle messaging generated, approved and dispatched on a cadence you control.",
    details: [
      "Segment-aware content generation inside brand guardrails",
      "Human approval gate before anything ships",
      "Attribution back to the source campaign and segment"
    ],
    stack: ["ESP / CDP", "Brand guardrails", "Attribution"],
    ttv: "4 weeks"
  },
  {
    title: "AI Workflow & Business Process Automation",
    body: "The back-office work nobody wants: document handling, reconciliation, approvals and internal routing.",
    details: [
      "Process mapping and automation scoring before we build",
      "Document extraction, validation and exception queues",
      "Audit trail for every automated decision"
    ],
    stack: ["Workflow engine", "OCR + extraction", "Audit log"],
    ttv: "4–6 weeks"
  },
  {
    title: "Generative AI Engine Optimization",
    body: "Being cited by AI answer engines is its own discipline. We make your expertise the source they quote.",
    details: [
      "Answer-engine visibility audit across the major assistants",
      "Entity, schema and citable-content restructuring",
      "Monthly share-of-answer tracking against competitors"
    ],
    stack: ["Schema / entities", "Content system", "Answer tracking"],
    ttv: "2 weeks to audit"
  }
];

export const MARQUEE_ITEMS = [
  "Support agents",
  "Sales agents",
  "WhatsApp agents",
  "Marketing automation",
  "Process automation",
  "Answer-engine visibility",
  "Support agents",
  "Sales agents",
  "WhatsApp agents",
  "Marketing automation",
  "Process automation",
  "Answer-engine visibility"
];

export const SOCIALS: SocialLink[] = [
  { label: "LinkedIn", href: "#contact" },
  { label: "X", href: "#contact" },
  { label: "Instagram", href: "#contact" },
  { label: "YouTube", href: "#contact" },
  { label: "GitHub", href: "#contact" }
];

export const FOOTER_SOLUTIONS = [
  "Support agents",
  "Sales agents",
  "WhatsApp agents",
  "Marketing automation",
  "Process automation",
  "GEO"
];
