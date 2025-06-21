import { blogs } from '$lib/init';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return Object.values(blogs).map((blog) => ({ dirName: blog.dirName }));
};

export const load: PageServerLoad = async ({ params }) => {
  return { categories: blogs[params.dirName].categories(), blogDirName: params.dirName };
};
