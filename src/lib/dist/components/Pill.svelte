<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  interface Props {
    name: string;
    link: string;
    className?: string;
  }

  let { name, link, className = '' }: Props = $props();
</script>

<a
  class={twMerge(
    'm-1 inline-flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-2 text-base-content hover:bg-base-300',
    className
  )}
  href={link}>{name}</a
>
