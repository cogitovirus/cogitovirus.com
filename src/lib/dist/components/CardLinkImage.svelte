<script lang="ts">
  import { ChevronRight } from 'lucide-svelte';

  interface Props {
    link: any;
    name: any;
    description: any;
    image_src: any;
    image_alt?: string;
  }

  let {
    link,
    name,
    description,
    image_src,
    image_alt = ''
  }: Props = $props();
</script>

<a class="group m-2 flex items-center gap-x-5 rounded-lg p-4 hover:bg-base-300" href={link}>
  <img class="size-32 rounded-lg" src={image_src} alt={image_alt} />
  <div class="grow">
    <p class="text-base-content/90">
      {description}
    </p>
    <p class="mt-3 inline-flex items-center gap-x-2 text-sm font-semibold text-base-content">
      {name}
      <ChevronRight size={18} />
    </p>
  </div>
</a>
