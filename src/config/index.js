const config = {
  siteName: 'MainFarm',
  domain: 'mainfarm.org',
  apiBaseUrl: 'http://localhost:5006/api',
  uploadsBaseUrl: 'http://localhost:5006',
  cookieName: 'mainfarm_token',
  pageSize: 10,
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Businesses', href: '/businesses' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export default config;
