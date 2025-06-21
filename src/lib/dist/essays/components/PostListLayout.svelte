<script lang="ts">
  import { joinPath } from '$lib/dist/utils';
  import { formatDate } from '$lib/dist/essays/utils';
  import type { PostList } from '$lib/dist/essays/types';
  import { DotIcon, EyeOff, Ghost, SquarePen } from 'lucide-svelte';

  interface Props {
    posts: PostList[];
    blogDirName: string;
  }

  let { posts, blogDirName }: Props = $props();
</script>

<ul class="list-none">
  {#each posts as post}
    <li class="pb-4">
      <a href="/{joinPath(blogDirName, post.slug)}" aria-label="post link to {post.title}">
        <article class="hover:bg-base-200 flex flex-col rounded-xl p-6">
          <header>
            <h2 class="text-2xl leading-8 font-extrabold tracking-tight">
              {post.title}
            </h2>
          </header>

          <div class="text-base-content/70 py-2">
            <p>{post.description}</p>
          </div>

          <footer class="text-base-content/70 text-sm leading-6 font-medium">
            {#if post.date}
              <span>
                <span class="sr-only">Published on</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
            {/if}

            {#if post.category}
              <span>
                <DotIcon class="inline size-6" />
                <span class="sr-only">Category</span>
                {post.category}
              </span>
            {/if}

            {#if post.draft}
              <span class="ml-2">
                <span class="text-error text-xs font-semibold">
                  <SquarePen class="inline" size={16} /> Draft
                </span>
              </span>
            {/if}

            {#if post.unlisted}
              <span class="ml-2">
                <span class="text-warning text-xs font-semibold">
                  <EyeOff class="inline" size={16} /> Unlisted
                </span>
              </span>
            {/if}

            {#if post.ghost}
              <span class="ml-2">
                <span class="text-info text-xs font-semibold">
                  <Ghost class="inline" size={16} /> Ghost
                </span>
              </span>
            {/if}
          </footer>
        </article>
      </a>
    </li>
  {/each}
</ul>
