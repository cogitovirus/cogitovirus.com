<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowBigUp } from 'lucide-svelte';

  let showButton = $state(false);

  onMount(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        showButton = true;
      } else {
        showButton = false;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
</script>

<button
  class="hover:bg-highlight bg-accent fixed right-8 bottom-8 z-10 rounded-full p-3 text-white shadow-lg focus:outline-hidden {showButton
    ? 'show'
    : ''} scroll-to-top"
  onclick={scrollToTop}
  aria-label="Scroll to top"
>
  <ArrowBigUp fill="white" />
</button>

<style>
  .scroll-to-top {
    display: none;
  }

  .scroll-to-top.show {
    display: block;
  }
</style>
