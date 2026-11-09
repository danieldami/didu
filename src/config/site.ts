/**
 * Company details used across the site.
 * Replace every TODO_ value with approved company information before launch.
 */
export const siteConfig = {
  companyName: 'Chubank Property Ventures Limited',
  shortName: 'Chubank Property',
  domain: 'chubankproperty.com',
  tagline: 'TODO_TAGLINE',
  phone: '08033336792',
  whatsappNumber: '2348033336792',
  email: 'info@chubankproperty.com',
  officeAddress: '1st floor, shop 12 shopping complex, number 38 Oterubi Ogidan Street, Weighbridge, Owo-Onirin, Lagos',
  officeHours: '9:00 AM–5:00 PM',
  rcNumber: 'TODO_RC_NUMBER',
  foundedYear: '2012',
  socialLinks: {
    instagram: 'TODO_INSTAGRAM_URL',
    facebook: 'TODO_FACEBOOK_URL',
    linkedin: 'TODO_LINKEDIN_URL',
  },
  mapEmbedUrl: 'TODO_MAP_EMBED_URL',
  services: [] as string[],
  team: [] as { name: string; title: string; bio?: string }[],
  introduction: 'TODO_COMPANY_INTRODUCTION',
} as const;
