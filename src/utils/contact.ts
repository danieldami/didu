import { siteConfig } from '../config/site';

export const whatsappUrl = (message: string): string => `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
