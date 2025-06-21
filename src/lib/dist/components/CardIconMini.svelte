<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  interface Props {
    title: any;
    description: any;
    Icon: any;
    mirror?: boolean;
    className?: string;
  }

  let {
    title,
    description,
    Icon,
    mirror = false,
    className = ''
  }: Props = $props();
</script>

<div class={twMerge('flex gap-x-5 rounded-lg p-4 text-base-content', className)}>
  {#if !mirror}
    <Icon class="size-6" />
  {/if}

  <div class="grow {mirror ? 'text-end' : ''}">
    <p class="text-base font-medium text-base-content">{title}</p>
    <p class="text-sm text-base-content/80">
      {description}
    </p>
  </div>

  {#if mirror}
    <Icon class="size-6" />
  {/if}
</div>
