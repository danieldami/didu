import React from 'react';
import { Project } from '../types';
import { siteConfig } from '../config/site';

interface ProjectsScreenProps { projects: Project[]; onContactProject: (projectName?: string) => void; }

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ projects, onContactProject }) => <section className="bg-brand-cream px-5 py-16 sm:px-8 lg:px-12">
  <div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-primary">Projects</p><h1 className="mt-3 font-serif-luxury text-4xl text-brand-primary sm:text-5xl">Developments and estates</h1>
    {projects.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center"><p className="text-gray-600">Project information will appear here when available.</p><button type="button" onClick={() => onContactProject()} className="mt-5 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">Contact {siteConfig.shortName}</button></div> : <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map(project => <article key={project.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white"><img src={project.coverImage} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" /><div className="p-5"><p className="text-sm text-gray-500">{project.locality}</p><h2 className="mt-2 font-serif-luxury text-2xl text-brand-primary">{project.name}</h2><p className="mt-3 text-sm leading-6 text-gray-600">{project.description}</p><button type="button" onClick={() => onContactProject(project.name)} className="mt-5 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white">Enquire about this project</button></div></article>)}</div>}
  </div>
</section>;
