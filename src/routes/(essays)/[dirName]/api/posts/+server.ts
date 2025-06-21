import { error, json } from '@sveltejs/kit';
import { blogs } from '$lib/init';
import type { Blog } from '$lib/dist/essays/blog';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  const entries = [];
  for (const blog of Object.keys(blogs)) {
    entries.push({ dirName: blog });
  }
  return entries;
};

export const GET: RequestHandler = async ({ params }) => {
  let blog: Blog;

  try {
    blog = blogs[params.dirName];
  } catch (e) {
    return error(404, `Post does not exist`);
  }

  return json({ posts: blog.getPosts() });
};
