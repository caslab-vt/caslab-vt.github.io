export const SITE = {
  website: 'https://caslab.ece.vt.edu/',
  author: 'Ryan K. Williams',
  description: 'The Coordination at Scale Laboratory at Virginia Tech studies networked dynamical systems, multi-robot coordination, and distributed decision-making.',
  title: 'CAS Lab',
  ogImage: 'caslab-og.png',
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  
  // Lab Info
  labName: 'CAS Lab',
  university: 'Virginia Tech',
  logo: '/assets/caslab_logo.png', // Logo path
  avatar: '/assets/caslab_logo.png', // Avatar for SEO/Schema
  email: 'rywilli1@vt.edu',

  // Navigation
  nav: [
    { text: 'Home', link: '/', key: 'home' },
    
    { text: 'Research', link: '/research', key: 'research' },
    { text: 'Team', link: '/team', key: 'team' },
    { text: 'Search', link: '/search', key: 'search' },
  ],

  // Custom Pages (Appended after 'Join Us')
  customPages: [] as any[],
  
  // i18n Config
  i18n: {
    enabled: false,
    defaultLocale: 'en',
  }
};

export const LOCALE = {
  lang: 'en', // html lang code. Set this empty and default will be "en"
  langTag: ['en-EN'], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: false,
  width: 216,
  height: 46,
};

export const SOCIALS = [
  {
    link: 'https://scholar.google.com/citations?user=CRclm5cAAAAJ',
    active: true,
  },
];

// Default language configuration
export const DEFAULT_LANG: 'zh' | 'en' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'ru' = 'en'; 
