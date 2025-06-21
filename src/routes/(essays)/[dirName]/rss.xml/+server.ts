import { joinPath } from '$lib/dist/utils';
import * as config from '$lib/config';
import type { PostList } from '$lib/dist/essays/types';
import type { RequestHandler, EntryGenerator } from './$types';
import { blogs } from '$lib/init';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return Object.values(blogs).map((blog) => ({ dirName: blog.dirName }));
};

export const GET: RequestHandler = async ({ params }) => {
  const blog = blogs[params.dirName ?? ''];

  if (!blog.enableRssFeed) {
    return new Response('RSS feed is disabled', { headers: { 'Content-Type': 'text/plain' } });
  }

  const blogUrl = joinPath(config.siteUrl, blog.dirName);
  const posts: PostList[] = blog.getPosts();

  const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${blog.name}</title>
				<description>${blog.description}</description>
				<link>${blogUrl}</link>
				<atom:link href="${joinPath(config.siteUrl, blog.dirName, 'rss.xml')}" rel="self" type="application/rss+xml"/>
				${posts
          .reverse()
          .map(
            (post) => `<item>
                          <title>${post.title}</title>
                          <description>${post.description}</description>
                          <link>${joinPath(blogUrl, post.slug)}</link>
                          <guid isPermaLink="true">${joinPath(blogUrl, post.slug)}</guid>
                          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
                      </item>`
          )
          .join('')}
			</channel>
		</rss>
	`.trim();

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
