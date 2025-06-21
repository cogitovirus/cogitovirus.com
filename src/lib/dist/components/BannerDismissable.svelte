<script lang="ts">
  import { X } from 'lucide-svelte';
  import { onMount } from 'svelte';

  interface Props {
    legend: any;
    link: any;
    subtext: any;
    bannerId?: string;
  }

  let { legend, link, subtext, bannerId = 'dismissable-top-banner' }: Props = $props();

  let show = $state(false);

  const dismiss = () => {
    show = false;
    localStorage.setItem(bannerId, 'true');
  };

  onMount(() => {
    if (!localStorage.getItem(bannerId)) {
      show = true;
    }
  });
</script>

{#if show}
  <div id={bannerId} class="bg-accent hs-removing:-translate-y-full">
    <div class="mx-auto max-w-[85rem] px-4 py-3 sm:px-6 lg:px-8">
      <div class="flex">
        <p class="text-accent-content">
          {legend}
          <a class="hover:text-accent-content/80 font-medium underline decoration-2" href={link}
            >{subtext}</a
          >
        </p>

        <div class="ms-auto ps-3">
          <button
            type="button"
            class="text-accent-content hover:text-accent-content/80 focus:ring-base-content focus:ring-offset-primary inline-flex rounded-lg p-1.5 focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
            data-hs-remove-element="#dismissable-top-banner"
            onclick={dismiss}
          >
            <span class="sr-only">Dismiss</span>
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
