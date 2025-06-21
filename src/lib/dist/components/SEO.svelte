<script lang="ts">
  import * as config from '$lib/config';
  import { joinPath } from '$lib/dist/utils';
  import { serializeSchemaMarkup } from '$lib/dist/utils';
  import type { WithContext, Organization, Person, SiteNavigationElement } from 'schema-dts';
  import { page } from '$app/stores';

  interface Props {
    title?: string;
    description?: string;
    keywords?: string[];
    language?: string;
    image?: string;
    type?: string;
    twitterHandle?: string;
    twitterCard?: string;
    index?: Boolean;
    follow?: Boolean;
    pathname?: string;
  }

  let {
    title = config.siteName,
    description = config.siteDescription,
    keywords = config.siteKeywords,
    language = config.siteLanguage,
    image = config.siteImage,
    type = 'website',
    twitterHandle = config.twitterHandle,
    twitterCard = 'summary_large_image',
    index = !config.robotsNoIndex,
    follow = !config.robotsNoIndex,
    pathname = $page.url.pathname,
  }: Props = $props();

  let pageUrl: string = $derived(joinPath(config.siteUrl, pathname));

  if (title !== config.siteName) {
    title = `${title} - ${config.siteName}`;
  }

  const richSchema: WithContext<Organization | Person> = {
    '@context': 'https://schema.org',
    '@type': config.isOrganization ? 'Organization' : 'Person',
    '@id': `${config.siteUrl}#organization`,
    url: config.siteUrl,
    name: config.siteName,
    description: config.siteDescription,
    sameAs: config.sameAsLinks,
    logo: {
      '@type': 'ImageObject',
      url: joinPath(config.siteUrl, 'favicon.ico'),
    },
    image: {
      '@type': 'ImageObject',
      url: config.siteImage,
    },
  };

  const siteNavigation: SiteNavigationElement[] = [];
  for (const [name, path] of Object.entries(config.siteNavLinks)) {
    siteNavigation.push({
      '@type': 'SiteNavigationElement',
      name,
      url: joinPath(config.siteUrl, path),
    });
  }

  const siteNavSchema: WithContext<any> = {
    '@context': 'https://schema.org',
    '@graph': siteNavigation,
  };
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="robots" content="{follow ? 'follow' : 'nofollow'}, {index ? 'index' : 'noindex'}" />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords?.join(',')} />
  <link rel="canonical" href={pageUrl} />

  <meta property="og:site_name" content={config.siteName} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:locale" content={language} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:type" content={type} />

  <meta name="twitter:site" content={twitterHandle} />
  <meta name="twitter:creator" content={twitterHandle} />
  <meta name="twitter:card" content={twitterCard} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:url" content={pageUrl} />

  {#if config.fbAppId}
    <meta name="fb:app_id" content={config.fbAppId} />
  {/if}

  {@html serializeSchemaMarkup(richSchema)}
  {@html serializeSchemaMarkup(siteNavSchema)}
</svelte:head>
