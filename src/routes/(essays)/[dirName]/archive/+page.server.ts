import { blogs } from '$lib/init';
import type { EntryGenerator, PageServerLoad } from './$types';
import type { Blog } from '$lib/dist/essays/blog';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return Object.values(blogs).map((blog) => ({ dirName: blog.dirName }));
};

export const load: PageServerLoad = async ({ params }) => {
  let blog: Blog = blogs[params.dirName];
  return { yearPosts: blog.getPostsArchive(), blogDirName: blog.dirName };
};
