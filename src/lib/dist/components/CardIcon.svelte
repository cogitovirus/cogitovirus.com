<script lang="ts">
  import { ChevronRight } from 'lucide-svelte';

  interface Props {
    title: string;
    content: string;
    icon: any;
    link?: string | null;
    linkName?: string | null;
    inactive?: boolean;
    class?: string;
  }

  let { title, content, icon, link = null, linkName = null, inactive = false, class: className = '' }: Props = $props();

  const SvelteComponent = $derived(icon);
</script>

<div
  class={`group bg-base-200 hover:bg-base-300 flex size-full gap-y-6 rounded-lg p-5 shadow-xs transition-all focus:ring-1 focus:outline-1 ${inactive ? 'opacity-50 grayscale pointer-events-none' : ''} ${className}`}
>
  <SvelteComponent class="text-accent me-6 mt-0.5 size-8 shrink-0" />

  <div>
    <div>
      <span class="text-base-content block font-bold">{title}</span>
      <p class="text-base-content">{@html content}</p>
    </div>

    {#if link && linkName}
      <p class="text-base-content mt-3 inline-flex items-center gap-x-1 text-sm font-semibold">
        <a href={link}>{linkName}</a>
        <ChevronRight
          class="inline size-4 shrink-0 transition ease-in-out group-hover:translate-x-1"
          size={17}
        />
      </p>
    {/if}
  </div>
</div>
