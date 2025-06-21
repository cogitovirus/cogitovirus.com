<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<main id="content" class="bg-base-100 flex min-h-screen flex-col">
  <Navbar />
  <div class="grow">
    {@render children?.()}
  </div>
  <Footer />
</main>
