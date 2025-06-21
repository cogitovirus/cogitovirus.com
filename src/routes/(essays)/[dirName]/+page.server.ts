import type { PageServerLoad, EntryGenerator } from './$types';
import { blogs } from '$lib/init';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const entries: EntryGenerator = () => {
  const entries = [];
  for (const blog of Object.keys(blogs)) {
    entries.push({ dirName: blog });
  }
  return entries;
};

export const load: PageServerLoad = async ({ params }) => {
  if (params.dirName in blogs) {
    const blog = blogs[params.dirName];
    return {
      blogName: blog.name,
      posts: blog.getPosts(),
      blogDirName: blog.dirName,
      blogDescription: blog.description,
      enableRssFeed: blog.enableRssFeed,
      enableCategory: blog.enableCategory,
      enableTag: blog.enableTag,
      enableArchive: blog.enableArchive,
    };
  }

  return error(404, 'Blog not found');
};
