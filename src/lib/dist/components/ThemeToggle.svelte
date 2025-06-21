<script lang="ts">
  import { fly } from 'svelte/transition';
  import { Sun, Moon } from 'lucide-svelte';
  import { theme } from '$lib/dist/theme.svelte';

  interface Props {
    size?: number;
  }

  let { size = 24 }: Props = $props();
</script>

<button
  onclick={theme.toggle}
  class="hidden py-3 font-medium text-base-content hover:text-accent md:inline md:py-4"
  aria-label="Toggle theme"
>
  {#if theme.value === 'light'}
    <div in:fly={{ y: -10 }}>
      <Moon {size} />
    </div>
  {:else}
    <div in:fly={{ y: 10 }}>
      <Sun {size} />
    </div>
  {/if}
</button>
