<script lang="ts">
  import { onMount } from 'svelte';
  import { navigating } from '$app/stores';

  let loading = $state(true);
  let loaderWidth = $state(0);
  let interval: NodeJS.Timeout;

  onMount(() => {
    return navigating.subscribe((value) => {
      loading = !!value;

      if (loading) {
        loaderWidth = 0;
        interval = setInterval(() => {
          if (loaderWidth < 90) {
            loaderWidth += 10;
          } else {
            clearInterval(interval);
          }
        }, 100);
      } else {
        clearInterval(interval);
        loaderWidth = 100;
        setTimeout(() => {
          loaderWidth = 0;
        }, 300);
      }
    });
  });
</script>

{#if loading || loaderWidth > 0}
  <div
    class="fixed left-0 top-0 h-1 bg-accent transition-all duration-300 ease-linear"
    style="width: {loaderWidth}%;"
  ></div>
{/if}
