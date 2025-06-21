<script lang="ts">
  import '../app.css';
  import { afterNavigate } from '$app/navigation';
  import { addCopyCodeBtn } from '$lib/dist/dom';
  import BannerStrip from '$lib/dist/components/BannerStrip.svelte';
  import CookieBanner from '$lib/dist/components/CookieBanner.svelte';
  import Loader from '$lib/dist/components/Loader.svelte';

  interface Props {
    children?: import('svelte').Snippet;
  }
  let { children }: Props = $props();

  afterNavigate(() => {
    // @ts-ignore
    window.HSStaticMethods.autoInit();

    addCopyCodeBtn();
  });
</script>

<Loader />

{@render children?.()}

<CookieBanner />

<!-- <BannerStrip
  content={'Built with &nbsp;<span class="font-medium">Svelte Starter Kit</span>'}
  link="https://sveltestarterkit.com"
/> -->
