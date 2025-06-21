import * as config from '$lib/config';
import { joinPath } from '$lib/dist/utils';
import { documentation } from '$lib/init';
import { blogs } from '$lib/init';

export const prerender = true;

export async function GET() {
  const pages = ['', 'pricing'];

  const blogSitemapUrls = Object.values(blogs)
    .map((blog) => blog.sitemapUrlTags())
    .join('');

  const sitemap = `
	  <?xml version="1.0" encoding="UTF-8" ?>
	  <urlset
	    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
	    xmlns:xhtml="https://www.w3.org/1999/xhtml"
	    xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
	    xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
	    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
	    xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
	  >
	    ${pages
        .map((page) => {
          return `
	          <url>
	            <loc>${joinPath(config.siteUrl, page)}</loc>
	            <lastmod>${new Date().toISOString()}</lastmod>
				<changefreq>daily</changefreq>
	          </url>
	        `;
        })
        .join('')}
      ${blogSitemapUrls}
      ${documentation.sitemapUrlTags().join('')}
	  </urlset>
	`.trim();

  return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' } });
}
