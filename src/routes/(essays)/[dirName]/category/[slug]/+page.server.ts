import { slugify } from '$lib/dist/utils';
import { blogs } from '$lib/init';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  let entries = [];
  for (const blog of Object.values(blogs)) {
    for (const category of blog.categories()) {
      entries.push({ dirName: blog.dirName, slug: slugify(category) });
    }
  }
  return entries;
};

export const load: PageServerLoad = async ({ params }) => {
  const { name, posts } = blogs[params.dirName].getPostsByCategory(params.slug);
  return { name: name, blogDirName: params.dirName, posts: posts };
};
