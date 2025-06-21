<script lang="ts">
  export let data;
</script>

<article class="prose max-w-full">
  {#if data?.PostComponent}
    <svelte:component this={data.PostComponent} />
  {/if}
</article>

<h1>About</h1>
<p>This is the About page.</p>
