<script lang="ts">
  import type { PageData } from './$types';
  import { joinPath, slugify } from '$lib/dist/utils.js';
  import BlogContainer from '$lib/dist/essays/components/BlogContainer.svelte';
  import Seo from '$lib/dist/components/SEO.svelte';
  import BackToBlog from '$lib/dist/essays/components/BackToBlog.svelte';
  import { IS_PROD } from '$lib/dist/vars';
  import { SquarePen, EyeOff, Ghost } from 'lucide-svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  function formatDate(date: string | number | Date) {
    let dt = new Date(date);
    const options = { month: 'short', day: '2-digit' };
    // @ts-ignore
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(dt);
  }
</script>

<Seo title="Archive" />

<BlogContainer>
  <BackToBlog blogDirName={data.blogDirName} />

  {#each Object.entries(data.yearPosts).reverse() as [year, posts]}
    <div>
      <h2 class="text-base-content my-4 text-4xl font-bold">{year}</h2>
      {#each posts as post}
        <div class="my-4 flex items-center gap-10 py-1">
          <div class="min-w-16">
            <span class="text-base-content/80 font-medium">{formatDate(post.date)}</span>
          </div>

          <div class="flex flex-col">
            {#if post.category}
              <a
                href="/{joinPath(data.blogDirName, 'category', slugify(post.category))}"
                class="text-base-content/80 text-xs font-semibold">{post.category}</a
              >
            {/if}
            <a
              class="text-base-content hover:text-accent text-lg font-medium tracking-tight"
              href="/{joinPath(data.blogDirName, post.slug)}">{post.title}</a
            >
            <div class="flex gap-3 text-xs font-semibold">
              {#if !IS_PROD && post.draft}
                <span class="text-error">
                  <SquarePen class="inline" size={16} /> Draft
                </span>
              {/if}

              {#if !IS_PROD && post.unlisted}
                <span class="text-warning">
                  <EyeOff class="inline" size={16} /> Unlisted
                </span>
              {/if}

              {#if !IS_PROD && post.ghost}
                <span class="text-info">
                  <Ghost class="inline" size={16} /> Ghost
                </span>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
    <br />
  {/each}
</BlogContainer>
