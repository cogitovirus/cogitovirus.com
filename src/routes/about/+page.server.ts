import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { error } from '@sveltejs/kit';

export async function load() {
  const filePath = path.resolve('src/content/about/index.md');
  if (!fs.existsSync(filePath)) throw error(404, 'Not found');
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  return {
    frontmatter: data,
    body
  };
}
