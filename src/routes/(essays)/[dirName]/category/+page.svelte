<script lang="ts">
  import type { PageData } from './$types';
  import { joinPath, slugify } from '$lib/dist/utils.js';
  import BlogContainer from '$lib/dist/essays/components/BlogContainer.svelte';
  import SEO from '$lib/dist/components/SEO.svelte';
  import Pill from '$lib/dist/components/Pill.svelte';
  import BackToBlog from '$lib/dist/essays/components/BackToBlog.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<SEO title="Categories" />

<BlogContainer>
  <BackToBlog blogDirName={data.blogDirName} />

  <h1 class="text-base-content mb-8 text-3xl font-bold">Categories</h1>
  {#each data.categories as category}
    <Pill name={category} link="/{joinPath(data.blogDirName, 'category', slugify(category))}" />
  {/each}
</BlogContainer>
