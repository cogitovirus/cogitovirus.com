<script lang="ts">
  import type { PageData } from './$types.js';
  import SEO from '$lib/dist/components/SEO.svelte';
  import PostListLayout from '$lib/dist/essays/components/PostListLayout.svelte';
  import BlogContainer from '$lib/dist/essays/components/BlogContainer.svelte';
  import BackToBlog from '$lib/dist/essays/components/BackToBlog.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<SEO title={data.name} index={false} />

<BlogContainer>
  <BackToBlog blogDirName={data.blogDirName} />

  <p class="mb-10">
    <span
      class="border-base-content text-base-content rounded-full border p-1 ps-3 pe-3 text-xl font-bold"
    >
      #{data.name}
    </span>
  </p>

  <PostListLayout posts={data.posts} blogDirName={data.blogDirName} />
</BlogContainer>
