// site config
export const siteName: string = 'cogitovirus.com';
export const siteUrl: string = 'https://cogitovirus.com';
export const siteDescription: string =
  'This site is a creative outlet for writing about engineering, software, and whatever hijacks my curiosity.';
export const siteKeywords: string[] =["personal website", "software", "data engineering", "engineering", "AI"];
export const siteLanguage: string = 'en_US';
export const siteImage: string = `${siteUrl}/social.png`;
export const isOrganization: Boolean = true;

// social link
export const twitterHandle: string = '@cogitovirus3';
export const fbAppId: string | null = null;
export const sameAsLinks: string[] = [
  // add other related websites
  // social account links
];

// SEO
export const siteNavLinks = {
  Home: '/',
  // Pricing: '/pricing',
  Blog: '/essays',
  Docs: '/docs',
};

export const robotsNoIndex: Boolean = false; // set to true to prevent indexing on search engine

// Docs
export const docsPath: string = 'about';
