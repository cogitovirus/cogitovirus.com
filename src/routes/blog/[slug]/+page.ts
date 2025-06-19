export async function load({ params }) {
  const post = await import(`../../../content/blog/${params.slug}.md`);
  return {
    content: post.default,
    metadata: post.metadata
  };
}
