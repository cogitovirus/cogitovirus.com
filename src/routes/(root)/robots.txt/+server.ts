import { siteUrl, robotsNoIndex, docsPath } from '$lib/config';
import { joinPath } from '$lib/dist/utils';
import { blogs } from '$lib/init';

export const prerender = true;

export async function GET() {
  const headers = { 'Content-Type': 'text/plain' };
  const sitemap = joinPath(siteUrl, 'sitemap.xml');
  let disallow_blog_api = [];
  let robots: string[];

  for (const blog of Object.values(blogs)) {
    disallow_blog_api.push(`Disallow: /${blog.dirName}/api/`);
  }

  if (robotsNoIndex) {
    robots = ['User-agent: *', 'Disallow: /'];
  } else {
    robots = [
      `User-Agent: *`,
      `Allow: /`,
      ...disallow_blog_api,
      `Disallow: /${joinPath(docsPath, 'api')}/`,
      `Sitemap: ${sitemap}`,
    ];
  }

  return new Response(robots.join('\n'), { headers });
}
