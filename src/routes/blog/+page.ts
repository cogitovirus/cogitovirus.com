export async function load() {
  const posts = Object.entries(
    import.meta.glob('/src/content/blog/*.md', { eager: true })
  ).map(([path, post]: any) => ({
    slug: path.split('/').pop().replace('.md', ''),
    ...post.metadata
  }));

  return { posts };
}
