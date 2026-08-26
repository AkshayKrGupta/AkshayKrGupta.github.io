/**
 * Current Focus & Activities (/now page data)
 * Single source of truth for the /now page.
 */

export interface NowSection {
  title: string;
  items: string[];
}

export const nowData = {
  lastUpdated: 'August 2026',
  headline: 'What I am currently focused on, building, researching, and architecting right now.',
  sections: [
    {
      title: 'GenAI, MCP Architecture & AI Governance',
      items: [
        'Architecting Model Context Protocol (MCP) servers, tool calling protocols, and abstract UI schema integration patterns for agentic LLM workflows.',
        'Establishing enterprise AI Governance frameworks, risk controls, and deterministic validation guardrails for GenAI adoption in regulated financial environments.',
        'Designing secure sandboxing and boundary isolation for autonomous developer tools and enterprise AI agents.'
      ]
    },
    {
      title: 'Current Projects & Active Development',
      items: [
        'Karvics (karvics.com) — Expanding the zero-knowledge, client-side developer and cryptography suite with new offline-first browser utilities (AES-256-GCM, Web Crypto, PDF manipulation).',
        'TwinPixCleaner (macOS) — Maintaining and enhancing the open-source photo deduplication utility using native Apple Vision Framework visual similarity and SHA-256 hashing.',
        'NanoPress (macOS) — Optimizing the multi-threaded local batch compression engine using native Swift concurrency (async/await, Actors) and PDFKit.'
      ]
    },
    {
      title: 'Technical Writing & Articles',
      items: [
        'Authoring deep dives on enterprise system architecture, distributed consensus, and "the parts nobody puts in the architecture diagram".',
        'Sharing architectural blueprints and lessons learned from building large-scale systems in Global FinTech at /blog/.',
        'Writing on AI integration patterns and developer tooling scalability.'
      ]
    },
    {
      title: 'Systems Research & Reading',
      items: [
        'Enterprise Integration Patterns & Event-Driven Governance in Regulated Environments.',
        'Fault-tolerant consensus state machines (Raft / Paxos) and multi-region replication architectures.',
        'Zero-trust security models for containerized microservices and Kubernetes infrastructure.'
      ]
    },
    {
      title: 'Available For',
      items: [
        'Collaborations on interesting open-source projects.',
        'Engineering & Architecture Mentoring.',
        'Enterprise Architecture & GenAI Consulting.'
      ]
    }
  ]
};
