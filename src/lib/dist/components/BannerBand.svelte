<script lang="ts">
  import { ChevronRight } from 'lucide-svelte';
  import { twMerge } from 'tailwind-merge';

  interface Props {
    legend: any;
    link: any;
    subtext: any;
    className?: string;
  }

  let {
    legend,
    link,
    subtext,
    className = ''
  }: Props = $props();
</script>

<a
  class={twMerge(
    'group block bg-secondary p-4 text-center transition-all duration-300 hover:bg-secondary/90',
    className
  )}
  href={link}
>
  <div class="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
    <p class="me-2 inline-block text-sm text-secondary-content">
      {legend}
    </p>
    <span
      class="inline-flex items-center justify-center gap-x-2 text-sm font-semibold text-secondary-content decoration-2 group-hover:underline"
    >
      {subtext}
      <ChevronRight size={18} />
    </span>
  </div>
</a>
