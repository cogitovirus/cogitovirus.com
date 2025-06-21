<!-- <script lang="ts">
  import { docsPath } from '$lib/config';
  import { joinPath } from '$lib/dist/utils';
  import { Search, X } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { createDocsIndex, searchDocsIndex } from '$lib/dist/docs/search';
  import type { Result } from '$lib/dist/docs/search';
  import { onNavigate } from '$app/navigation';

  let modalId = 'search-modal';
  let searchReady: boolean = $state(false);
  let searchTerm = $state('');
  let results: Result[] = $state([]);
  let modalEl: HTMLElement | null = $state(null);

  onMount(async () => {
    const data = await fetch('/' + joinPath(docsPath, '/api/search.json')).then((res) =>
      res.json()
    );
    createDocsIndex(data);
    searchReady = true;
    try {
      modalEl = document.getElementById(modalId);
    } catch (error) {}
  });

  $effect(() => {
    if (searchReady) {
      results = searchTerm.length >= 3 ? searchDocsIndex(searchTerm) : [];
    }
  });

  onNavigate(() => {
    searchTerm = '';
    results = [];
    if (modalEl) {
      // @ts-ignore
      HSOverlay.close(modalEl);
    }
  });
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        // @ts-ignore
        HSOverlay.open(modalEl);
      }
    }
  }}
/>

<div class="cursor-text" data-hs-overlay="#{modalId}">
  <label for="icon" class="sr-only">Search</label>
  <div class="flex sm:hidden">
    <button type="button" class="btn btn-neutral btn-sm">
      <Search size={16} />&nbsp;Search
    </button>
  </div>
  <div class="relative hidden sm:block">
    <div class="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-4">
      <Search class="text-base-content" size={16} />
    </div>
    <input
      type="text"
      id="icon"
      name="icon"
      class="bg-base-200 placeholder:text-base-content/50 rounded-lg border px-2 py-2 ps-11 disabled:pointer-events-none"
      placeholder="Search"
      autocomplete="off"
      disabled
    />
    <div class="text-base-content absolute inset-y-0 end-0 z-20 hidden items-center pe-4 md:flex">
      <kbd class="kbd kbd-sm">ctrl</kbd>
      <kbd class="kbd kbd-sm">k</kbd>
    </div>
  </div>
</div>

<div
  id={modalId}
  class="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-200 pointer-events-none fixed inset-0 hidden size-full overflow-x-hidden overflow-y-auto opacity-0 transition-all"
  data-hs-overlay-keyboard="false"
>
  <div
    class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pt-[2.5rem] opacity-0 ease-out sm:mx-auto sm:w-full sm:max-w-lg md:pt-[4rem]"
  >
    <div class="bg-base-100 pointer-events-auto flex flex-col rounded-md shadow-xs">
      <div class="flex items-center justify-between px-4 py-3">
        <h3 class="text-base-content font-bold">Search</h3>
        <button type="button" class="hover:text-error" data-hs-overlay="#{modalId}">
          <span class="sr-only">Close</span>
          <X />
        </button>
      </div>
      <div class="overflow-y-auto p-4">
        <!-- svelte-ignore a11y_autofocus -->
        <!-- <input
          type="text"
          class="input border-base-content placeholder:text-base-content/20 focus:focus-within:border-base-content w-full border outline-hidden"
          placeholder="Search"
          autofocus={true}
          bind:value={searchTerm}
        />
      </div>

      <div>
        {#each results as result}
          <li class="list-none">
            <a href="/{joinPath(docsPath, result.slug)}">
              <div class="border-base-content/50 hover:bg-base-200 m-1 border-l p-2">
                <span class="text-base-content font-medium">{@html result.title}</span>
                <p class="text-base-content/80 text-sm text-ellipsis">{@html result.description}</p>
              </div>
            </a>
          </li>
        {/each}
      </div>
    </div>
  </div>
</div> --> -->
