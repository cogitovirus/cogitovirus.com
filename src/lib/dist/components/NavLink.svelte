<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  interface Props {
    name: string;
    link: string;
    className?: string; //   export let active = false;
  }

  let { name, link, className = '' }: Props = $props();
  
</script>

<a
  class={twMerge('py-2 font-medium text-base-content hover:text-accent md:py-4', className)}
  href={link}
>
  {name}
</a>
