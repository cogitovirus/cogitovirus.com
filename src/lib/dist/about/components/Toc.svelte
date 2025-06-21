<!-- <script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { Plus, Minus } from 'lucide-svelte';
  import { handleToc } from '$lib/dist/docs/toc';

  afterNavigate(() => {
    try {
      // @ts-ignore
      HSAccordion.hide(document.querySelector('#toc'));
    } catch (e) {}
  });
</script>

<div
  class="hs-accordion-group bg-base-200 my-4 hidden rounded-lg px-2 pt-1"
  id="toc-group"
  data-hs-accordion-always-open
  use:handleToc
>
  <div class="hs-accordion" id="toc">
    <button
      class="hs-accordion-toggle group text-base-content hover:text-base-content/80 inline-flex w-full items-center gap-x-3 rounded-lg text-start font-semibold transition md:text-lg"
      aria-controls="toc"
    >
      <Plus
        class="text-base-content group-hover:text-base-content/80 hs-accordion-active:hidden inline shrink-0"
      />
      <Minus
        class="text-base-content group-hover:text-base-content/80 hs-accordion-active:inline hidden shrink-0"
      />
      Table of Contents
    </button>

    <div
      id="toc-content"
      class="hs-accordion-content text-base-content hidden w-full overflow-hidden ps-4 transition-[height] duration-300"
      aria-labelledby="toc-content"
    ></div>
  </div>
</div>

<style>
  :global(#toc a) {
    text-decoration: none;
  }
</style> -->
