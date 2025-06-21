import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load: PageLoad = async ({ params }) => {
  const slug = params.slug;
  try {
    const postImport = await import(`../../../content/about/${slug}/index.md`);
    return {
      PostComponent: postImport.default
    };
  } catch (e) {
    throw error(404, 'Not found');
  }
};
