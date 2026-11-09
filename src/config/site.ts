/**
 * Company details used across the site.
 * Replace every TODO_ value with approved company information before launch.
 */
export const siteConfig = {
  companyName: 'Chubank Property Ventures Limited',
  shortName: 'Chubank Property',
  domain: 'chubankproperty.com',
  tagline: 'TODO_TAGLINE',
  phone: 'TODO_PHONE',
  whatsappNumber: 'TODO_WHATSAPP_NUMBER',
  email: 'TODO_EMAIL',
  officeAddress: 'TODO_OFFICE_ADDRESS',
  officeHours: 'TODO_OFFICE_HOURS',
  rcNumber: 'TODO_RC_NUMBER',
  foundedYear: 'TODO_FOUNDED_YEAR',
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
