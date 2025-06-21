
<script lang="ts">
  export let data;
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { docsPath } from '$lib/config';
  $: toc = data.toc;
  $: currentSlug = $page.params.slug ?? '';
  function navTo(slug: string) {
    goto(`/${docsPath}${slug ? '/' + slug : ''}`);
  }
</script>

<div class="flex min-h-screen">
  <aside class="w-64 bg-base-200 p-4 border-r">
    <button
      class="mb-4 px-3 py-2 rounded bg-base-300 hover:bg-base-400 text-base-content font-semibold w-full text-left flex items-center gap-2"
      on:click={() => goto('/')}
    >
      ← Go Back
    </button>
    <nav>
      <ul>
        {#each toc as item}
          <li>
            <button
              class="block w-full text-left px-2 py-1 rounded hover:bg-base-300 {currentSlug === item.slug ? 'font-bold' : ''}"
              on:click={() => navTo(item.slug)}
            >
              {item.title}
            </button>
          </li>
        {/each}
      </ul>
    </nav>
  </aside>
  <main class="flex-1 p-6">
    <slot />
  </main>
</div>
