import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function load() {
  const aboutDir = path.resolve('src/content/about');
  const files = fs.readdirSync(aboutDir).filter(f => f.endsWith('.md'));
  const toc = files.map(file => {
    const filePath = path.join(aboutDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    return {
      title: data.title || file.replace('.md', ''),
      slug: file === 'index.md' ? '' : file.replace('.md', ''),
      order: data.order || 99
    };
  }).sort((a, b) => a.order - b.order);
  return { toc };
}
