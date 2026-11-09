import { useEffect } from 'react';
import { siteConfig } from '../config/site';

export const canonicalUrl = (path: string): string => `https://${siteConfig.domain}${path === '/' ? '/' : path.replace(/\/$/, '')}`;

export const useRouteMeta = (title: string, description: string, path: string): void => {
  useEffect(() => {
    document.title = title;
    let descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.name = 'description';
      document.head.append(descriptionTag);
    }
    descriptionTag.content = description;

    let canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.append(canonicalTag);
    }
    canonicalTag.href = canonicalUrl(path);
  }, [title, description, path]);
};
