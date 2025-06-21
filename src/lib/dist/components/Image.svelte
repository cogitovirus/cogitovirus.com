<script lang="ts">
  import { importImage } from '$lib/dist/image';

  interface Props {
    path: string;
    alt: string;
    caption?: string;
    source_link?: string;
    className?: string;
    sizes?: string;
    loading?: 'eager' | 'lazy' | null | undefined;
  }

  let {
    path,
    alt,
    caption = '',
    source_link = '',
    className = '',
    sizes = '',
    loading = 'lazy',
  }: Props = $props();

  const src = $derived(importImage(path));
</script>

<figure>
  <picture>
    <source srcset={src.sources.avif} type="image/avif" {sizes} />
    <source srcset={src.sources.webp} type="image/webp" {sizes} />
    <img src={src.img.src} {alt} {loading} width={src.img.w} height={src.img.h} class={className} />
  </picture>

  {#if caption !== ''}
    <figcaption class="text-center text-sm">
      {caption}
      {#if source_link !== ''}
        <a href={source_link} target="_blank">source</a>
      {/if}
    </figcaption>
  {/if}
</figure>
