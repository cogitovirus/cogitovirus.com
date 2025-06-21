<script lang="ts">
  import { page } from '$app/stores';
  import { ChevronLeft } from 'lucide-svelte';

  interface Props {
    btnName?: string;
    btnLink?: string;
    body?: import('svelte').Snippet;
  }

  let { btnName = 'Home', btnLink = '/', body }: Props = $props();

  let pageStatus: number = $state();
  let errorMessage: string = $state();

  if ($page.status === 404) {
    pageStatus = 404;
    errorMessage = 'Page not found';
  } else {
    pageStatus = 500;
    errorMessage = 'Oops, something went wrong.';
  }
</script>

<svelte:head>
  <title>{errorMessage}</title>
  <meta name="robots" content="follow, noindex" />
</svelte:head>

{#if body}{@render body()}{:else}
  <div class="-mt-20 flex h-screen items-center justify-center text-center">
    <div>
      <h1 class="block text-7xl font-bold text-base-content sm:text-9xl">{pageStatus}</h1>
      <p class="mt-3 text-base-content">
        {errorMessage}
      </p>
      <div class="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
        <a
          class="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-primary px-4 py-3 text-sm font-semibold text-primary-content hover:bg-primary/80 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
          href={btnLink}
        >
          <ChevronLeft size={18} />
          {btnName}
        </a>
      </div>
    </div>
  </div>
{/if}
