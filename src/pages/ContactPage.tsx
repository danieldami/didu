import React from 'react';
import { ContactScreen } from '../components/ContactScreen';
import { siteConfig } from '../config/site';
import { useRouteMeta } from '../utils/seo';

const ContactPage: React.FC = () => {
  useRouteMeta(`Contact | ${siteConfig.shortName}`, `Contact ${siteConfig.companyName} to ask about a property or book an inspection.`, '/contact');
  return <ContactScreen />;
};

export default ContactPage;
