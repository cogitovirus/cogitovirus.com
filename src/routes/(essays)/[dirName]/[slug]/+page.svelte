<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/dist/essays/utils.js';
  import { siteUrl } from '$lib/config';
  import { joinPath, slugify } from '$lib/dist/utils.js';
  import BlogContainer from '$lib/dist/essays/components/BlogContainer.svelte';
  import TOC from '$lib/dist/essays/components/Toc.svelte';
  import ScrollToTop from '$lib/dist/components/ScrollToTop.svelte';
  import Pill from '$lib/dist/components/Pill.svelte';
  import { ChevronLeft, ChevronRight, DotIcon, EyeOff, Ghost, SquarePen } from 'lucide-svelte';
  import BlogSEO from '$lib/dist/essays/components/BlogSEO.svelte';
  import CardIconMini from '$lib/dist/components/CardIconMini.svelte';
  import SocialShare from '$lib/dist/components/SocialShare.svelte';
  import BackToBlog from '$lib/dist/essays/components/BackToBlog.svelte';
  import { IS_PROD } from '$lib/dist/vars';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  let pageUrl = $derived(joinPath(siteUrl, data.blogDirName, data.post.slug));
</script>

<BlogSEO post={data.post} blogDirName={data.blogDirName} schemaType={data.schemaType} />

<BlogContainer>
  <BackToBlog blogDirName={data.blogDirName} />

  <article>
    <header class="mb-5">
      <h2 class="text-base-content mb-3 text-3xl leading-tight font-bold md:text-[2.5rem]">
        {data.post.title}
      </h2>

      <p class="text-base-content/70 text-sm font-medium">
        {#if data.post.date}
          {formatDate(data.post.date)}
        {/if}

        {#if data.post.category}
          <DotIcon class="inline" />
          <a href="/{joinPath(data.blogDirName, 'category', slugify(data.post.category))}"
            >{data.post.category}</a
          >
        {/if}

        {#if data.post.author?.length > 0}
          <DotIcon class="inline" />
          <span>
            Written by
            {#each data.post.author as author, index}
              {#if index > 0},&nbsp;{/if}
              <a class="hover:text-accent" href={author.url} target="_blank">{author.name}</a>
            {/each}
          </span>
        {/if}

        {#if !IS_PROD && data.post.draft}
          <span class="text-error ml-2">
            <SquarePen size={16} class="inline" /> Draft
          </span>
        {/if}

        {#if !IS_PROD && data.post.unlisted}
          <span class="text-warning ml-2">
            <EyeOff size={16} class="inline" /> Unlisted
          </span>
        {/if}

        {#if !IS_PROD && data.post.ghost}
          <span class="text-info ml-2">
            <Ghost size={16} class="inline" /> Ghost
          </span>
        {/if}
      </p>
    </header>

    {#if data.post.image}
      <img src={data.post.image} alt={data.post.title} loading="eager" class="mb-2 rounded-2xl" />
    {/if}

    <div class="prose text-base-content dark:prose-invert max-w-full text-[1.1rem]">
      {#key data.post}
        <TOC showToc={data.post.showToc} />
      {/key}
      <div class="pb-1"></div>
      <data.PostComponent />
    </div>

    {#if data.post.tags?.length > 0}
      <div class="mt-8">
        {#each data.post.tags as tag}
          <Pill
            name={tag}
            link="/{joinPath(data.blogDirName, 'tag', slugify(tag))}"
            className="text-md font-semibold !rounded-lg !bg-base-200 text-base-content/80"
          />
        {/each}
      </div>
    {/if}
  </article>

  <SocialShare
    url={pageUrl}
    title={data.post.title}
    className="justify-center rounded-lg bg-base-200 py-2 !mb-2"
  />

  {#if data.related.length > 0}
    <div class="mt-2 mb-20">
      <div class="p-2 text-lg font-medium">You may also like</div>
      <div class="mt-1 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
        {#each data.related as rel}
          <a href="/{joinPath(data.blogDirName, rel.slug)}">
            <div
              class="bg-base-200 text-base-content/90 hover:bg-base-300 hover:text-base-content min-h-full rounded-xl p-4 font-medium md:p-4"
            >
              {rel.title}
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/if}

  {#if data.next || data.prev}
    <div class="bg-base-200 grid grid-cols-1 gap-2 rounded-lg md:grid-cols-2">
      <div>
        {#if data.next}
          <a href="/{joinPath(data.blogDirName, data.next.slug)}">
            <CardIconMini title={data.next.title} description="" Icon={ChevronLeft} />
          </a>
        {/if}
      </div>

      <div>
        {#if data.prev}
          <a href="/{joinPath(data.blogDirName, data.prev.slug)}">
            <CardIconMini
              title={data.prev.title}
              description=""
              Icon={ChevronRight}
              mirror={true}
            />
          </a>
        {/if}
      </div>
    </div>
  {/if}

  <ScrollToTop />
</BlogContainer>
