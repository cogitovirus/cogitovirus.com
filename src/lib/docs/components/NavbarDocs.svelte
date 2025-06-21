<script lang="ts">
  import Search from '$lib/dist/docs/components/Search.svelte';
  import { siteName } from '$lib/config';
  import { openHref } from '$lib/dist/dom';
  import ThemeToggle from '$lib/dist/components/ThemeToggle.svelte';
  import { GitHub } from '$lib/dist/icons';
</script>

<header
  class="border-base-300 bg-base-100 sticky inset-x-0 top-0 z-48 flex w-full flex-wrap border-b-2 text-sm md:flex-nowrap md:justify-start"
>
  <nav class="flex w-full items-center justify-between px-4 py-2 lg:px-8" aria-label="Docs Nav">
    <div class="min-w-12">
      <a href="/" onclick={openHref} class="flex items-center gap-2" aria-label="Brand">
        <img src="/logo.svg" alt="logo" class="inline size-10" />
        <span class="text-base-content hidden text-xl font-bold md:inline">{siteName}</span>
      </a>
    </div>

    <div class="flex items-center gap-4">
      <Search />
      <a href="https://github.com/SvelteStarterKit" target="_blank"><GitHub class="size-6" /></a>
      <ThemeToggle size={22} />
    </div>
  </nav>
</header>
