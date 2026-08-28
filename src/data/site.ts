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
  url: string;
  location?: string;
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
}

export const site: SiteConfig = {
  name: 'Akshay Kr Gupta',
  shortName: 'Akshay K Gupta',
  title: 'Curious about systems. Serious about architecture.',
  tagline: 'Designing enterprise systems for regulated environments - where architecture, AI, and governance intersect.',
  description: 'Personal portfolio and architecture notes by Akshay K Gupta — building enterprise-scale systems, AI in regulated industries, and system architecture.',
  shortBio: 'Designing enterprise systems for regulated environments — where architecture, AI, and governance intersect. Open to interesting architecture conversations & collaborations.',

  url: 'https://akshaykgupta.me',
  location: 'Bengaluru, India 🇮🇳 ',

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
};
