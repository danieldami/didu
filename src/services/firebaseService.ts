import { Property, Project } from '../types';
import { PROPERTIES_DATA, PROJECTS_DATA } from '../data/mockData';
import { LeadSubmission } from '../utils/security';

// Demo-only persistence. Everything stays in this browser; no backend or external account is required.
const read = <T,>(key: string, fallback: T): T => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
};
const write = (key: string, value: unknown) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* demo remains usable for this session */ } };

export const getDeletedPropertyIds = (): string[] => read('didu_deleted_properties', []);
export const clearDeletedPropertyIdsLocally = () => { try { localStorage.removeItem('didu_deleted_properties'); localStorage.removeItem('didu_properties'); } catch {} };
export const markPropertyAsDeletedLocally = (id: string) => { const ids = getDeletedPropertyIds(); if (!ids.includes(id)) write('didu_deleted_properties', [...ids, id]); setPropertiesCache(getPropertiesCache().filter(p => p.id !== id)); };
export const getPropertiesCache = (): Property[] => read('didu_properties', PROPERTIES_DATA);
export const setPropertiesCache = (items: Property[]) => write('didu_properties', items.filter(p => p && !p.isDeleted));
export const mergeWithUserListings = (items: Property[]) => items.filter(p => p && !p.isDeleted);

export const subscribeFirestoreProperties = (callback: (items: Property[]) => void) => { callback(getPropertiesCache()); return () => {}; };
export const fetchFirestoreProperties = async () => getPropertiesCache();
export const saveFirestoreProperty = async (property: Property) => { const items = getPropertiesCache(); setPropertiesCache([property, ...items.filter(p => p.id !== property.id)]); return true; };
export const deleteFirestoreProperty = async (id: string) => { markPropertyAsDeletedLocally(id); return true; };

export const subscribeFirestoreProjects = (callback: (items: Project[]) => void) => { callback(read('didu_projects', PROJECTS_DATA)); return () => {}; };
export const fetchFirestoreProjects = async () => read('didu_projects', PROJECTS_DATA);
export const saveFirestoreProject = async (project: Project) => { const items = read<Project[]>('didu_projects', PROJECTS_DATA); write('didu_projects', [project, ...items.filter(p => p.id !== project.id)]); return true; };
export const deleteFirestoreProject = async (id: string) => { write('didu_projects', read<Project[]>('didu_projects', PROJECTS_DATA).filter(p => p.id !== id)); return true; };

export const subscribeFirestoreLeads = (callback: (items: LeadSubmission[]) => void) => { callback(read('didu_leads', [])); return () => {}; };
export const fetchFirestoreLeads = async () => read<LeadSubmission[]>('didu_leads', []);
export const saveFirestoreLead = async (lead: LeadSubmission) => { write('didu_leads', [lead, ...read<LeadSubmission[]>('didu_leads', []).filter(item => item.id !== lead.id)]); return true; };
export const deleteFirestoreLead = async (id: string) => { write('didu_leads', read<LeadSubmission[]>('didu_leads', []).filter(item => item.id !== id)); return true; };

export const fetchFirestoreAccounts = async (): Promise<any[]> => read('didu_demo_accounts', []);
export const getFirestoreAccount = async (identifier: string): Promise<any | null> => (await fetchFirestoreAccounts()).find(account => account.email?.toLowerCase() === identifier.toLowerCase() || account.phone === identifier) || null;
export const saveFirestoreAccount = async (account: any) => { if (!account) return false; const items = await fetchFirestoreAccounts(); write('didu_demo_accounts', [account, ...items.filter(item => item.id !== account.id && item.email !== account.email)]); return true; };
export const saveUserFavorite = async (userId: string, propertyId: string) => { const items = read<string[]>('didu_favorites', []); const id = `${userId}_${propertyId}`; write('didu_favorites', items.includes(id) ? items : [...items, id]); return true; };
export const getUserFavorites = async (userId: string) => read<string[]>('didu_favorites', []).filter(id => id.startsWith(`${userId}_`)).map(id => id.slice(userId.length + 1));
