import type { Doc } from './types';

export function defaultDoc(): Doc {
  return {
    title: '',
    description: '',
    slug: '',
    order: 999,
    date: '',
    lastmod_date: '',
    tags: [],
    draft: false,
    section: false,
    robotsNoIndex: false,
    content: '',
    children: [],
    path: '',
  };
}

export function fillInDocsData(data: Doc, fallback: Doc): Doc {
  for (const key in fallback) {
    if (
      data[key as keyof Doc] === undefined ||
      data[key as keyof Doc] === null ||
      data[key as keyof Doc] === ''
    ) {
      // @ts-ignore
      data[key] = fallback[key as keyof Doc];
    }
  }
  return data;
}
