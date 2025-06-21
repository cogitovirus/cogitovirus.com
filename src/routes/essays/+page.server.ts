import { blogs } from '$lib/init';

export async function load() {
  // Use the correct key 'essays' to access the Blog instance
  const posts = blogs.essays.getPosts ? blogs.essays.getPosts({ all: true }) : [];
  return {
    name: 'Essays',
    blogDirName: 'essays',
    posts
  };
}
