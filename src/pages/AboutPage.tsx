import React from 'react';
import { AboutScreen } from '../components/AboutScreen';
import { siteConfig } from '../config/site';
import { useRouteMeta } from '../utils/seo';

const AboutPage: React.FC = () => {
  useRouteMeta(`About | ${siteConfig.shortName}`, `Learn about ${siteConfig.companyName}, our property services and how we work.`, '/about');
  return <AboutScreen />;
};

export default AboutPage;
