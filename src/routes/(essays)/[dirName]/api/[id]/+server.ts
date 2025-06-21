import { error, json } from '@sveltejs/kit';
import type { Post } from '$lib/dist/essays/types';
import { blogs } from '$lib/init';
import type { Blog } from '$lib/dist/essays/blog';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  const entries = [];
  for (const blog of Object.keys(blogs)) {
    for (const slug of blogs[blog].getPostSlugs()) {
      entries.push({ id: Buffer.from(slug).toString('base64'), dirName: blog });
    }
  }
  return entries;
};

export const GET: RequestHandler = async ({ params }) => {
  const slug = Buffer.from(params.id, 'base64').toString('utf-8');
  let blog: Blog;

  try {
    blog = blogs[params.dirName];
  } catch (e) {
    return error(404, `Post does not exist`);
  }

  let post: Post = blog.getPost(slug);

  if (!post) {
    error(404, `Post does not exist`);
  }

  let redirectToSlug = post.slug !== slug ? true : false;
  let { prev, next } = blog.getPrevNextPosts(post.slug);

  return json({
    post: post,
    schemaType: blog.schemaType,
    related: blog.relatedBlogPosts(slug),
    redirectToSlug: redirectToSlug,
    prev: prev,
    next: next,
  });
};
