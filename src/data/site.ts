/**
 * Central Site Configuration & Personal Identity for Akshay K Gupta
 * Single source of truth for the entire site.
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  description: string;
  shortBio: string;
  longBio: string[];
  url: string;
  basePath: string;
  location?: string;
  status: {
    available: boolean;
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
    postsPerPage: number;
  };
}

export const site: SiteConfig = {
  name: 'Akshay Kr Gupta',
  shortName: 'Akshay K Gupta',
  title: 'Senior Solutions Architect',
  tagline: 'Building enterprise-scale systems with Global FinTech. Now writing about the parts nobody puts in the architecture diagram.',
  description: 'Personal portfolio and technical articles by Akshay K Gupta — Senior Solutions Architect building enterprise-scale systems, AI in regulated industries, and system architecture.',

  shortBio: 'Senior Solutions Architect building enterprise-scale systems with Global FinTech. Writing about enterprise architecture, AI adoption in regulated industries, and developer tooling.',

  longBio: [
    'I have spent over a decade architecting systems, which has taught me that the interesting problems are rarely the technical ones — they are the trade-offs, the governance questions, and the "why did we actually build it this way" conversations.',
    'I write about enterprise architecture, AI adoption in regulated industries, Model Context Protocol (MCP), and the occasional opinion on developer tooling.',
    'My work spans large-scale distributed systems, high-availability data infrastructure, and practical AI engineering in mission-critical environments.'
  ],

  url: 'https://akshaykrgupta.github.io',
  basePath: '/',
  location: 'Bengaluru, India 🇮🇳 ',

  status: {
    available: true,
    text: 'Collaborations on open-source, Mentoring & Architecture Consulting',
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
    name: 'Technical Articles',
    description: 'Practical insights into enterprise architecture, distributed systems, AI adoption in regulated industries, and developer tooling.',
    postsPerPage: 10,
  },
};
