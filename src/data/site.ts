/**
 * Central Site Configuration & Personal Identity for Akshay K Gupta
 * Single source of truth for the entire site.
 */

export interface EntityTopic {
  name: string;
  sameAs?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  jobTitle: string;
  tagline: string;
  description: string;
  shortBio: string;
  url: string;
  location?: string;
  locationWikidata?: string;
  status: {
    text: string;
  };
  social: {
    github: string;
    linkedin: string;
  };
  profile: {
    image: string;
    alt: string;
  };
  blog: {
    name: string;
    description: string;
  };
  expertise: EntityTopic[];
}

export const site: SiteConfig = {
  name: 'Akshay Kr Gupta',
  shortName: 'Akshay K Gupta',
  title: 'Curious about systems. Serious about architecture.',
  jobTitle: 'Senior Solutions Architect',
  tagline: 'Designing enterprise systems for regulated environments - where architecture, AI, and governance intersect.',
  description: 'Personal portfolio and architecture notes by Akshay K Gupta — building enterprise-scale systems, AI in regulated industries, and system architecture.',
  shortBio: 'Designing enterprise systems for regulated environments — where architecture, AI, and governance intersect. Open to interesting architecture conversations & collaborations.',

  url: 'https://akshaykgupta.me',
  location: 'Bengaluru, India 🇮🇳',
  locationWikidata: 'https://www.wikidata.org/wiki/Q1355',

  status: {
    text: 'Open to interesting architecture conversations & collaborations',
  },

  social: {
    github: 'https://github.com/AkshayKrGupta',
    linkedin: 'https://www.linkedin.com/in/akshay-kr-gupta/',
  },

  profile: {
    image: '/profile.jpg',
    alt: 'Portrait of Akshay K Gupta',
  },

  blog: {
    name: 'Architecture Notes',
    description: 'Thinking and writing about systems, architecture, AI, and the decisions behind building software for regulated environments.',
  },

  expertise: [
    { name: 'Enterprise Architecture', sameAs: 'https://www.wikidata.org/wiki/Q1143890' },
    { name: 'Model Context Protocol (MCP)', sameAs: 'https://modelcontextprotocol.io' },
    { name: 'Distributed Systems & Computing', sameAs: 'https://www.wikidata.org/wiki/Q204481' },
    { name: 'Artificial Intelligence Governance', sameAs: 'https://www.wikidata.org/wiki/Q108170881' },
    { name: 'Financial Technology (FinTech)', sameAs: 'https://www.wikidata.org/wiki/Q22908584' },
    { name: 'Cloud Native & Kubernetes Infrastructure', sameAs: 'https://www.wikidata.org/wiki/Q22661360' },
    { name: 'High-Throughput Microservices', sameAs: 'https://www.wikidata.org/wiki/Q18344583' },
    { name: 'Software Architecture', sameAs: 'https://www.wikidata.org/wiki/Q211050' },
  ],
};
