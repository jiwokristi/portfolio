export type NavItem = {
  title: string;
  description: string;
  href: string;
};

export const navItems: NavItem[] = [
  { title: 'Projects', description: 'Selected work and case studies', href: '/#projects' },
  { title: 'About', description: 'Philosophy, stack, and values', href: '/about' },
  { title: 'Resume', description: 'Experience and qualifications', href: '/resume' },
  { title: 'Contact', description: 'Start a conversation', href: 'mailto:priyadijiwo@gmail.com' },
];
