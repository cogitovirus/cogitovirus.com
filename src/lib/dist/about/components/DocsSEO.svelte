<!-- <script lang="ts">
  import * as config from '$lib/config';
  import { joinPath, serializeSchemaMarkup } from '$lib/dist/utils';
  import SEO from '$lib/dist/components/SEO.svelte';
  import type { Doc, DocSchemaType } from '$lib/dist/docs/types';
  import type { WithContext, TechArticle, Article, SoftwareSourceCode } from 'schema-dts';

  interface Props {
    doc: Doc;
    pathname: string;
    schemaType?: DocSchemaType;
  }

  let { doc, pathname, schemaType = 'TechArticle' }: Props = $props();

  const docSchema: WithContext<TechArticle | Article | SoftwareSourceCode> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: doc.title,
    description: doc.description,
    url: joinPath(config.siteUrl, pathname),
    datePublished: doc.date,
    dateModified: doc.lastmod_date,
  };
</script>

<SEO
  title="{doc.title} - Docs"
  description={doc.description ?? ''}
  keywords={doc.tags ?? []}
  type="website"
  index={!doc.draft && !doc.robotsNoIndex}
  {pathname}
/>

<svelte:head>
  {@html serializeSchemaMarkup(docSchema)}
</svelte:head> -->
