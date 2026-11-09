import React from 'react';
import { ProjectsScreen } from '../components/ProjectsScreen';
import { getProjects } from '../data/listings';
import { useRouteMeta } from '../utils/seo';
import { siteConfig } from '../config/site';

const ProjectsPage: React.FC = () => {
  useRouteMeta(`Projects | ${siteConfig.shortName}`, `Explore developments and estates from ${siteConfig.companyName}.`, '/projects');
  const contact = () => window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hello, I would like to enquire about your projects.')}`, '_blank', 'noopener,noreferrer');
  return <ProjectsScreen projects={getProjects()} onContactProject={contact} />;
};

export default ProjectsPage;
