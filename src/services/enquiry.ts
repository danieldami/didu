import { siteConfig } from '../config/site';
import { whatsappUrl } from '../utils/contact';

export interface EnquiryDetails {
  name: string;
  phone: string;
  email: string;
  message: string;
}

/** Opens a prefilled WhatsApp enquiry and returns the email fallback URL. */
export const submitEnquiry = (details: EnquiryDetails): string => {
  const body = [
    'Property enquiry',
    `Name: ${details.name.trim()}`,
    `Phone: ${details.phone.trim()}`,
    `Email: ${details.email.trim() || 'Not provided'}`,
    `Message: ${details.message.trim()}`,
  ].join('\n');
  window.open(whatsappUrl(body), '_blank', 'noopener,noreferrer');
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent('Property enquiry')}&body=${encodeURIComponent(body)}`;
};
