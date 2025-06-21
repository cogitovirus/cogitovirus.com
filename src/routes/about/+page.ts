import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load: PageLoad = async () => {
  try {
    const postImport = await import('../../content/about/introduction/index.md');
    return {
      PostComponent: postImport.default
    };
  } catch (e) {
    throw error(404, 'Not found');
  }
};
