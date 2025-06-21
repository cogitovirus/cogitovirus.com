<script lang="ts">
  import type { PageData } from './$types';
  import { joinPath } from '$lib/dist/utils';
  import { openHref } from '$lib/dist/dom';
  import BlogContainer from '$lib/dist/essays/components/BlogContainer.svelte';
  import SEO from '$lib/dist/components/SEO.svelte';
  import PostListLayout from '$lib/dist/essays/components/PostListLayout.svelte';
  import { Rss } from 'lucide-svelte';
  import NavLink from '$lib/dist/components/NavLink.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<SEO title={data.blogName} description={data.blogDescription} />

<svelte:head>
  {#if data.enableRssFeed}
    <link
      rel="alternate"
      type="application/atom+xml"
      href="/{joinPath(data.blogDirName, 'rss.xml')}"
    />
  {/if}
</svelte:head>

<BlogContainer className="mt-2">
  <div class="mb-6 flex justify-between gap-x-8 px-6">
    <h1 class="text-base-content/80 text-2xl font-extrabold md:text-5xl">
      {data.blogName}
      {#if data.enableRssFeed}
        <a
          class="hidden cursor-pointer hover:text-orange-300 md:inline"
          href="/{joinPath(data.blogDirName, 'rss.xml')}"
          aria-label="RSS feed"
          onclick={openHref}
        >
          <Rss class="inline font-bold" size={24} />
        </a>
      {/if}
    </h1>

    <div class="flex items-center gap-4">
      {#if data.posts.length > 0}
        {#if data.enableCategory}
          <NavLink
            link="/{joinPath(data.blogDirName, 'category')}"
            name="Category"
            className="text-base-content/80"
          />
        {/if}
        {#if data.enableTag}
          <NavLink
            link="/{joinPath(data.blogDirName, 'tag')}"
            name="Tags"
            className="text-base-content/80"
          />
        {/if}
        {#if data.enableArchive}
          <NavLink
            link="/{joinPath(data.blogDirName, 'archive')}"
            name="Archive"
            className="text-base-content/80"
          />
        {/if}
      {/if}
    </div>
  </div>

  {#if data.posts.length > 0}
    <PostListLayout posts={data.posts} blogDirName={data.blogDirName} />
  {:else}
    <div class="flex min-h-80 items-center justify-center">
      <p class="text-base-content text-2xl font-bold">NO POSTS FOUND</p>
    </div>
  {/if}
</BlogContainer>
