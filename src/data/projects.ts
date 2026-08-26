/**
 * Selected Projects & Engineering Portfolio
 */

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Completed' | 'In Progress' | 'Archived';
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: string;
}

export const projects: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'Karvics — Zero-Knowledge Privacy & Developer Suite',
    description: 'A privacy-first suite of client-side web tools (AES-256-GCM encryption, PDF manipulation, and developer utilities) operating entirely in-browser with zero cloud uploads.',
    status: 'Active',
    technologies: ['TypeScript', 'Web Crypto API', 'PWA', 'Wasm', 'Tailwind/CSS'],
    liveUrl: 'https://karvics.com',
    githubUrl: 'https://github.com/AkshayKrGupta/karvics-feedback',
    featured: true,
    metrics: '100% client-side zero-knowledge execution'
  },
  {
    id: 'proj-2',
    name: 'TwinPixCleaner',
    description: 'Privacy-first native macOS utility to scan, detect, and safely deduplicate photos using SHA-256 hash matching and Apple Vision framework visual similarity analysis.',
    status: 'Active',
    technologies: ['Swift', 'SwiftUI', 'Apple Vision Framework', 'macOS', 'SHA-256'],
    githubUrl: 'https://github.com/AkshayKrGupta/TwinPixCleaner',
    featured: true,
    metrics: 'Native Apple Vision AI & SHA-256'
  },
  {
    id: 'proj-3',
    name: 'NanoPress',
    description: 'Local-only batch media and document compression tool for macOS supporting multi-threaded parallel compression for JPG, PNG, HEIC, TIFF, and PDF files.',
    status: 'Active',
    technologies: ['Swift', 'SwiftUI', 'Swift Concurrency', 'macOS', 'PDFKit'],
    githubUrl: 'https://github.com/AkshayKrGupta/NanoPress',
    featured: true,
    metrics: 'High-throughput parallel batch processing'
  }
];
