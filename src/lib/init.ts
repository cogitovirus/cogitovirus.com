/* Only put server side things here */

import { Blog } from '$lib/dist/essays/blog';
import { Documentation } from '$lib/dist/about/docs';

export const blogs: Record<string, Blog> = {
  essays: new Blog({
    name: 'Essays',
    dirName: 'essays', // a slug type directory name inside src/content
    schemaType: 'BlogPosting',
    description: 'A show description of my blog',
  }),
};

export const documentation = new Documentation({
  name: 'About',
  dirName: 'about',
  description: '',
  schemaType: 'TechArticle',
});
