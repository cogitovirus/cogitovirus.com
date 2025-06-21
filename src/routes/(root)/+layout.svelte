<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import BannerDismissable from '$lib/dist/components/BannerDismissable.svelte';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<main id="content" class="flex min-h-screen flex-col">
  <!-- <BannerDismissable legend="Example of dismissable banner." link="/" subtext="Learn more" /> -->
  <Navbar />
  <div class="grow">
    {@render children?.()}
  </div>
  <Footer />
</main>
