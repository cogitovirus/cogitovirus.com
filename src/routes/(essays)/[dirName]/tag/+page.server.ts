import { blogs } from '$lib/init';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  let entries = [];
  for (const blog of Object.values(blogs)) {
    entries.push({ dirName: blog.dirName });
  }
  return entries;
};

export const load: PageServerLoad = async ({ params }) => {
  return { tags: blogs[params.dirName].tags(), blogDirName: params.dirName };
};
