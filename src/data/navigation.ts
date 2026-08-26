/**
 * Navigation items for Header and Footer
 */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const mainNavItems: NavItem[] = [
  { label: 'Overview', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Writing', href: '/blog/' },
  { label: 'Now', href: '/now/' },
];

export const footerNavItems: NavItem[] = [
  { label: 'Portfolio', href: '/' },
  { label: 'Writing', href: '/blog/' },
  { label: 'Now', href: '/now/' },
];
