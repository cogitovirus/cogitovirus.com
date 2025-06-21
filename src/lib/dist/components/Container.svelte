<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  interface Props {
    id?: string;
    className?: string;
    outerClassName?: string;
    children?: import('svelte').Snippet;
  }

  let {
    id = '',
    className = '',
    outerClassName = '',
    children
  }: Props = $props();
</script>

<section class={outerClassName} {id}>
  <div class={twMerge('mx-auto max-w-[85rem] px-4 py-8', className)}>
    {@render children?.()}
  </div>
</section>
