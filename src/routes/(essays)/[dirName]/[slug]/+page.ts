import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { joinPath } from '$lib/dist/utils';

export const prerender = true;

export const load: PageLoad = async ({ fetch, params }) => {
  const id = btoa(params.slug);
  const res = await fetch('/' + joinPath(params.dirName, `/api/${id}`));
  if (!res.ok) {
    error(res.status, `Post does not exist`);
  }
  let data = await res.json();

  if (data.redirectToSlug) {
    redirect(302, `/${joinPath(params.dirName, data.post.slug)}`);
  }

  if (data.post.redirectToUrl) {
    redirect(302, data.post.redirectToUrl);
  }

  const postImport = await import(
    `../../../../content/${params.dirName}/${data.post.dirName}/index.md`
  );
  data['PostComponent'] = postImport.default;
  data['blogDirName'] = params.dirName;

  return data;
};
