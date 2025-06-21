<script lang="ts">
  import * as config from '$lib/config';
  import SEO from '$lib/dist/components/SEO.svelte';
  import type { BlogSchemaType, Post } from '$lib/dist/essays/types';
  import type {
    BlogPosting,
    TechArticle,
    Article,
    NewsArticle,
    Report,
    WithContext,
    SoftwareSourceCode,
  } from 'schema-dts';
  import { serializeSchemaMarkup } from '$lib/dist/utils';
  import { joinPath } from '$lib/dist/utils';
  import { dateToISO } from '$lib/dist/essays/utils';

  interface Props {
    post: Post;
    blogDirName: string;
    schemaType?: BlogSchemaType;
  }
  let { post, blogDirName, schemaType = 'Article' }: Props = $props();

  let pathname = $derived(joinPath(blogDirName, post.slug));
  let pageUrl = $derived(joinPath(config.siteUrl, pathname));
  let datePublished = $derived(dateToISO(post.date));
  let dateModified = $derived(post?.lastmod_date ? dateToISO(post.lastmod_date) : undefined);
  const author = post.author?.map((author) => author.name).join(', ');

  let opengraphImage = $derived.by(() => {
    if (post.image) {
      return joinPath(config.siteUrl, post.image);
    } else {
      return `https://social-share-images.vercel.app/${encodeURIComponent(post.title)}.png`;
    }
  });

  const postSchema: WithContext<
    BlogPosting | TechArticle | Article | NewsArticle | Report | SoftwareSourceCode
  > = $derived({
    '@context': 'https://schema.org',
    '@type': schemaType,
    identifier: post.slug,
    headline: post.title,
    name: post.title,
    description: post.description,
    keywords: post.keywords.length > 0 ? post.keywords : post.tags,
    inLanguage: config.siteLanguage,
    datePublished: datePublished,
    dateModified: dateModified,
    isAccessibleForFree: true,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    image: {
      '@type': 'ImageObject',
      url: opengraphImage,
    },
    author: post.author.map((author) => {
      return {
        '@type': author.type,
        name: author.name,
        url: author.url ?? '',
      };
    }),
  });
</script>

<SEO
  title={post.title}
  description={post.description}
  keywords={post.keywords.length > 0 ? post.keywords : post.tags}
  image={opengraphImage}
  type="article"
  index={!post.robotsNoIndex}
  {pathname}
/>

<svelte:head>
  <meta property="article:section" content="posts" />
  <meta property="article:published_time" content={datePublished} />
  <meta property="article:modified_time" content={dateModified} />
  {#each post.tags ?? [] as tag}
    <meta property="article:tag" content={tag} />
  {/each}
  <meta name="author" content={author} />

  {@html serializeSchemaMarkup(postSchema)}
</svelte:head>
