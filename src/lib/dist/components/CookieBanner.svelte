<script lang="ts">
  import { X } from 'lucide-svelte';
  import { onMount } from 'svelte';

  interface Props {
    link?: string;
  }

  let { link = '/privacy-policy' }: Props = $props();

  let show = $state(false);
  let cookieKey = 'cookies-dismissed';

  const dismiss = () => {
    show = false;
    localStorage.setItem(cookieKey, 'true');
  };

  onMount(() => {
    if (!localStorage.getItem(cookieKey)) {
      show = true;
    }
  });
</script>

{#if show}
  <div
    id="cookies-dismiss-button"
    class="fixed start-1/2 bottom-0 z-60 mx-auto w-full -translate-x-1/2 transform p-6 sm:max-w-4xl"
  >
    <!-- Card -->
    <div class="border-base-content bg-base-100 rounded-xl border p-4 shadow-xs">
      <div class="flex items-center justify-between gap-x-5 sm:gap-x-10">
        <h2 class="text-base-content text-sm">
          By continuing to use this site you consent to the use of cookies in accordance with our <a
            class="text-primary inline-flex items-center gap-x-1.5 font-medium decoration-2 hover:underline"
            href={link}>Cookies Policy.</a
          >
        </h2>
        <button
          type="button"
          class="bg-base-300 text-base-content hover:bg-base-200 inline-flex items-center gap-x-2 rounded-full border border-transparent p-2 text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
          data-hs-remove-element="#cookies-dismiss-button"
          onclick={dismiss}
        >
          <span class="sr-only">Dismiss</span>
          <X size={20} />
        </button>
      </div>
    </div>
    <!-- End Card -->
  </div>
{/if}
