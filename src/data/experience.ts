/**
 * Professional Experience & Career Milestones
 * Single source of truth for career roadmap & timeline.
 */

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'London Stock Exchange Group',
    role: 'Senior Solutions Architect',
    location: 'Bengaluru, India 🇮🇳',
    startDate: 'Nov 2022',
    endDate: 'Present',
    current: true,
  },
  {
    id: 'exp-2',
    company: 'Wipro Limited',
    role: 'Solutions Architect',
    location: 'Bengaluru, India 🇮🇳',
    startDate: 'Jan 2020',
    endDate: 'Oct 2022',
    current: false,
  },
  {
    id: 'exp-3',
    company: 'Infosys Limited',
    role: 'Technology Lead',
    location: 'Bengaluru, India 🇮🇳',
    startDate: 'Jan 2018',
    endDate: 'Dec 2019',
    current: false,
  },
  {
    id: 'exp-4',
    company: 'Infosys Limited',
    role: 'Technology Analyst',
    location: 'Melbourne, Australia 🇦🇺',
    startDate: 'Jan 2016',
    endDate: 'Dec 2017',
    current: false,
  },
  {
    id: 'exp-5',
    company: 'Infosys Limited',
    role: 'Systems Engineer',
    location: 'Bengaluru, India 🇮🇳',
    startDate: 'Jul 2012',
    endDate: 'Dec 2015',
    current: false,
  },
];
