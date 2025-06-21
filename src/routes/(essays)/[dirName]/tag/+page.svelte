<script lang="ts">
  import type { PageData } from './$types';
  import { joinPath, slugify } from '$lib/dist/utils';
  import BlogContainer from '$lib/dist/essays/components/BlogContainer.svelte';
  import SEO from '$lib/dist/components/SEO.svelte';
  import Pill from '$lib/dist/components/Pill.svelte';
  import BackToBlog from '$lib/dist/essays/components/BackToBlog.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<SEO title="Tags" />

<BlogContainer>
  <BackToBlog blogDirName={data.blogDirName} />

  <h1 class="text-base-content mb-8 text-3xl font-bold">Tags</h1>

  {#each data.tags as tag}
    <Pill
      name={tag}
      link="/{joinPath(data.blogDirName, 'tag', slugify(tag))}"
      className="text-md"
    />
  {/each}
</BlogContainer>
