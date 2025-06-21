<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  interface Props {
    className?: string;
    outerClassName?: string;
    children?: import('svelte').Snippet;
  }

  let { className = '', outerClassName = '', children }: Props = $props();
</script>

<div class={outerClassName}>
  <div class={twMerge('mx-auto max-w-3xl p-4', className)}>
    {@render children?.()}
  </div>
</div>
