import { blogs } from '$lib/init';
import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  const entries = [];
  for (const blog of Object.keys(blogs)) {
    for (const slug of blogs[blog].getPostSlugs()) {
      entries.push({ dirName: blog, slug: slug });
    }
  }
  return entries;
};
